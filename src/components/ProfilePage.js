import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import CreditForm from './CreditForm'
import './ProfilePage.css'

export default class ProfilePage extends Component {
    render() {
        const {loggedInUser, onAddCredit} = this.props


        if(!loggedInUser){
            
            return <Redirect to={'/sign-in'}/>
        }
        return (
            <div className="container1">
                <Card className ="card-info1" >
                    <Card.Img variant="top" src="/images/iron-pic.jpg" />
                    <Card.Body>
                        <Card.Title>Welcome back  {loggedInUser.username}!</Card.Title>
                        <Card.Text>
                        <p>your email addres: {loggedInUser.email}</p>

                        <Card className="text-center" className="wallet-card">
                    <Card.Header>My Wallet</Card.Header>
                    <Card.Body className="card-body">
                        
                        <Card.Text>
                           Your credit balance: {loggedInUser.wallet_credit}$
                        </Card.Text>
                        <CreditForm onAddCredit = {onAddCredit}/>
                            
                            
                            
                       
                        
                    </Card.Body>
                    
                </Card>




                        </Card.Text>
                        
                    </Card.Body>
                </Card>


               
            </div>
        )
    }
}
