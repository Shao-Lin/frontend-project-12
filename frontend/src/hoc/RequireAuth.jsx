import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};
RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
export { RequireAuth };
