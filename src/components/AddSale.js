import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {Form, InputGroup, Button} from 'react-bootstrap'

export default class AddSale extends Component {
    render() {
        const {loggedInUser, onAddSale} = this.props

        // if(!loggedInUser){
            
        //     return <Redirect to = {'/'}/>
        //  }
      
        return (
            <div>
                <h2>Create a new sale</h2>
                <Form onSubmit={this.props.onAddSale}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name= "title" type="text"/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Expiring date</Form.Label>
                        <Form.Control name="expiring_date" type="date"/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Starting price</Form.Label>
                        <Form.Control name="starting_price" type="number"/>
                        <InputGroup.Append>
                        <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Append>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control name="image_url" type="text"/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>State</Form.Label>
                        <Form.Control name="state" as="select">
                        <option>--select state</option>
                        <option>good condition</option>
                        <option>worn-off</option>
                        <option>damaged</option>
                        
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                   
                </Form>
                </div>
        )
        
    }
}
