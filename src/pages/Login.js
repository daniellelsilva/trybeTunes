import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

import '../styles/loginPage.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      loading: false,
      login: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    });
  }

  async submitButton() {
    const { inputName } = this.state;
    this.setState({ loading: true });

    await createUser({ name: inputName });
    this.setState({ loading: false, login: true });
  }

  render() {
    const { inputName, loading, login } = this.state;
    const minLetters = 3;

    if (login) return <Redirect to="/search" />;

    return (
      <div data-testid="page-login">
        { loading ? <Carregando />
          : (
            <div className="login-page-div">
              <p className="trybeTunes-title">TrybeTunes</p>
              <form className="login-page">
                <input
                  type="text"
                  data-testid="login-name-input"
                  id="inputName"
                  className="inputName"
                  name="inputName"
                  placeholder="Nome"
                  value={ inputName }
                  onChange={ this.handleChange }
                />
                <button
                  type="button"
                  id="btn-login-page"
                  data-testid="login-submit-button"
                  disabled={ inputName.length < minLetters }
                  onClick={ this.submitButton }
                >
                  Entrar

                </button>
              </form>
            </div>

          )}

      </div>
    );
  }
}

export default Login;
