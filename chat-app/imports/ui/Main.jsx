// React Dependencies
import React, { Component, PropTypes } from 'react';

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';

import RegistrationModal from '/imports/ui/RegistrationModal';


const muiTheme = getMuiTheme({
  appBar: {
    color: '#FB8C00',
  },
  title: {
    cursor: 'pointer',
  },
});


export default class Main extends Component {

  render(){
    let buttonStyle = {
      backgroundColor: 'transparent',
      color: 'white',
      marginTop: '13px'
    };
    return(
      <div className="front-page">
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar title="Awesome Chat App"
          iconClassNameRight="muidocs-icon-navigation-expand-more">
            <RegistrationModal style={buttonStyle} name="LogIn"/>
            <RegistrationModal style={buttonStyle} name="SignUp"/>
            <FlatButton 
              label="Chats" 
              style={buttonStyle}
              onClick={() => FlowRouter.go('chats')}
            />
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

Main.propTypes = {
  content: PropTypes.element.isRequired,
};
