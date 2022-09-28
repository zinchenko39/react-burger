import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ setClose }) {
  return <div onClick={setClose} className={styles.modal__overlay}></div>;
}

ModalOverlay.propTypes = {
  setClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
