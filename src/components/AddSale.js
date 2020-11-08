import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {Form} from 'react-bootstrap'

export default class AddSale extends Component {
    render() {
        const {loggedInUser, onAddSale} = this.props

    
      
        return (
            <div>
                <h2>Create a new sale</h2>
            <Form onSubmit = {onAddSale}>
                <label>Expiring date</label>
                <input name ="expiring_date" type="date"></input>
                <label>State</label>
                <input name="state" type="text"></input>
                <label>Starting price</label>
                <input name="starting_price" type = "number"></input>
                <button type="submit">Add Sale</button>
            </Form>
            </div>
        )
    }
}
