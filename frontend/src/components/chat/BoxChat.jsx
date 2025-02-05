import '../../styles/chat/boxChat.css';
import { ChatInputForm } from './ChatInputForm';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
const BoxChat = () => {
  return (
    <div className="main-content flex-right ">
      <ChatHeader />
      <div className="chat-container">
        <ChatMessages />
        <ChatInputForm />
      </div>
    </div>
  );
};
export { BoxChat };
