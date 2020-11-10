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
import SaleDetail from './components/SaleDetail'

class App extends Component {


  state = {
    
    showLoginForm: false,
    showRegisterForm: false,
    loggedInUser: null,
    showLogRegBtn: false,
    showUserName: false,
    showWelcome: false,
    salesList: [],
    
  
    
  }

  getallsales = () => {
    axios.get('http://localhost:5000/api/search')
      .then((response)=>{
        this.setState({
          salesList: [...response.data]
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
    }, {withCredentials:true})
    
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
    },{withCredentials:true})
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
    axios.post('http://localhost:5000/api/logout', {}, {withCredentials:true})
      .then(()=>{
        this.setState({
          loggedInUser: null,
        }, ()=>{this.props.history.push('/')})
      })
  }


  handleAddCredit = (e) => {
    e.preventDefault()
    const {loggedInUser} = this.state
    
    console.log(e.target.wallet_credit.value)
    axios.patch(`http://localhost:5000/api/profile/edit`, {
      wallet_credit: e.target.wallet_credit.value,
    },{withCredentials:true})
      .then((response)=>{
        console.log(response.data)
        this.setState({
          loggedInUser: response.data
        }, ()=>{this.props.history.push(`/profile/${loggedInUser._id}`)})
      })
 
  }

  handleAddSale = (e) =>{
    e.preventDefault()
    console.log(e.target.title.value)
    const {title, description, expiring_date, state, starting_price, image_url, release_year} = e.target
    
    const {salesList} = this.state
    let newSale = {
      title: title.value,
      description: description.value,
      expiring_date: expiring_date.value,
      state: state.value,
      starting_price: starting_price.value,
      release_year: release_year.value,
      image_url: image_url.value
    }

    axios.post('http://localhost:5000/api/profile/add-sale', newSale, {withCredentials:true})
      .then((response)=>{
        console.log(response.data)
        this.setState({
          salesList: [response.data, ...salesList]
        }, ()=>{this.props.history.push('/')})
      })

  }

  render() {
    const {loggedInUser, showLoginForm, showRegisterForm, showWelcome, salesList} = this.state

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
        
          <Route exact path="/" render= {()=>{return (
            <>
          <Banner/>
          <Saleslist salesList = {salesList}/>
          </>)
          }}/>
          <Route path = "/detail/:saleid" render={(routeProps)=>{return <SaleDetail {...routeProps}/>}}/>
         
          
          <Route exact path="/profile/:id" render={(routeProps)=>{
            return <ProfilePage  loggedInUser = {loggedInUser}
            onAddCredit = {this.handleAddCredit}
            {...routeProps}/>
          }}/>
         <Route path = "/profile/:id/create-sale" render={()=>{return <AddSale 
         loggedInUser = {loggedInUser}
         salesList = {salesList}
         onAddSale = {this.handleAddSale}
         />}}/>
            
        </Switch>
          
        
      </div>
    )
  }
}

export default withRouter(App)