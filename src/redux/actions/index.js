export const LOGAR = 'LOGAR';
export const guardarInfo = (payload) => ({
  type: LOGAR,
  payload,
});

export const CURRENCIE = 'FETCH_CURRENCIES';
export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  delete currencies.USDT; // Remover a moeda USDT
  dispatch({ type: CURRENCIE, payload: Object.keys(currencies) });
};

export const INFOS = 'GUARDA_INFOS';
export const guardaInfos = (payload) => ({
  type: INFOS,
  payload,
});
