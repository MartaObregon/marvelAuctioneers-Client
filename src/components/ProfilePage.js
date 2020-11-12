import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
// import CreditForm from './CreditForm'
import {InputGroup, FormControl} from 'react-bootstrap'
import './ProfilePage.css'
import {withRouter} from 'react-router'
import MybidsChart from './MybidsChart'

 class ProfilePage extends Component {



    render() {
        const {loggedInUser, onAddCredit, showWelcome, updatedUser} = this.props


        if(!loggedInUser){
            
           return <Redirect to = {'/'}/>
        }

        return (
            <div className="container2">
            
                <Card className ="card-info1" >
                    <Card.Img variant="top" src="/images/iron-pic.jpg" />
                    <Card.Body className="card-body">
                        <Card.Title>Welcome back  {updatedUser.username}!</Card.Title>
                        
                        <p>your email addres: {updatedUser.email}</p>

                    <Card className = "wallet-container"> 
                        <Card.Header className="title-wallet">My Wallet</Card.Header>
                        <Card.Body className="card-body">
                            
                            <Card.Text>
                            Your credit balance: {updatedUser.wallet_credit}$

                            </Card.Text>

                                <form onSubmit= {onAddCredit}>
                                <InputGroup className="input-group">
                                <InputGroup.Prepend>
                                <InputGroup.Text >$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <input className="input-credit" name="wallet_credit"/>
                                <InputGroup.Append>
                                <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup.Append>
                                
                                
                                </InputGroup>
                                <Button style={{color:'white'}} variant="warning" type = "submit" className="credit-btn" >Add Credit</Button>
                                </form>

                        </Card.Body>
                        
                    </Card>
                     <Button style={{color:'white'}} variant="danger" className="addSale-btn"><Link to= {`/profile/${loggedInUser._id}/create-sale`}>
                        Create Sale</Link></Button>
                    </Card.Body>

                    
               
                </Card>
                
                
                <MybidsChart loggedInUser={loggedInUser}/>

               
            </div>
        )
    }
}

export default withRouter(ProfilePage)