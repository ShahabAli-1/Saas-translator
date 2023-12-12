import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { getDocs } from "firebase/firestore";
import { chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers";
import ChatListRows from "./ChatListRows";
const ChatList = async () => {
  const session = await getServerSession(authOptions);
  const chatsSnapshot = await getDocs(
    chatMembersCollectionGroupRef(session?.user.id!)
  );
  // server side rendering the chats in this compoenent
  // and then passing them to a client component here it is ChatsListRow
  const initialChats = chatsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null,
  }));

  return <ChatListRows initialChats={initialChats} />;
};

export default ChatList;
