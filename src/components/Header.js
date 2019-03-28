import React, { Component } from 'react'

import '../stylesheets/Header.css';

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary mb-3">
          <div className="container">
            <a className="navbar-brand" href="/">Corrupt Politicians Analyzer</a>
          </div>
        </nav>
      </div>
    )
  }
}
