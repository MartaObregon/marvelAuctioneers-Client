import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'

export default class LoginBox extends Component {
    render() {
        return (
            <div>
                <form>
                <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label> Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                </Form>
                </form>
            </div>
        )
    }
}