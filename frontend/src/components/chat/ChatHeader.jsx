import '../../styles/chat/chatHeader.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const ChatHeader = () => {
  const { t } = useTranslation();
  const nameActiveChannel = useSelector(
    (state) => state.channel.nameActiveChannel
  );
  const numberOfMessage = useSelector((state) => state.channel.numberOfMessage);
  return (
    <div className="chat-header">
      <div className="chat-info">
        <h2 className="chat-title">{nameActiveChannel}</h2>
        <p className="chat-subtitle">
          {t('chatPage.chat.number_of_messages')} {numberOfMessage}
        </p>
      </div>
    </div>
  );
};
export { ChatHeader };
