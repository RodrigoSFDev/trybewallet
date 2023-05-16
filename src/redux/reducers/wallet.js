// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIE, DELETE_INFOS, INFOS } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case CURRENCIE:
    return { ...state, currencies: action.payload };
  case INFOS:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload, id: state.expenses.length }],
    };

  case DELETE_INFOS:
    return {
      ...state,
      expenses: [...state.expenses],
    };

  default:
    return state;
  }
};

export default wallet;
