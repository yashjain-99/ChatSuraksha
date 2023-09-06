import AsideInbox from "./aside-inbox";
import MainChat from "./main-chat";

const AppLayout = () => {
  return (
    <div className="layout-grid">
      <AsideInbox />
      <MainChat />
    </div>
  );
};

export default AppLayout;
