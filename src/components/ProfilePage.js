import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
// import CreditForm from './CreditForm'
import {InputGroup, FormControl} from 'react-bootstrap'
import './ProfilePage.css'
import {withRouter} from 'react-router'

 class ProfilePage extends Component {


    state = {
        user: this.props.loggedInUser
    }

    // componentDidMount(){
    //     let id = this.props.match.params.id
    //     console.log(this.props)
    //     axios.get(`http://localhost:5000/api/profile/${id}`)
    //         .then((response) => {
    //             this.setState({
    //                 user: response.data
    //             })
    //         })
    // }






    render() {
        const {loggedInUser, onAddCredit, showWelcome} = this.props


        if(!loggedInUser){
            
           return <Redirect to = {'/'}/>
        }

        return (
            <div className="container1">
                <Card className ="card-info1" >
                    <Card.Img variant="top" src="/images/iron-pic.jpg" />
                    <Card.Body>
                        <Card.Title>Welcome back  {loggedInUser.username}!</Card.Title>
                        
                        {/* <p>your email addres: {loggedInUser.email}</p> */}

                        {/* <Card className="text-center" > */}
                    <Card.Header>My Wallet</Card.Header>
                    <Card.Body className="card-body">
                        
                        <Card.Text>
                           Your credit balance: {loggedInUser.wallet_credit}$

                        </Card.Text>

                        <form onSubmit= {onAddCredit}>
                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text ></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl name="wallet_credit"/>
                <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup.Append>
                 
                <Button  type = "submit" variant="primary">Add Credit</Button>
            </InputGroup>
                </form>
                        
                            
                            
                            
                       
                        
                    </Card.Body>
                    
            




                        
                        
                    </Card.Body>
               
                </Card>
                
                <h2>My Bids</h2>

               
            </div>
        )
    }
}

export default withRouter(ProfilePage)