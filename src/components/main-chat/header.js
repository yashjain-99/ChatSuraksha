const Header = () => {
  return (
    <header className="main-chat-header">
      <div className="main-chat-header-avatar">
        <img
          src="https://placekitten.com/100/100"
          className="main-chat-header-avatar-img"
          alt="avatar"
        />
      </div>
      <div className="main-chat-header-content">
        <h3 className="main-chat-header-content-name">John Doe</h3>
      </div>
    </header>
  );
};

export default Header;
