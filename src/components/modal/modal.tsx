import { useEffect, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../index';

import { IModal } from '../../interfaces/IModal';

const modalsElement: any = document.getElementById('modal');

function Modal({ isOpen = true, close, children }: PropsWithChildren<IModal>) {
  useEffect(() => {
    function closeByEscape(evt: any) {
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

  return isOpen
    ? createPortal(
        <div className={styles.modal__root}>
          <ModalOverlay close={close} />
          <div className={styles.modal__content}>
            {children}
            <div
              onClick={(): void => {
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
    : null;
}

export default Modal;
