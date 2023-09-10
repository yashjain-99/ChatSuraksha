import Footer from "./footer";
import Header from "./header";
import useFetch from "../../hooks/useFetch";
import Conversations from "./conversations";

const MainChat = ({ selectedConversation }) => {
  if (selectedConversation === null) return null;
  const { data, loading } = useFetch({
    endpoint: "/chatHistory",
    id: selectedConversation,
  });
  if (loading) return null;
  return (
    <div className="main-chat">
      <Header metadata={data.metadata} />
      <main className="main-chat-messages">
        <Conversations conversations={data.data} />
      </main>
      <Footer />
    </div>
  );
};

export default MainChat;
