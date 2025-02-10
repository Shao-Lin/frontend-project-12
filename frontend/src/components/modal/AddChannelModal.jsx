import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import '../../styles/channels/addChannelModal.css';
import {
  useGetChannelsQuery,
  useAddChannelMutation,
} from '../../api/channelsApi';
import { useDispatch } from 'react-redux';
import { setActive } from '../../slice/activeChannelSlice';

const AddChannelModal = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const { data: dataChannels } = useGetChannelsQuery();
  const [addNewChannel] = useAddChannelMutation();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    channelName: Yup.string()
      .min(3, 'Название должно быть минимум 3 символа')
      .max(20, 'Название не должно превышать 20 символов')
      .required('Название обязательно'),
  });

  const addChannel = async (values, { resetForm, setFieldError }) => {
    const { channelName } = values;
    const repetitive = dataChannels?.find(
      (channel) => channel.name.toLowerCase() === channelName.toLowerCase()
    );
    if (repetitive) {
      setFieldError('channelName', 'Такой канал уже существует');
      return;
    }

    try {
      const response = await addNewChannel({
        name: channelName,
        removable: true,
      }).unwrap();
      const { id } = response;
      dispatch(setActive(id));

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
          initialValues={{ channelName: '' }}
          validationSchema={validationSchema}
          onSubmit={addChannel}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="channelName">Название канала</label>
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
                  Закрыть
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Создать
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

AddChannelModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
};

export { AddChannelModal };
