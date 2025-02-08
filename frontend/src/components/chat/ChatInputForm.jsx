import { Formik, Form, Field } from 'formik';
import '../../styles/chat/chatInputForm.css';
import { useAddMessageMutation } from '../../api/messagesApi';
import { useSelector } from 'react-redux';

const ChatInputForm = () => {
  const [addMessage, { isFetching }] = useAddMessageMutation();
  const channelId = useSelector((state) => state.channel.activeChannel);
  const username = localStorage.getItem('username');

  const handleSubmit = async (body, { resetForm }) => {
    const { message } = body;

    if (message && username && channelId) {
      try {
        await addMessage({ body: message, channelId, username }).unwrap();
      } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
      }
      resetForm();
    }
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
          <button
            type="submit"
            className="send-button"
            disabled={isSubmitting || isFetching}
          >
            Отправить
          </button>
        </Form>
      )}
    </Formik>
  );
};

export { ChatInputForm };
