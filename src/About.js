import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
  render() {
    return (
      <div>
      
      <nav className="navbar navbar-default">
        <div className="container">
          <ul className="nav navbar-nav">
            <li>
              <a> { this.props.user.login_status ? "Contenctado" : "No Contenctado" }</a>
            </li>
            <li className="active">
              <a href="#/">Volver</a>
            </li>
          </ul>
        </div>
      </nav>
      <h1>Kairopy</h1>
      <p>Sistema de turnos para optimizar tu tiempo</p>
      </div>
    );
  }
}

export default connect( state => state, {})(About);