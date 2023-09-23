import AsideInbox from "../components/aside-inbox";
import MainChat from "../components/main-chat";
import { useState } from "react";
import { useInitialSetup } from "../hooks/useFetch";

const Dashboard = () => {
  return <div>Test</div>;
};
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const { metadata, inbox, allLoaded } = useInitialSetup();
//   if (!allLoaded) return null;
//   return (
//     <div className="layout-grid">
//       <AsideInbox
//         setSelectedConversation={setSelectedConversation}
//         metadata={metadata}
//         inbox={inbox}
//       />
//       <MainChat selectedConversation={selectedConversation} />
//     </div>
//   );
// };

export default Dashboard;
