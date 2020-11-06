import React from 'react'
import {Form, Button} from 'react-bootstrap'
import './LoginBox.css'


export default function RegisterBox(props) {
    return (
        <div className="box-container">
            <Form  className="formlog" onSubmit = {props.onRegister}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className="inputlog" type="email" placeholder="Enter email" name="email" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label> Username</Form.Label>
                            <Form.Control  className="inputlog" type="text" placeholder="Enter username" name="username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control  className="inputlog" type="password" placeholder="Password" name="password" />
                        </Form.Group>
                        
                        <Button  className ="logbtn" variant="primary" type="submit">
                            Register
                        </Button>
                </Form>
        </div>
    )
}
