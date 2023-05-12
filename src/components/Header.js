import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    despesa: 0,
    cambio: 'BRL',
  };

  render() {
    const { despesa, cambio } = this.state;
    const { email } = this.props;
    return (
      <div>
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">{despesa}</div>
        <div data-testid="header-currency-field">{cambio}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
