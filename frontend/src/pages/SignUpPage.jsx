import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form as BootstrapForm } from 'react-bootstrap';
import '../styles/signupPageStyle.css';
import Button from 'react-bootstrap/Button';
import cookie from '../assets/cookie.png';
import { useSignupUserMutation } from '../api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useSignupUserMutation();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: Yup.string()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
    confirmPassword: Yup.string()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
  });

  const handleSignup = async (credentials) => {
    const { username, password, confirmPassword } = credentials;
    if (password !== confirmPassword) {
      setLoginError('Пароли должны совпадать');
      return;
    }

    try {
      const response = await login({ username, password }).unwrap();
      const { token } = response;
      dispatch(setCredentials({ username, token }));
      console.log(`login ${localStorage.getItem('token')}`);
      navigate('/');
    } catch (err) {
      if (err.status === 409) {
        setLoginError('Пользователь уже существует');
      } else {
        setLoginError('Произошла ошибка сервера');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Регистрация</h1>
        <div className="logo-container">
          <img src={cookie} className="logo react" alt="React logo" />
        </div>
        <Formik
          initialValues={{
            username: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
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
                  autoFocus
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

              <FloatingLabel
                controlId="confirmPassword"
                label="Подтвердите пароль"
                className="mb-3"
              >
                <BootstrapForm.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Подтвердите пароль"
                  isInvalid={
                    !!errors.confirmPassword && touched.confirmPassword
                  }
                  {...getFieldProps('confirmPassword')}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </BootstrapForm.Control.Feedback>
              </FloatingLabel>
              {loginError && <div style={{ color: 'red' }}>{loginError}</div>}

              <Button
                className="c-button"
                type="submit"
                disabled={isLoading}
                variant="outline-primary"
              >
                Зарегистрироваться
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export { SignUpPage };
