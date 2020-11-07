import React, { Component } from 'react'
import Nav from './components/MainNav'
import LoginBox from './components/LoginBox'
import RegisterBox from './components/RegisterBox'
import './App.css'
import {withRouter} from 'react-router'
import {Switch, Link, Route} from 'react-router-dom'
import ProfilePage from './components/ProfilePage'


import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import Banner from './components/Banner'
import Saleslist from './components/Saleslist'
import WelcomeBox from './components/WelcomeBox'

class App extends Component {


  state = {
    showLoginForm: false,
    showRegisterForm: false,
    loggedInUser: null,
    showLogRegBtn: false,
    showUserName: false,
    showWelcome: true,
  
    
  }

  handleShowLogin = () => {
    this.setState({
      showLoginForm:true,
      showRegisterForm: false,
      showWelcome: false,
    })
  }

  handleShowRegister = () =>{
    this.setState({
      showLoginForm:false,
      showRegisterForm: true,
      showWelcome:false,
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
        }, ()=>{this.props.history.push('/')})
      })
  }


  handleAddCredit = (e) => {
    console.log('add-credit')
    // const {credit} = e.target
  }


  render() {
    const {loggedInUser, showLoginForm, showRegisterForm, showWelcome} = this.state

    return (
      <div>
        <Nav onShowLogin ={this.handleShowLogin} onShowRegister = {this.handleShowRegister}
        loggedInUser = {loggedInUser}
        onLogOut = {this.handleLogOut}
        />

        <div>

          {
            showWelcome ?(<><WelcomeBox/> </>) : (null)
          }
          {
           showLoginForm ? (
              <>
              <LoginBox onLogin = {this.handleLogin}/>
              <Banner/>
              </>
            ) : (null)
          }
          {
            showRegisterForm ? (
              <>
              <RegisterBox onRegister = {this.handleRegister}/>
              <Banner/>
              </>
            ):(null)

          }
        </div>
     
        
        
        <Switch>
        
          <Route exact path="/" render= {()=>{
           
            return (
              <Banner/>
            )
          }}/>
         
          <Route path ="/buy" render={
              () =>{
                return (
                  <>
                  
                  <Saleslist/>
                  </>
                )
              }
          }>

          </Route>
          <Route path="/:userId/profile" render={(routeProps)=>{
            return <ProfilePage loggedInUser = {loggedInUser} {...routeProps}
            onAddCredit = {this.handleAddCredit}
            
            
            />
          }}>

          </Route>
        </Switch>
          
        
      </div>
    )
  }
}

export default withRouter(App)