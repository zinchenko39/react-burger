import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal-actions";

const modalState = {
    isOpen: false,
}

export const modalReducer  = (state = modalState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
              ...state,
              isOpen: true
            };
        }
        case CLOSE_MODAL: {
            return { 
                ...state, 
                isOpen: false
            };
        }
        default: {
            return state;
        }
    }
  }