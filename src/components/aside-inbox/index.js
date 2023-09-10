import Header from "./header";
import ChatCard from "./chat-card";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

const AsideInbox = ({ setSelectedConversation }) => {
  const { data, loading } = useFetch({ endpoint: "/inbox" });
  if (loading) return null;

  return (
    <div className="aside-inbox">
      <Header />
      <div className="aside-inbox-chats">
        {data
          ? data.map((chat) => {
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
            })
          : null}
      </div>
    </div>
  );
};

export default AsideInbox;
