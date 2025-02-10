import '../../styles/channels/channelsHeader.css';
import { AddChannelModal } from '../modal/AddChannelModal';
import { useState } from 'react';

const ChannelsHeader = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="channels-header">
        <h2 className="channels-title">Каналы</h2>
        <button onClick={handleShow} className="add-button">
          Add
        </button>
      </div>
      <AddChannelModal show={show} setShow={setShow} />
    </>
  );
};
export { ChannelsHeader };
