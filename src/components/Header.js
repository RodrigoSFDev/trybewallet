import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    cambio: 'BRL',
  };

  render() {
    const { cambio } = this.state;
    const { email, expenses } = this.props;

    const total = expenses
      .reduce((sum, expense) => sum + Number(expense.value)
  * Number(expense.exchangeRates[expense.currency].ask), 0).toFixed(2);
    return (
      <div>
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">{total}</div>
        <div data-testid="header-currency-field">{cambio}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
