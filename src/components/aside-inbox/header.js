import useApiCall from "../../hooks/useApiCall";
import { useState } from "react";
const Header = () => {
  const [data, setData] = useState(null);
  useApiCall(
    {
      endpoint: "/metadata",
    },
    setData
  );
  return (
    <>
      {data ? (
        <header className="aside-inbox-header">
          <div className="aside-inbox-header-avatar">
            <img
              className="aside-inbox-header-avatar-img"
              src={data.avatar}
              alt="avatar"
            />
          </div>
          <div className="aside-inbox-header-content">
            <h3 className="aside-inbox-header-content-name">{data.name}</h3>
          </div>
        </header>
      ) : null}
    </>
  );
};

export default Header;
