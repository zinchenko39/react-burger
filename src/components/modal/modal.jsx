import { React, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../index.js';

const modalsElement = document.getElementById('modal');
function Modal({ isOpen, close, children }) {
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        close();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    isOpen &&
    createPortal(
      <div className={styles.modal__root}>
        <ModalOverlay setClose={close} />
        <div className={styles.modal__content}>
          {children}
          <div onClick={close} className={styles.modal__close}>
            <CloseIcon type="primary" />
          </div>
        </div>
      </div>,
      modalsElement
    )
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
