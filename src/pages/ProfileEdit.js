import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';

import '../styles/edit-profile.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
      saveBtnDisable: true,
      formUpdated: false,
    };

    this.userInfo = this.userInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateSaveBtn = this.validateSaveBtn.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.userInfo();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });

    this.validateSaveBtn();
  }

  async handleClick() {
    const { name, email, description, image } = this.state;
    this.setState({ loading: true });

    await updateUser({ name, email, image, description });
    this.setState({ loading: false, formUpdated: true });
  }

  async userInfo() {
    this.setState({ loading: true });

    await getUser()
      .then(({ name, email, description, image }) => this
        .setState({ name, email, description, image }));

    this.setState({ loading: false });
  }

  validateSaveBtn() {
    const { name, email, description, image } = this.state;

    this.setState({
      saveBtnDisable: (
        (name.length === 0)
        || !(email.match(/\S+@\S+\.\S+/))
        || (description.length === 0)
        || (image.length === 0)),
    });
  }

  render() {
    const {
      loading,
      name,
      email,
      description,
      image,
      saveBtnDisable,
      formUpdated } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Carregando /> : (
          <form>
            <div className="edit-profile-form">
              <label htmlFor="name-input">
                Nome
                <input
                  id="name-input"
                  name="name"
                  data-testid="edit-input-name"
                  type="text"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>

              <label htmlFor="email-input">
                Email
                <input
                  id="email-input"
                  name="email"
                  data-testid="edit-input-email"
                  type="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>

              <label htmlFor="description-input">
                Descrição
                <textarea
                  id="description-input"
                  name="description"
                  data-testid="edit-input-description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>

              <label htmlFor="image-input-edit-profile">
                Imagem
                <input
                  id="image-input-edit-profile"
                  name="image"
                  data-testid="edit-input-image"
                  type="text"
                  value={ image }
                  onChange={ this.handleChange }
                />
              </label>

            </div>

            <button
              id="save-edtProfile-btn"
              data-testid="edit-button-save"
              type="submit"
              disabled={ saveBtnDisable }
              onClick={ this.handleClick }
            >
              Salvar

            </button>
          </form>
        )}
        {formUpdated && <Redirect to="/profile" exact />}
      </div>
    );
  }
}

export default ProfileEdit;
