const Header = ({ metadata }) => {
  return (
    <header className="aside-inbox-header">
      <div className="aside-inbox-header-avatar">
        <img
          className="aside-inbox-header-avatar-img"
          src={metadata.avatar}
          alt="avatar"
        />
      </div>
      <div className="aside-inbox-header-content">
        <h3 className="aside-inbox-header-content-name">{metadata.name}</h3>
      </div>
    </header>
  );
};

export default Header;
