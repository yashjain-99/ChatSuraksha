const Footer = () => {
  return (
    <footer className="main-chat-footer">
      <input
        type="text"
        className="main-chat-footer-input"
        placeholder="Type a message"
      />
      <button className="main-chat-footer-send-button">&gt;</button>
    </footer>
  );
};

export default Footer;
