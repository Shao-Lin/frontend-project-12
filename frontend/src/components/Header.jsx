import '../styles/header.css';
import Button from 'react-bootstrap/Button';
const Header = () => {
  return (
    <div>
      <div className="header-bar">
        <div className="nameChat">Chat</div>
        <Button className="exitButton" variant="outline-primary">
          Выход
        </Button>
      </div>
    </div>
  );
};
export { Header };
