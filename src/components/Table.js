import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteInfos } from '../redux/actions';

class Table extends Component {
  /*   */

  removeItem = (id) => {
    const { dispatch, expenses } = this.props;
    const excluirObj = expenses.splice(expenses[id], 1);
    dispatch(deleteInfos(excluirObj));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir.</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>
                    {Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)}

                  </td>
                  <td>
                    {(Number(expense.value)
                  * Number(expense.exchangeRates[expense.currency].ask))
                      .toFixed(2)}

                  </td>
                  <td>Real</td>
                  <td>
                    <button type="button">
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.removeItem(expense.id) }
                    >
                      Excluir
                    </button>

                  </td>

                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};
