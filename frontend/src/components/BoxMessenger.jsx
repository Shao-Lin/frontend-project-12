import '../styles/boxMessenger.css';
import PropTypes from 'prop-types';
const BoxMessenger = ({ children }) => {
  return (
    <div className="box-container">
      <div className="box-content">
        <div className="flex-container">{children}</div>
      </div>
    </div>
  );
};
BoxMessenger.propTypes = {
  children: PropTypes.node.isRequired,
};
export { BoxMessenger };
