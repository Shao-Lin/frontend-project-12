import '../../styles/channels/channelsHeader.css';
import { AddChannelModal } from '../modal/AddChannelModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import plus from '../../assets/plus.png';

const ChannelsHeader = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="channels-header">
        <h2 className="channels-title">{t('chatPage.channels.channels')}</h2>
        <button onClick={handleShow} className="add-button">
          <img src={plus} alt="Add" className="plus-icon" />
        </button>
      </div>
      <AddChannelModal show={show} setShow={setShow} />
    </>
  );
};
export { ChannelsHeader };
