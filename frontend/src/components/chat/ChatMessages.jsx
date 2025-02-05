import '../../styles/chat/chatMessages.css';
import { useGetMessagesQuery } from '../../api/messagesApi';

const ChatMessages = () => {
  const { data: dataMessages, isFetching, error } = useGetMessagesQuery();
  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error loading channels</p>;
  return (
    <div className="chat-content">
      {dataMessages.map((msg) => (
        <div key={msg.id} className="message">
          <strong>{msg.username}:</strong> {msg.body}
        </div>
      ))}
    </div>
  );
};
export { ChatMessages };
