import React from 'react'
import {Navbar, Nav, Button, NavDropdown, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './MainNav.css'


function MainNav(props) {


    
    return (
        
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/"><img className = "logoMA" src="../images/logo4.png" alt="logo"></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                {
                    !props.loggedInUser ? (
                        <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                     
                        </>
                    ): (
                    <div className="cont">
                    <p style ={{marginRight:'5px'}}>Good Afternoon, </p>
                    
                    <Link to={`/profile/${props.loggedInUser._id}`}>   {props.updatedUser.username}</Link>
                    <p style={{color:'white'}}>Wallet {props.updatedUser.wallet_credit}$</p>
                    <Button onClick = {props.onLogOut}>Log out</Button>
                    </div>)
                }
                
                
                </Nav>
                
            </Navbar.Collapse>
            </Navbar>
             
        </div>
    )
}

export default MainNav 