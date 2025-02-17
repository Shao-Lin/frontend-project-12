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
import { useTranslation } from 'react-i18next';
import { toast, Bounce } from 'react-toastify';

const AddChannelModal = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const { data: dataChannels } = useGetChannelsQuery();
  const [addNewChannel] = useAddChannelMutation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const notify = () =>
    toast.success(t('chatPage.modal.add_notify'), {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });

  const notifyError = () =>
    toast.error(t('chatPage.modal.error_add_notify'), {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });

  const validationSchema = Yup.object({
    channelName: Yup.string()
      .min(3, t('chatPage.modal.errors.interval_symbols'))
      .max(20, t('chatPage.modal.errors.interval_symbols')),
  });

  const addChannel = async (values, { resetForm, setFieldError }) => {
    const { channelName } = values;
    const repetitive = dataChannels?.find(
      (channel) => channel.name.toLowerCase() === channelName.toLowerCase()
    );
    if (repetitive) {
      setFieldError(
        'channelName',
        t('chatPage.modal.errors.channel_already_exists')
      );
      return;
    }

    try {
      const response = await addNewChannel({
        name: channelName,
        removable: true,
      }).unwrap();
      const { id } = response;
      dispatch(setActive(id));
      notify();
      resetForm();
      handleClose();
    } catch (error) {
      console.error(error);
      notifyError();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chatPage.modal.addChannel')}</Modal.Title>
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
                <label htmlFor="channelName"></label>
                <Field
                  id="channelName"
                  name="channelName"
                  type="text"
                  placeholder={t('chatPage.modal.label_name')}
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
                  {t('chatPage.modal.btn_close')}
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {t('chatPage.modal.btn_create')}
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
