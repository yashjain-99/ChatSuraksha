const Header = ({ metadata }) => {
  console.log(metadata);
  return (
    <header className="main-chat-header">
      {metadata ? (
        <>
          <div className="main-chat-header-avatar">
            <img
              src={metadata.avatar}
              className="main-chat-header-avatar-img"
              alt="avatar"
            />
          </div>
          <div className="main-chat-header-content">
            <h3 className="main-chat-header-content-name">{metadata.name}</h3>
          </div>
        </>
      ) : (
        <>
          <div className="main-chat-header-avatar">
            <img
              src="https://placekitten.com/100/100"
              className="main-chat-header-avatar-img"
              alt="avatar"
            />
          </div>
          <div className="main-chat-header-content">
            <h3 className="main-chat-header-content-name">Schimmer</h3>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
