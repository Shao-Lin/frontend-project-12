import { ChannelsItem } from './ChannelsItem';
import '../../styles/channels/channelsList.css';
import { useGetChannelsQuery } from '../../api/channelsApi';
const ChannelsList = () => {
  const { data: dataChannels, isFetching, error } = useGetChannelsQuery();
  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error loading channels</p>;
  return (
    <ul className="channel-list">
      {dataChannels.map((channel) => (
        <ChannelsItem key={channel.id} name={channel.name} />
      ))}
    </ul>
  );
};
export { ChannelsList };
