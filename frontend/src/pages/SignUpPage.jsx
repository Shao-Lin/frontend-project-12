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
import { useTranslation } from 'react-i18next';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [login, { isLoading }] = useSignupUserMutation();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('signupPage.errors.required_field'))
      .min(3, t('signupPage.errors.interval_symbols'))
      .max(20, t('signupPage.errors.interval_symbols')),
    password: Yup.string()
      .required(t('signupPage.errors.required_field'))
      .min(6, t('signupPage.errors.limitation_password')),
    confirmPassword: Yup.string()
      .required(t('signupPage.errors.required_field'))
      .min(6, t('signupPage.errors.limitation_password')),
  });

  const handleSignup = async (credentials) => {
    const { username, password, confirmPassword } = credentials;
    if (password !== confirmPassword) {
      setLoginError(t('signupPage.errors.matching_passwords'));
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
        setLoginError(t('signupPage.errors.user_already_exists'));
      } else {
        setLoginError(t('signupPage.errors.server_error'));
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{t('signupPage.registration')}</h1>
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
                label={t('signupPage.label_username')}
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
                label={t('signupPage.label_password')}
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
                label={t('signupPage.label_confirm_password')}
                className="mb-3"
              >
                <BootstrapForm.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="confirmPassword"
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
                {t('signupPage.button_registration')}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export { SignUpPage };
