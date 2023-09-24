import Header from "./header";
import ChatCard from "./chat-card";

const AsideInbox = ({
  setSelectedConversation,
  inbox,
  conversedWith,
  metadata,
}) => {
  return (
    <div className="aside-inbox">
      <Header metadata={metadata} />
      <div className="aside-inbox-chats">
        {conversedWith.map((conversationId) => {
          return (
            <ChatCard
              key={conversationId}
              name={inbox[conversationId].fullName}
              avatar={inbox[conversationId].avatar}
              lastMessage={inbox[conversationId].lastMessage}
              chatHistory={inbox[conversationId].conversationHistoryId}
              setSelectedConversation={setSelectedConversation}
              id={conversationId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AsideInbox;
