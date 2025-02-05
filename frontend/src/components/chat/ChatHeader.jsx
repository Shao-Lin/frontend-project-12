import '../../styles/chat/chatHeader.css';
const ChatHeader = () => {
  return (
    <div className="chat-header">
      <div className="chat-info">
        <h2 className="chat-title">название канала</h2>
        <p className="chat-subtitle">5 сообщений</p>
      </div>
    </div>
  );
};
export { ChatHeader };
