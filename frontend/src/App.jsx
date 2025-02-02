import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ChatPage } from './pages/ChatPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RequireAuth } from './hoc/RequireAuth';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <ChatPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
