import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../../services/actions/modal-actions.js';

function ModalOverlay({ setClose }) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch({
          type: CLOSE_MODAL,
        });
        setClose();
      }}
      className={styles.modal__overlay}
    ></div>
  );
}

ModalOverlay.propTypes = {
  setClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
