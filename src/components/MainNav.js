import React from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './MainNav.css'


function MainNav(props) {


    
    return (
        
        <div>
        
            <Navbar className = "navbar" variant="dark">
                <Navbar.Brand href="/">
                    <img className = "logoMA" src="../images/logoMA.png" alt="logo"></img>
                 </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Buy</Nav.Link>
                    <Nav.Link href="#features">Sell</Nav.Link>
                    <Nav.Link href="#pricing">About us</Nav.Link>
                </Nav>
                {
                    !props.loggedInUser ? (
                <div className="auth-btn">
                    <Button><Link to="/login" onClick={props.onShowLogin}>Log in</Link></Button>
                    <Button><Link to="/register" onClick = {props.onShowRegister}>Register</Link></Button>
                </div>
                    ) : (
                        <div className = "container-loggedIn">
                            <p>Hello {props.loggedInUser.username}!</p>
                            <Button onClick = {props.onLogOut}>Log out</Button>
                        </div>
                    )
                }
               
               
            </Navbar>
        </div>
    )
}

export default MainNav