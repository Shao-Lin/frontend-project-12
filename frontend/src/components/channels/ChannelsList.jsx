import { ChannelsItem } from './ChannelsItem';
import '../../styles/channels/channelsList.css';
import { useGetChannelsQuery } from '../../api/channelsApi';
import {
  setActive,
  setNameActiveChannel,
} from '../../slice/activeChannelSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFocus } from '../../hoc/useFocus';
import { ToastContainer, Bounce } from 'react-toastify';

const ChannelsList = () => {
  const { data: dataChannels } = useGetChannelsQuery();
  const activeChannel = useSelector((state) => state.channel.activeChannel);
  const dispatch = useDispatch();
  const inputRef = useFocus();

  const changeChannel = (event) => {
    const btn = event.target;
    dispatch(setActive(btn.id));
    dispatch(setNameActiveChannel(btn.name));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
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
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};
export { ChannelsList };
