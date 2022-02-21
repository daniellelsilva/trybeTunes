import React from 'react';
import '../styles/carregando.css';

class Carregando extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <div className="loader" />
      </div>
    );
  }
}

export default Carregando;
