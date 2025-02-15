import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import '../../styles/channels/addChannelModal.css';
import {
  useGetChannelsQuery,
  usePatchChannelMutation,
} from '../../api/channelsApi';
import { useTranslation } from 'react-i18next';
import { toast, Bounce } from 'react-toastify';

const PatchChannelModal = ({ show, setShow, id, name }) => {
  const { t } = useTranslation();
  const handleClose = () => setShow(false);
  const { data: dataChannels } = useGetChannelsQuery();
  const [updateChannel] = usePatchChannelMutation();

  const validationSchema = Yup.object({
    channelName: Yup.string()
      .min(3, t('chatPage.modal.errors.interval_symbols'))
      .max(20, t('chatPage.modal.errors.interval_symbols'))
      .required(t('chatPage.modal.errors.required_field')),
  });
  const notify = () =>
    toast.success(t('chatPage.modal.rename_notify'), {
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
    toast.error(t('chatPage.modal.error_rename_notify'), {
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

  const patchChannel = async (values, { resetForm, setFieldError }) => {
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
      await updateChannel({
        id,
        channelName,
      }).unwrap();
      console.log('Calling notify()'); // Проверяем вызов notify
      resetForm();
      handleClose();
      notify();
    } catch (error) {
      console.error(error);
      notifyError();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('chatPage.modal.renameChannel')}</Modal.Title>
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
                    {t('chatPage.modal.btn_cancel')}
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {t('chatPage.modal.btn_rename')}
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
PatchChannelModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
};
export { PatchChannelModal };
