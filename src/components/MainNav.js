import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './MainNav.css'


function MainNav(props) {


    
    return (
        
        <div>
            <Navbar className = "navbar" variant="dark">
                <Navbar.Brand href="#home">
                    <img className = "logoMA" src="../images/logoMA.png" alt="logo"></img>
                 </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Buy</Nav.Link>
                    <Nav.Link href="#features">Sell</Nav.Link>
                    <Nav.Link href="#pricing">About us</Nav.Link>
                </Nav>
                <Link to="/sign-in" onClick={props.onShowLogin}>Log in</Link>
                <Link to="/register" onClick = {props.onShowRegister}>Register</Link>
               
            </Navbar>
        </div>
    )
}

export default MainNav