import React, { Component } from 'react';
import Square from './square';


export default class Square extends Component {
render(){
  let color = ['black','white'];
  return(
    <div className="board">
      <Square color="LogIn"/>
    </div>
  )}
}