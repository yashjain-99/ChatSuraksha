const Conversations = ({ conversations }) => {
  return (
    <>
      {conversations.map((conversation, index) => (
        <div
          className={`main-chat-messages-message main-chat-messages-message-${conversation.type}`}
          key={index}
        >
          <div className="main-chat-messages-message-content">
            <p className="main-chat-messages-message-content-text">
              {conversation.message}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
export default Conversations;
