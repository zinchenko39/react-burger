import { React, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../../services/actions/modal-actions.js';
import PropTypes, { bool, object } from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../index.js';

const modalsElement = document.getElementById('modal');
function Modal({ isOpen = true, close, children }) {
  const dispatch = useDispatch();

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
          <div
            onClick={() => {
              dispatch({
                type: CLOSE_MODAL,
              });
              close();
            }}
            className={styles.modal__close}
          >
            <CloseIcon type="primary" />
          </div>
        </div>
      </div>,
      modalsElement
    )
  );
}

Modal.propTypes = {
  isOpen: PropTypes.oneOfType([object, bool]),
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
