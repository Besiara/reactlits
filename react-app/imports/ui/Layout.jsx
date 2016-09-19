import React, { Component } from 'react';

import Header from '/imports/ui/Header.jsx'
import Footer from '/imports/ui/Footer.jsx'

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPalnetName: 'Earth',
    }
  }

  changeCurrentPalnetName(currentPalnetName) {
    this.setState({ currentPalnetName });
  }

  render() {
    const appNameVar = 'currentPalnetName from var';
    return (
      <div>
        <Header
          changeCurrentPalnetName={this.changeCurrentPalnetName.bind(this)}
          currentPalnetName={this.state.currentPalnetName}
        />
        <Footer />
      </div>
    );
  }
} 