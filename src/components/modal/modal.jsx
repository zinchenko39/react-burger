import React from 'react'
import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon }from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from  '../index.js'
const modalsElement = document.getElementById('modal');

function Modal(props) {
    React.useEffect(() => {
        function closeByEscape(evt) {
          if(evt.key === 'Escape') {
             props.close();
          }
        }
        if(props.isOpen) {
          document.addEventListener('keydown', closeByEscape);
          return () => {
            document.removeEventListener('keydown', closeByEscape);
          }
        }
      }, [props.isOpen])

  return props.isOpen && ReactDOM.createPortal(
    <div className={styles.modal__root}>
        <ModalOverlay setClose={props.close}/>
        <div className={styles.modal__content}>
            {props.children}
            <div onClick={props.close} className={styles.modal__close}>
                <CloseIcon type="primary"/>
            </div>
        </div>
    </div>,
    modalsElement
  )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}
 
export default Modal;