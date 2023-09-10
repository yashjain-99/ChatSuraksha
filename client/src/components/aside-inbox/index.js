import Header from "./header";
import ChatCard from "./chat-card";

const AsideInbox = ({ setSelectedConversation, metadata, inbox }) => {
  console.log(metadata);
  console.log(inbox);
  return (
    <div className="aside-inbox">
      <Header metadata={metadata} />
      <div className="aside-inbox-chats">
        {inbox.map((chat) => {
          return (
            <ChatCard
              key={chat.id}
              metadata={chat.metadata}
              lastMessage={chat.lastMessage}
              chatHistory={chat.chatHistory}
              setSelectedConversation={setSelectedConversation}
              id={chat.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AsideInbox;
