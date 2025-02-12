import { useDispatch } from 'react-redux';
import '../styles/header.css';
import Button from 'react-bootstrap/Button';
import { logout } from '../slice/authSlice';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  const navigateMainPage = () => navigate('/');

  return (
    <div>
      <div className="header-bar">
        <div onClick={navigateMainPage} className="nameChat">
          Chat
        </div>
        <Button
          onClick={handlerLogout}
          className="exitButton"
          variant="outline-primary"
        >
          Выход
        </Button>
      </div>
    </div>
  );
};
export { Header };
