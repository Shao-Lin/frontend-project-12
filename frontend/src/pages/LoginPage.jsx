import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form as BootstrapForm } from 'react-bootstrap';
import '../styles/loginPageStyle.css';
import Button from 'react-bootstrap/Button';
import mummy from '../assets/mummy.png';
import { useLoginUserMutation } from '../api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState();

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required(t('loginPage.errors.required_field')),
    password: Yup.string().required(t('loginPage.errors.required_field')),
  });

  const handleLogin = async (credentials) => {
    try {
      const { token, username } = await login(credentials).unwrap();
      dispatch(setCredentials({ username, token }));
      console.log(`login ${localStorage.getItem('token')}`);
      navigate('/');
    } catch (err) {
      if (err.status === 401) {
        setLoginError(t('loginPage.errors.auth_error'));
      } else {
        setLoginError(t('loginPage.errors.server_error'));
      }
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{t('loginPage.entry')}</h1>
        <div className="logo-container">
          <img src={mummy} className="logo react" alt="React logo" />
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
                label={t('loginPage.label_username')}
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
                label={t('loginPage.label_password')}
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

              <Button
                className="c-button"
                type="submit"
                disabled={isLoading}
                variant="outline-primary"
              >
                {t('loginPage.button_entry')}
              </Button>
              <div className="login-footer">
                <p>
                  {t('loginPage.no_account')}
                  <Link to="/signup">{t('loginPage.registration')}</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
