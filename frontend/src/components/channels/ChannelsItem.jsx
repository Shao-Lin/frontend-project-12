import '../../styles/channels/channelsItem.css';
import PropTypes from 'prop-types';

const ChannelsItem = ({ name, key }) => {
  return (
    <li key={key} className={`channel-item`}>
      {name}
    </li>
  );
};
ChannelsItem.propTypes = {
  name: PropTypes.isRequired,
  key: PropTypes.isRequired,
};
export { ChannelsItem };
