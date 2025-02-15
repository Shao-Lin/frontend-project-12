import { Formik, Form, Field } from 'formik';
import '../../styles/chat/chatInputForm.css';
import { useAddMessageMutation } from '../../api/messagesApi';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useFocus } from '../../hoc/useFocus';
import { useTranslation } from 'react-i18next';

const ChatInputForm = () => {
  const [addMessage, { isFetching }] = useAddMessageMutation();
  const channelId = useSelector((state) => state.channel.activeChannel);
  const { t } = useTranslation();
  const username = localStorage.getItem('username');
  const inputRef = useFocus();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
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
        inputRef.current.focus();
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
                ref={inputRef}
                type="text"
                placeholder={t('chatPage.chat.input_message')}
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
