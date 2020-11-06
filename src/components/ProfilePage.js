import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

export default class ProfilePage extends Component {
    render() {
        const {loggedInUser} = this.props


        if(!loggedInUser){
            
            return <Redirect to={'/sign-in'}/>
        }
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="/images/iron-pic.jpg" />
                    <Card.Body>
                        <Card.Title>{loggedInUser.username}</Card.Title>
                        <Card.Text>
                        <p>{loggedInUser.email}</p>
                        </Card.Text>
                        <Button variant="primary">Edit</Button>
                    </Card.Body>
                </Card>


                <Card className="text-center">
                    <Card.Header>Your Wallet</Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                           Your credit balance: 14.99$
                        </Card.Text>
                        <Button variant="primary">Add Credit</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
            </div>
        )
    }
}
