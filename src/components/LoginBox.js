import React from 'react'
import {Form, Button} from 'react-bootstrap'
import './LoginBox.css'

export default function LoginBox(props) {
    return (
        <div className="box-container">
            <Form className="formlog" onSubmit = {props.onLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control  className="inputlog" type="email" placeholder="Enter email" name="email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="inputlog" type="password" placeholder="Password" name="password"/>
                </Form.Group>
                <Button className="logbtn" variant="primary" type="submit">
                    Log in
                </Button>
            </Form>
        </div>
    )
}
