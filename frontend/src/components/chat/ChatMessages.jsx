import '../../styles/chat/chatMessages.css';
import { useGetMessagesQuery } from '../../api/messagesApi';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const ChatMessages = () => {
  const { data: messages = [] } = useGetMessagesQuery();
  const [liveMessages, setLiveMessages] = useState([]);
  const channelId = useSelector((state) => state.channel.activeChannel);

  useEffect(() => {
    const socket = io('ws://localhost:5002');

    socket.on('newMessage', (message) => {
      console.log(message);
      setLiveMessages((prev) => [...prev, message]);
    });

    return () => socket.disconnect();
  }, []);

  const messagesForChannel = [...messages, ...liveMessages].filter(
    (message) => message.channelId === channelId
  );
  return (
    <div className="chat-content">
      {messagesForChannel?.map((msg) => (
        <div key={msg.id} className="message">
          <strong>{msg.username}:</strong> {msg.body}
        </div>
      ))}
    </div>
  );
};
export { ChatMessages };
