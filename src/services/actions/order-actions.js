import { makeOrder } from '../../utils/api.js';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const ORDER_REQUEST_SUCCESS = 'ORDER_REQUEST_SUCCESS';
export const ORDER_REQUEST_FAILED = 'ORDER_REQUEST_FAILED';

export function sendItems(orderId) {
    return function(dispatch) {
        // const state = getState();

        // function filterOrderId(items) {
        //     const arrOrderId = [];
        
        //     items.forEach((elem) => {
        //       arrOrderId.push(elem._id);
        //     });
        //     const order = {
        //         ingredients: arrOrderId
        //     }
        //     return order;
        //   }
        // console.log(filterOrderId(state.cart.constructor.items))
        // const order = {
        //     ingredients: ["60666c42cc7b410027a1a9b1", "60666c42cc7b410027a1a9b5"]
        //   }


      dispatch({
        type: SEND_ORDER_REQUEST,
      });
      makeOrder(orderId).then(res => {
        if (res && res.success) {
          dispatch({
            type: ORDER_REQUEST_SUCCESS,
            orderNumber: res.order.number,
            orderId,
          })
        }
      })
      .catch((error) => {
        dispatch({
            type: ORDER_REQUEST_FAILED,
            error
          });
      })
    };
  }