import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDeleteChannelMutation } from '../../api/channelsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../slice/activeChannelSlice';
import { useTranslation } from 'react-i18next';
import { toast, Bounce } from 'react-toastify';

const RemoveChannelModal = ({ show, setShow, id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [deleteChannel] = useDeleteChannelMutation();
  const handleClose = () => setShow(false);
  const activeChannel = useSelector((state) => state.channel.activeChannel);
  const notify = () =>
    toast.success(t('chatPage.modal.remove_notify'), {
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
    toast.error(t('chatPage.modal.error_remove_notify'), {
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
  const removeChannel = async () => {
    try {
      await deleteChannel(id).unwrap();
      notify();
      if (id === activeChannel) {
        dispatch(setActive('1'));
      }
    } catch (error) {
      console.error(error);
      notifyError();
    }

    handleClose();
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
          <Modal.Title>{t('chatPage.modal.deleteChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('chatPage.modal.sure')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('chatPage.modal.btn_cancel')}
          </Button>
          <Button onClick={removeChannel} type="submit" variant="danger">
            {t('chatPage.modal.btn_remove')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
RemoveChannelModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
export { RemoveChannelModal };
