import React, { Component } from 'react';

export default class Square extends Component {
render(){
  return(
    <div className={this.props.color}></div>
  )}
}