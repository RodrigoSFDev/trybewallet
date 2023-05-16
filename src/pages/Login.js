import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { guardarInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    ativo: true,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target
      .checked : target.value;
    this.setState({ [name]: value }, this.verificar);
  };

  verificar = () => {
    const { email, senha } = this.state;
    const minimo = 6;
    const senhaCorreta = (senha.length >= minimo);
    const emailCorreto = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
    this.setState({
      ativo: !(senhaCorreta && emailCorreto),
    });
  };

  logar = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(guardarInfo(email));
    history.push('/carteira');
  };

  render() {
    const { ativo, senha, email } = this.state;
    return (
      <div>
        <h1>Trybewallet</h1>
        <input
          type="email"
          name="email"
          placeholder="digite seu email"
          value={ email }
          data-testid="email-input"
          onChange={ this.handleChange }
        />

        <input
          type="password"
          name="senha"
          placeholder="digite sua senha"
          value={ senha }
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ ativo }
          onClick={ this.logar }
        >
          Entrar

        </button>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};
