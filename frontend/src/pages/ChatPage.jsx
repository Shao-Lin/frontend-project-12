import { BoxMessenger } from '../components/BoxMessenger';
import { Header } from '../components/Header';
import { ChannelsColumn } from '../components/channels/ChannelsColumn';
import { BoxChat } from '../components/chat/BoxChat';
export const ChatPage = () => {
  return (
    <>
      <Header />
      <BoxMessenger>
        <ChannelsColumn />
        <BoxChat />
      </BoxMessenger>
    </>
  );
};
