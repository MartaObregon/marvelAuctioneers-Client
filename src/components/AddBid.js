import React from 'react'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import './SaleDetail.css'



export default function AddBid(props) {
    return (
        <div>
            <p>Please enter your bid always surpassing the quantity of the latest</p>
            <form onSubmit = {props.onAddBid}>
            <InputGroup className="mb-3">
                
                <FormControl
                
                
                type="number"
                name="bid_price"
                style={{width:'30px'}}
                />
                <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Button  variant ="danger" type="submit">Submit</Button>
            </InputGroup>
            </form>
        </div>
    )
}
