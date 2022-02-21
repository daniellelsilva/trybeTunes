import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import '../styles/header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
    };

    this.showName = this.showName.bind(this);
  }

  componentDidMount() {
    this.showName();
  }

  async showName() {
    const userName = await getUser();
    this.setState({ name: userName.name });
  }

  render() {
    const { name } = this.state;

    return (
      <header data-testid="header-component">
        <div className="header-info">
          {/* <p className="header-title">TrybeTunes</p> */}
          <a href="https://daniellelsilva.github.io/trybetunes/#/" className="header-title"> TrybeTunes </a>
          <h1 data-testid="header-user-name">{ name }</h1>
        </div>
        <nav>
          <Link to="/search" data-testid="link-to-search"> Pesquisar </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favoritas </Link>
          <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
