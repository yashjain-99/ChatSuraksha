import useFetch from "../../hooks/useFetch";

const Header = () => {
  const { data, loading } = useFetch({ endpoint: "/metadata" });
  return (
    <>
      {!loading ? (
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
