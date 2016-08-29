// React Dependencies
import React, { Component, PropTypes } from 'react';

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';




export default class Main extends Component {
  render(){
    return(
      <MuiThemeProvider>
        <div>{this.props.content}</div>
      </MuiThemeProvider>
    );
  }
}

Main.propTypes = {
  content: PropTypes.element.isRequired,
};
