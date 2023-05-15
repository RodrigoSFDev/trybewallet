// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIE, INFOS } from '../actions';

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

  default:
    return state;
  }
};

export default wallet;
