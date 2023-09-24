import Footer from "./footer";
import Header from "./header";
import Conversations from "./conversations";

const MainChat = ({
  selectedConversation,
  conversationHistory,
  userId,
  socket,
  setConversations,
}) => {
  if (selectedConversation === null) return null;
  const { fullName, avatar, data } = conversationHistory;
  const metadata = {
    name: fullName,
    avatar,
  };
  return (
    <div className="main-chat">
      <Header metadata={metadata} />
      <main className="main-chat-messages">
        <Conversations conversations={data} socket={socket} />
      </main>
      <Footer
        selectedConversation={selectedConversation}
        userId={userId}
        socket={socket}
        setConversations={setConversations}
      />
    </div>
  );
};

export default MainChat;
