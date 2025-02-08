import '../../styles/chat/chatMessages.css';
import { useGetMessagesQuery } from '../../api/messagesApi';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const ChatMessages = () => {
  const { data: messages = [] } = useGetMessagesQuery();
  const [liveMessages, setLiveMessages] = useState([]);

  useEffect(() => {
    const socket = io('ws://localhost:5002');

    socket.on('newMessage', (message) => {
      console.log(message);
      setLiveMessages((prev) => [...prev, message]);
    });

    return () => socket.disconnect();
  }, []);
  // if (isFetching) return <p>Loading...</p>;
  // if (error) return <p>Error loading channels</p>;
  //console.log(messages);
  //console.log(liveMessages);
  console.log([...messages, ...liveMessages]);
  return (
    <div className="chat-content">
      {[...messages, ...liveMessages]?.map((msg) => (
        <div key={msg.id} className="message">
          <strong>{msg.username}:</strong> {msg.body}
        </div>
      ))}
    </div>
  );
};
export { ChatMessages };
