import ChatList from "@/components/ChatList";
import ChatPermissionError from "@/components/ChatPermissionError";

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};
const ChatsPage = ({ searchParams: { error } }: Props) => {
  return (
    <div>
      {/* Chat Permission Error */}
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}

      {/* Chat List */}
      <ChatList />
    </div>
  );
};

export default ChatsPage;
