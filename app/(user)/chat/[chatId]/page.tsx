// app/pricing/page means route on browser /pricing
// app/chat/[chatId] means /chat/anything

import { authOptions } from "@/auth";
import AdminControls from "@/components/AdminControls";
import ChatInput from "@/components/ChatInput";
import ChatMembersBadges from "@/components/ChatMembersBadges";
import ChatMessages from "@/components/ChatMessages";
import { chatMembersRef } from "@/lib/converters/ChatMembers";
import { sortedMessageRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    chatId: string;
  };
};
const ChatPage = async ({ params: { chatId } }: Props) => {
  const session = await getServerSession(authOptions);
  const initialMessages = (await getDocs(sortedMessageRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id!);

  if (!hasAccess) redirect("/chat?error=permission");

  return (
    <>
      {/* admin controls */}
      <AdminControls chatId={chatId} />
      {/* ChatmemebersBadge */}
      <ChatMembersBadges chatId={chatId} />
      {/* Chatmessages */}
      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>
      {/* Chat Input */}
      <ChatInput chatId={chatId} />
    </>
  );
};

export default ChatPage;
