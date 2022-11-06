import React from 'react';
import styles from './modal-overlay.module.css';

import { IModal } from '../../interfaces/IModal';

function ModalOverlay({ close }: IModal) {
  return <div onClick={close} className={styles.modal__overlay}></div>;
}

export default ModalOverlay;
