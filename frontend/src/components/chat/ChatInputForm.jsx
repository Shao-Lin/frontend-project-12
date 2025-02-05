import { Formik, Form, Field } from 'formik';
import '../../styles/chat/chatInputForm.css';

const ChatInputForm = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log('Отправлено сообщение:', values.message);
    resetForm();
  };

  return (
    <Formik initialValues={{ message: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="chat-footer">
          <Field
            name="message"
            type="text"
            placeholder="Введите сообщение..."
            className="message-input"
          />
          <button type="submit" className="send-button" disabled={isSubmitting}>
            Отправить
          </button>
        </Form>
      )}
    </Formik>
  );
};

export { ChatInputForm };
