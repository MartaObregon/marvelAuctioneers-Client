import React, { Component } from 'react'
import Nav from './components/MainNav'
import LoginBox from './components/LoginBox'
import RegisterBox from './components/RegisterBox'
import './App.css'
import {withRouter} from 'react-router'


import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

class App extends Component {


  state = {
    showLoginForm: false,
    showRegisterForm: false,
    loggedInUser: null,
    showLogRegBtn: false,
    showUserName: false,
    
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




  handleRegister = (e) =>{
    e.preventDefault();
    const {email, username, password} = e.target
    axios.post('http://localhost:5000/api/register', {
      email: email.value,
      username: username.value,
      password: password.value
    })
    
      .then((response)=>{
        console.log('registered:')
        this.setState({
          
          loggedInUser: response.data,
          showRegisterForm:false,
          showLoginForm: false,
          
        }, () =>{
          this.props.history.push('/')
        }
          
      )
      })
      
  }
  handleLogin = (e)=>{
    e.preventDefault();
    const {email, password} = e.target

    axios.post('http://localhost:5000/api/login', {
      email: email.value,
      password: password.value
    })
      .then((response)=>{
        this.setState({
          loggedInUser: response.data,
          showLoginForm: false,
          showRegisterForm: false,
        }, ()=>{
          this.props.history.push('/')
        })
        
      })

  }


  handleLogOut = () =>{
    console.log('logout')
    axios.post('http://localhost:5000/api/logout')
      .then(()=>{
        this.setState({
          loggedInUser: null,
        })
      })
  }


  render() {
    const {loggedInUser} = this.state
    return (
      <div>
        <Nav onShowLogin ={this.handleShowLogin} onShowRegister = {this.handleShowRegister}
        loggedInUser = {loggedInUser}
        onLogOut = {this.handleLogOut}
        />
        <div >
          {
            
            this.state.showLoginForm ? (
              <LoginBox onLogin = {this.handleLogin}/>
            ) : (null)
          }
          {
            this.state.showRegisterForm ? (
              <RegisterBox onRegister = {this.handleRegister}/>
            ):(null)

          }
        </div>
          
        
      </div>
    )
  }
}

export default withRouter(App)