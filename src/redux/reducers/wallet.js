// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIE } from '../actions';

const initialState = {
  currencies: [],
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case CURRENCIE:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
};

export default wallet;
