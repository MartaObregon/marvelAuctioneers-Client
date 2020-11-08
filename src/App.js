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
import AddSale from './components/AddSale'

class App extends Component {


  state = {
    
    showLoginForm: false,
    showRegisterForm: false,
    loggedInUser: null,
    showLogRegBtn: false,
    showUserName: false,
    showWelcome: false,
    salesList: []
  
    
  }

  getallsales = () => {
    axios.get('https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=sp&limit=10&apikey=c6d4ef47b92e1a1aed000aac57d94849')
      .then((response)=>{
        console.log(response.data.results)
        this.setState({
          salesList: response.data
        })
      })
  }
  componentDidMount(){
    
    this.getallsales()
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
          showWelcome: false,
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


  handleAddCredit = (user) => {
    
    axios.patch(`http://localhost:5000/api/profile/${user._id}`, {
      wallet_credit: user.wallet_credit
    })
      .then(()=>{
        console.log(user)
        this.setState({
          loggedInUser: user
        })
      })
 
  }

  handleAddSale = (e) =>{
    e.preventDefault()
    const {expiring_date, state, starting_price} = e.target
    const {salesList} = this.state
    let newSale = {
      expiring_date: expiring_date.value,
      state: state.value,
      starting_price: starting_price.value
    }

    axios.post('http://localhost:5000/api/add-sale', newSale)
      .then((response)=>{
        this.setState({
          salesList: [newSale, ...salesList]
        })
      })

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
         
          <Route path="/profile/:id" render={(routeProps)=>{
            return <ProfilePage  loggedInUser = {loggedInUser}
            onAddCredit = {this.handleAddCredit}
            {...routeProps}
            
            
            
            />
          }}>
           

          </Route>
          <Route exact path="/sell/create-sale" render = {(routeProps)=>{
            return <AddSale loggedInUser = {loggedInUser}
            {...routeProps}
            onAddSale = {this.handleAddSale}
            showWelcome = {showWelcome}
            />
          }}
            ></Route>
        </Switch>
          
        
      </div>
    )
  }
}

export default withRouter(App)