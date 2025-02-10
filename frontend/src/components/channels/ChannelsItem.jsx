import '../../styles/channels/channelsItem.css';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { RemoveChannelModal } from '../modal/RemoveChannelModal';
import { PatchChannelModal } from '../modal/PatchChannelModal';

const ChannelsItem = ({ name, isActive, id, changeChannel, removable }) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showPatchModal, setShowPatchModal] = useState(false);
  const showRemove = () => {
    setMenuVisible(false);
    setShowRemoveModal(true);
  };
  const showPatch = () => {
    setMenuVisible(false);
    setShowPatchModal(true);
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownRef = useRef();

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const closeMenu = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  return (
    <>
      <li id={id} className={`channel-item ${isActive ? 'active' : ''}`}>
        {removable ? (
          <div className="channel-buttons">
            <button
              id={id}
              className="channel-main-button"
              onClick={changeChannel}
            >
              {name}
            </button>
            <div className="channel-dropdown" ref={dropdownRef}>
              <button className="channel-menu-button" onClick={toggleMenu}>
                ⋮
              </button>
              {menuVisible && (
                <div className="channel-menu">
                  <button onClick={showPatch} className="channel-menu-item">
                    Переименовать
                  </button>
                  <button onClick={showRemove} className="channel-menu-item">
                    Удалить
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            id={id}
            className="channel-full-button"
            onClick={changeChannel}
          >
            {name}
          </button>
        )}
      </li>
      <RemoveChannelModal
        show={showRemoveModal}
        setShow={setShowRemoveModal}
        id={id}
      />
      <PatchChannelModal
        show={showPatchModal}
        setShow={setShowPatchModal}
        id={id}
        name={name}
      />
    </>
  );
};

ChannelsItem.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  changeChannel: PropTypes.func.isRequired,
  removable: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  onRename: PropTypes.func,
};

export { ChannelsItem };
