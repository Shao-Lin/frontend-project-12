import { ChannelsItem } from './ChannelsItem';
import '../../styles/channels/channelsList.css';
import { useGetChannelsQuery } from '../../api/channelsApi';
import { setActive } from '../../slice/activeChannelSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFocus } from '../../hoc/useFocus';

const ChannelsList = () => {
  const { data: dataChannels } = useGetChannelsQuery();
  const activeChannel = useSelector((state) => state.channel.activeChannel);
  const dispatch = useDispatch();
  const inputRef = useFocus(); // 👈 Получаем ref из контекста

  const changeChannel = (event) => {
    const btn = event.target;
    dispatch(setActive(btn.id));
    if (inputRef.current) {
      inputRef.current.focus(); // 👈 Фокусируемся по кнопке
    }
  };

  return (
    <div className="channel-list-container">
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
    </div>
  );
};
export { ChannelsList };
