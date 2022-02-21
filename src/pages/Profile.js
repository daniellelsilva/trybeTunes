import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

import '../styles/profile.css';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: {},
    };
    this.showName = this.showName.bind(this);
  }

  componentDidMount() {
    this.showName();
  }

  async showName() {
    this.setState({ loading: true });

    const dataUser = await getUser();
    // console.log(dataUser.name);
    this.setState({ user: dataUser });

    this.setState({ loading: false });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile" className="page-profile-container">
        <Header />
        { loading ? <Carregando /> : (
          <div className="profile-container">
            { user.image === '' ? <img src="https://media.istockphoto.com/vectors/abstract-diagonal-lines-striped-black-and-gray-gradient-background-vector-id1129050990?k=20&m=1129050990&s=612x612&w=0&h=eDfc8Yr9YB4NbhfiBUR8mnSnrFBjeriCiTHYYzweop0=" alt="black background" /> : (
              <img src={ user.image } alt="img de perfil" data-testid="profile-image" />
            )}

            <h2>Nome</h2>
            <p>{ user.name}</p>

            <h2>Email</h2>
            <p>{ user.email}</p>

            <h2>Descrição</h2>
            <p>{ user.description}</p>

            <Link to="/profile/edit" className="btn-edit-profile">Editar perfil</Link>
          </div>

        ) }
      </div>
    );
  }
}

export default Profile;
