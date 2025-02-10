import { ChannelsItem } from './ChannelsItem';
import '../../styles/channels/channelsList.css';
import { useGetChannelsQuery } from '../../api/channelsApi';
import { setActive } from '../../slice/activeChannelSlice';
import { useDispatch, useSelector } from 'react-redux';

const ChannelsList = () => {
  const { data: dataChannels } = useGetChannelsQuery();
  const activeChannel = useSelector((state) => state.channel.activeChannel);
  const dispatch = useDispatch();

  const changeChannel = (event) => {
    const btn = event.target;
    dispatch(setActive(btn.id));
  };

  return (
    <ul className="channel-list">
      {dataChannels?.map((channel) => (
        <ChannelsItem
          key={channel.id}
          name={channel.name}
          isActive={activeChannel === channel.id}
          id={channel.id}
          changeChannel={changeChannel}
          removable={channel.removable}
        />
      ))}
    </ul>
  );
};
export { ChannelsList };
