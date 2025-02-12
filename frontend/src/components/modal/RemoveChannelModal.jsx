import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDeleteChannelMutation } from '../../api/channelsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../slice/activeChannelSlice';

const RemoveChannelModal = ({ show, setShow, id }) => {
  const dispatch = useDispatch();
  const [deleteChannel] = useDeleteChannelMutation();
  const handleClose = () => setShow(false);
  const activeChannel = useSelector((state) => state.channel.activeChannel);

  const removeChannel = async () => {
    console.log(id);
    try {
      await deleteChannel(id).unwrap();
      if (id === activeChannel) {
        dispatch(setActive('1'));
      }
    } catch (error) {
      console.error(error);
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
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>Уверены?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button onClick={removeChannel} type="submit" variant="danger">
            Удалить
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
