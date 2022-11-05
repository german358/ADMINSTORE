import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RuteosApp } from './RuteosApp';



export class App extends Component{
  render(){
    return(
      <>
        <BrowserRouter>
            <RuteosApp></RuteosApp>
        </BrowserRouter>
      </>
    )
  }
}