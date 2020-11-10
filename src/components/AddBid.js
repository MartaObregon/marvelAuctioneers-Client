import React from 'react'
import {InputGroup, FormControl, Button} from 'react-bootstrap'



export default function AddBid(props) {
    return (
        <div>
            <p>Please enter your bid always surpassing the quantity of the latest</p>
            <form onSubmit = {props.onAddBid}>
            <InputGroup className="mb-3">
                
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                type="number"
                name="bid_price"
                />
                <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Button type="submit">Submit</Button>
            </InputGroup>
            </form>
        </div>
    )
}
