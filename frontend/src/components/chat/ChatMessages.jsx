import '../../styles/chat/chatMessages.css';
import { useGetMessagesQuery } from '../../api/messagesApi';
import { useEffect, useState, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { setNumberOfMessage } from '../../slice/activeChannelSlice';

const ChatMessages = () => {
  const { data: messages = [] } = useGetMessagesQuery();
  const [liveMessages, setLiveMessages] = useState([]);
  const channelId = useSelector((state) => state.channel.activeChannel);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(`${window.location.origin}`);

    socket.on('newMessage', (message) => {
      setLiveMessages((prev) => [...prev, message]);
    });

    return () => socket.disconnect();
  }, []);

  const messagesForChannel = useMemo(() => {
    return [...messages, ...liveMessages].filter(
      (message) => message.channelId === channelId
    );
  }, [messages, liveMessages, channelId]);

  useEffect(() => {
    dispatch(setNumberOfMessage(messagesForChannel.length));
  }, [messagesForChannel, dispatch]);

  return (
    <div className="chat-content">
      {messagesForChannel.map((msg) => (
        <div key={msg.id} className="message">
          <strong>{msg.username}:</strong> {msg.body}
        </div>
      ))}
    </div>
  );
};
export { ChatMessages };
