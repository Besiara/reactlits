import React, { Component } from 'react';

export default class Header extends Component {
  handleCurrentPalnetNameChange(event) {
    const currentPalnetName = event.target.value;
    this.props.changeCurrentPalnetName(currentPalnetName);
  }

  render() {
    return (
      <header>
        <h1>{this.props.currentPalnetName}</h1>
        <input
          value={this.props.currentPalnetName}
          onChange={this.handleCurrentPalnetNameChange.bind(this)}
        />
      </header>
    );
  }
}