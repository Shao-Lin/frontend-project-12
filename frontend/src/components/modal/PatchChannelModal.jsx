import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import '../../styles/channels/addChannelModal.css';
import {
  useGetChannelsQuery,
  usePatchChannelMutation,
} from '../../api/channelsApi';
const PatchChannelModal = ({ show, setShow, id, name }) => {
  const handleClose = () => setShow(false);
  const { data: dataChannels } = useGetChannelsQuery();
  const [updateChannel] = usePatchChannelMutation();

  const validationSchema = Yup.object({
    channelName: Yup.string()
      .min(3, 'Название должно быть минимум 3 символа')
      .max(20, 'Название не должно превышать 20 символов')
      .required('Название обязательно'),
  });

  const patchChannel = async (values, { resetForm, setFieldError }) => {
    const { channelName } = values;
    const repetitive = dataChannels?.find(
      (channel) => channel.name.toLowerCase() === channelName.toLowerCase()
    );
    if (repetitive) {
      setFieldError('channelName', 'Такой канал уже существует');
      return;
    }
    try {
      await updateChannel({
        id,
        channelName,
      }).unwrap();

      resetForm();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новый канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: name }}
          validationSchema={validationSchema}
          onSubmit={patchChannel}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="channelName">Переименовать канал</label>
                <Field
                  id="channelName"
                  name="channelName"
                  type="text"
                  placeholder="Введите название"
                  className="form-control"
                  autoFocus
                />
                <ErrorMessage
                  name="channelName"
                  component="div"
                  className="error-message"
                />
              </div>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Отменить
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Отправить
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
PatchChannelModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
};
export { PatchChannelModal };
