import React from 'react'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import './SaleDetail.css'



export default function AddBid(props) {
    return (
        <div>
       
            
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
            {
            props.errorMessage? (
                <p style={{color:'red'}}>{props.errorMessage}</p>
            ): (null)
        }
            </form>
        </div>
    )
}
