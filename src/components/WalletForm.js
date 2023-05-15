import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, guardaInfos } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Lazer',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target
      .checked : target.value;
    this.setState({ [name]: value }, this.verificar);
  };

  fetchAsk = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    delete currencies.USDT; // Remover a moeda USDT
    return currencies;
  };

  saveInfos = async () => {
    const { value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const exchangeRates = await this.fetchAsk();
    dispatch(guardaInfos({ value, description, currency, method, tag, exchangeRates }));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="despesa">
            Valor da despesa:
            <input
              type="number"
              name="value"
              onChange={ this.handleChange }
              id="despesa"
              data-testid="value-input"
              value={ value }
            />
          </label>
          Descrição da despesa:
          <label htmlFor="info">
            <input
              type="text"
              onChange={ this.handleChange }
              name="description"
              id="info"
              data-testid="description-input"
              value={ description }
            />
          </label>

          <label htmlFor="moeda">
            Moeda:
            <select
              name="currency"
              onChange={ this.handleChange }
              value={ currency }
              id="moeda"
              data-testid="currency-input"
            >
              {currencies.map((currencie, index) => (
                <option key={ index }>{currencie}</option>
              ))}
            </select>
          </label>
          <label htmlFor="metodo">
            Método de pagamento:
            <select
              name="method"
              onChange={ this.handleChange }
              value={ method }
              id="metodo"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tipo de despesa:
            <select
              name="tag"
              onChange={ this.handleChange }
              value={ tag }
              id="tag"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            onClick={ this.saveInfos }
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  // expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
