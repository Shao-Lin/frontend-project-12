import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form as BootstrapForm } from 'react-bootstrap';
import '../styles/loginPageStyle.css';
import reactLogo from '../assets/react.svg';
import { useLoginUserMutation } from '../api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState();

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const handleLogin = async (credentials) => {
    try {
      const { token, username } = await login(credentials).unwrap();
      dispatch(setCredentials({ username, token }));
      console.log(`login ${localStorage.getItem('token')}`);
      navigate('/');
    } catch (err) {
      if (err.status === 401) {
        setLoginError('Неверные имя пользователя или пароль');
      } else {
        setLoginError('Произошла ошибка сервера');
      }
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Войти</h1>
        <div className="logo-container">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form>
              <FloatingLabel
                controlId="username"
                label="Ваш ник"
                className="mb-3"
              >
                <BootstrapForm.Control
                  type="text"
                  name="username"
                  placeholder="name"
                  isInvalid={!!errors.username && touched.username}
                  {...getFieldProps('username')}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.username}
                </BootstrapForm.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel
                controlId="password"
                label="Пароль"
                className="mb-3"
              >
                <BootstrapForm.Control
                  type="password"
                  placeholder="password"
                  isInvalid={!!errors.password && touched.password}
                  {...getFieldProps('password')}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.password}
                </BootstrapForm.Control.Feedback>
              </FloatingLabel>
              {loginError && <div style={{ color: 'red' }}>{loginError}</div>}

              <button className="c-button" type="submit" disabled={isLoading}>
                Войти
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
