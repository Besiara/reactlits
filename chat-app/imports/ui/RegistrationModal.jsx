// React Dependencies
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';

export default class RegistrationModal extends Component {
  
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleOpen(){
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
  };

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={()=>this.handleClose()}
      />,
      <FlatButton
        label={this.props.name}
        primary={true}
        keyboardFocused={true}
        onTouchTap={()=>this.handleClose()}
      />,
    ];

    return (
      <div>
        <FlatButton style={this.props.style} label={this.props.name} onTouchTap={()=>this.handleOpen()} />
        <Dialog
          title={this.props.name}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={()=>this.handleClose()}
        >
          <DatePicker hintText="Date Picker" />
        </Dialog>
      </div>
    );
  }
}