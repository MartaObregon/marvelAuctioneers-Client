import React, { Component } from 'react'
import Nav from './components/MainNav'
import LoginBox from './components/LoginBox'
import RegisterBox from './components/RegisterBox'
import './App.css'




import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

export default class App extends Component {


  state = {
    showLoginForm: false,
    showRegisterForm: false,
    
  }

  handleShowLogin = () => {
    this.setState({
      showLoginForm:true,
      showRegisterForm: false,
    })
  }

  handleShowRegister = () =>{
    this.setState({
      showLoginForm:false,
      showRegisterForm: true,
    })
  }


  render() {
    return (
      <div>
        <Nav onShowLogin ={this.handleShowLogin} onShowRegister = {this.handleShowRegister}/>
        <div className="box-container">
          {
            
            this.state.showLoginForm ? (
              <LoginBox/>
            ) : (
              <p></p>
            )
          },
          {
            this.state.showRegisterForm ? (
              <RegisterBox/>
            ):(
              <p></p>
            )

          }
        </div>
        
        
      </div>
    )
  }
}

