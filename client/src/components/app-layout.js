import AsideInbox from "./aside-inbox";
import MainChat from "./main-chat";
import { useState } from "react";

const AppLayout = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  return (
    <div className="layout-grid">
      <AsideInbox setSelectedConversation={setSelectedConversation} />
      <MainChat selectedConversation={selectedConversation} />
    </div>
  );
};

export default AppLayout;
