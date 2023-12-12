"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "./ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getUserByEmailRef } from "@/lib/converters/User";
import { useToast } from "@/components/ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { PlusCircleIcon } from "lucide-react";
import ShareLink from "./ShareLink";
import { useSubscriptionStore } from "@/store/store";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

const InviteUser = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ chatId });
  const subscription = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openInviteLink, setopenInviteLink] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user.id) return;
    toast({
      title: "Sending Invite",
      description: "Please wait while we send the invite...",
    });
    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
      (doc) => doc.data()
    ).length;

    // check if the user is about to exceed the pro plan
    const isPro =
      subscription?.role === "pro" && subscription.status === "active";

    if (!isPro && noOfUsersInChat >= 2) {
      toast({
        title: "Free plab limit exceeded.",
        description:
          "You have exceed the limit of users in a single chat for the FREE plan. Please upgrade to PRO to continue adding users to chats!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
      return;
    }

    const querySnapshot = await getDocs(getUserByEmailRef(values.email));
    if (querySnapshot.empty) {
      toast({
        title: "User not found",
        description:
          "Please enter an email address of a registered user OR resend the invitation once they have been signed up!",
        variant: "destructive",
      });
      return;
    } else {
      const user = querySnapshot.docs[0].data();
      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId: chatId,
        isAdmin: false,
        image: user.image || "",
      })
        .then(() => {
          setOpen(false);
          toast({
            title: "Added to chat",
            description: "The user has been added to the chat succesfully",
            className: "bg-green-600 text-white",
            duration: 3000,
          });
          setopenInviteLink(true);
        })
        .catch(() => {
          toast({
            title: "Error",
            description:
              "Whoops... there was an error adding the user to the chat.",
            variant: "destructive",
          });
        });
    }
    form.reset();
  };
  return (
    adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-1" />
              Add User to Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User to Chat</DialogTitle>
              <DialogDescription>
                Simply enter another users email to invite them to this chat!{" "}
                <span className="text-indigo-600 font-bold">
                  (Note: they must be registered)
                </span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="shahabali@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setopenInviteLink}
          chatId={chatId}
        />
      </>
    )
  );
};

export default InviteUser;
