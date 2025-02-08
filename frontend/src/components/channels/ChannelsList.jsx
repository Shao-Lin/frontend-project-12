import { ChannelsItem } from './ChannelsItem';
import '../../styles/channels/channelsList.css';
import { useGetChannelsQuery } from '../../api/channelsApi';
import { useEffect } from 'react';
import { setActive } from '../../slice/activeChannelSlice';
import { useDispatch, useSelector } from 'react-redux';

const ChannelsList = () => {
  const { data: dataChannels, isFetching, error } = useGetChannelsQuery();
  const activeChannel = useSelector((state) => state.channel.activeChannel);
  //console.log(activeChannel);
  const dispatch = useDispatch();

  useEffect(() => {
    const generalChannel = dataChannels?.find(
      (channel) => channel.name === 'general'
    );
    if (generalChannel) {
      console.log(generalChannel.id);
      dispatch(setActive(generalChannel.id));
    }
  }, [dataChannels, activeChannel, dispatch]);

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error loading channels</p>;

  return (
    <ul className="channel-list">
      {dataChannels?.map((channel) => (
        <ChannelsItem
          key={channel.id}
          name={channel.name}
          isActive={activeChannel === channel.id}
        />
      ))}
    </ul>
  );
};
export { ChannelsList };
