import '../../styles/channels/channelsColumn.css';
import { ChannelsHeader } from './ChannelsHeader';
import { ChannelsList } from './ChannelsList';
const ChannelsColumn = () => {
  return (
    <>
      <div className="channels-column flex-left">
        <ChannelsHeader />
        <ChannelsList />
      </div>
    </>
  );
};
export { ChannelsColumn };
