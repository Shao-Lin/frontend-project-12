import { Formik, Form, Field } from 'formik';
import '../../styles/chat/chatInputForm.css';
import { useAddMessageMutation } from '../../api/messagesApi';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useFocus } from '../../hoc/useFocus'; // 👈 Импортируем контекст

const ChatInputForm = () => {
  const [addMessage, { isFetching }] = useAddMessageMutation();
  const channelId = useSelector((state) => state.channel.activeChannel);
  const username = localStorage.getItem('username');
  const inputRef = useFocus(); // 👈 Получаем ref из контекста

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // 👈 Фокусируемся при монтировании
    }
  }, [inputRef]);

  const handleSubmit = async (body, { resetForm }) => {
    const { message } = body;

    if (message && username && channelId) {
      try {
        await addMessage({ body: message, channelId, username }).unwrap();
      } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
      }
      resetForm();
      if (inputRef.current) {
        inputRef.current.focus(); // 👈 Фокусируемся по кнопке
      }
    }
  };

  return (
    <Formik initialValues={{ message: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="chat-footer">
          <Field name="message">
            {({ field }) => (
              <input
                {...field}
                ref={inputRef} // 👈 Используем ref из контекста
                type="text"
                placeholder="Введите сообщение..."
                className="message-input"
                autoFocus
              />
            )}
          </Field>
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
