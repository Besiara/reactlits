import React, { Component, PropTypes } from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// API
import { Chats } from '/imports/api/chats.js';
import { Users } from '/imports/api/users.js';

export default class UsersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      selectedUser: "",
      selectedRow: null,
      stripedRows: true,
      showRowHover: false,
      deselectOnClickaway: false,
      buttonDisabled: true,
      dialogTitle: "",
      chatTitle: "",
      firtstMessage: "Hey Bro, "
    };
  }

  addChat() {
    console.log (Chats.find({}).fetch());
    Meteor.call('newChat', {
        name: this.state.chatTitle,
        users: {firstUser: Meteor.user(), secondUser: this.state.selectedUser},
        picture: '',
        lastMessage: {
          text: this.state.firtstMessage,
          timestamp: new Date()
        }
    });
    this.forceUpdate();
    FlowRouter.go('chats');
  }

  handleDialogOpen(){
    this.setState({openDialog: true});
  };

  handleDialogClose () {
    this.setState({openDialog: false});
  };
  handleFieldChange(event) {
    this.setState({firtstMessage: event.target.value});
  }
  _onRowSelection(key) {
   const users = Users.fetch();
   if (users[key] !== undefined) {
    setTimeout(()=> {
      this.setState({
        selectedUser: users[key]._id,
        dialogTitle: "Create chat with " + users[key].username,
        chatTitle: "Chat with " + users[key].username,
        selectedRow: key,
        buttonDisabled: false
      });
      console.log(this.state.selectedUser);
    },500);
   }
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={()=>this.addChat()}
      
      />,
    ];
    return (
      <div>
        <Table  onRowSelection={(k)=>this._onRowSelection(k)}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn colSpan="2" tooltip="Users" style={{textAlign: 'center'}}>
               Users
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
           {Users.map( (user, index) =>
              <TableRow key={index} selected={index==this.state.selectedRow}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{user.username}</TableRowColumn>
              </TableRow>
           )}
          </TableBody>
        </Table>
        <div className="text-center button-section"><RaisedButton label="Create Chat" primary={true} disabled={this.state.buttonDisabled} onTouchTap={()=>this.handleDialogOpen()}/></div>
        <Dialog
          className="text-center"
          title={this.state.dialogTitle}
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={()=>this.handleDialogClose()} >
            <TextField hintText="Hi Message" value={this.state.firtstMessage} onChange={(event)=>this.handleFieldChange(event)} fullWidth={true}/> <br/><br/>
            <RaisedButton containerElement='label' label='Chat Avatar'>
                <input className="fileInput" type="file" />
            </RaisedButton>
        </Dialog>
      </div>
    );
  }
}