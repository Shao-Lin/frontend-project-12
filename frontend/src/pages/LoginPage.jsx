import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form as BootstrapForm } from 'react-bootstrap';
import '../styles/loginPageStyle.css';
import reactLogo from '../assets/react.svg';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .required('Обязательное поле'),
});

export const LoginPage = () => (
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
        onSubmit={(values) => {
          console.log(values);
        }}
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

            <FloatingLabel controlId="password" label="Пароль" className="mb-3">
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

            <button className="c-button" type="submit">
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);
