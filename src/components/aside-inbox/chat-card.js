const ChatCard = ({
  metadata: { name, avatar },
  lastMessage,
  chatHistory,
  setSelectedConversation,
  id,
}) => {
  return (
    <section
      className="chat-card"
      onClick={() => {
        setSelectedConversation(chatHistory);
      }}
      key={id}
    >
      <div className="chat-card-avatar">
        <img src={avatar} className="chat-card-avatar-img" alt="avatar" />
      </div>
      <div className="chat-card-content">
        <h3 className="chat-card-content-name">{name}</h3>
        <p className="chat-card-content-message">{lastMessage}</p>
      </div>
    </section>
  );
};

export default ChatCard;
