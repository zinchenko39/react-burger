import { IIngredient } from '../../interfaces/IIngredient';
type TFeedInitialState = {
  data: Array<IIngredient>;
  isLoading: boolean;
  error: string;
};

const feedInitialState: TFeedInitialState = {
  data: [],
  isLoading: false,
  error: '',
};

export const feedWsReducer = (
  state: TFeedInitialState = feedInitialState,
  action: any
) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default: {
      return state;
    }
  }
};
