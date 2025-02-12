import { BoxMessenger } from '../components/BoxMessenger';
import { Header } from '../components/Header';
import { ChannelsColumn } from '../components/channels/ChannelsColumn';
import { BoxChat } from '../components/chat/BoxChat';
import { FocusProvider } from '../hoc/FocusContext';
export const ChatPage = () => {
  return (
    <>
      <Header />
      <FocusProvider>
        <BoxMessenger>
          <ChannelsColumn />
          <BoxChat />
        </BoxMessenger>
      </FocusProvider>
    </>
  );
};
