import { useDispatch } from 'react-redux';
import '../styles/header.css';
import Button from 'react-bootstrap/Button';
import { logout } from '../slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlerLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  const navigateMainPage = () => navigate('/');

  return (
    <div>
      <div className="header-bar">
        <div onClick={navigateMainPage} className="nameChat">
          {t('header.chat')}
        </div>
        <Button
          onClick={handlerLogout}
          className="exitButton"
          variant="outline-primary"
        >
          {t('header.exit')}
        </Button>
      </div>
    </div>
  );
};
export { Header };
