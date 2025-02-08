import '../../styles/channels/channelsItem.css';
import PropTypes from 'prop-types';

const ChannelsItem = ({ name, isActive }) => {
  return <li className={`channel-item ${isActive ? 'active' : ''}`}>{name}</li>;
};

ChannelsItem.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};
export { ChannelsItem };
