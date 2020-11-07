import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import {FormControl, Button} from 'react-bootstrap'

export default function CreditForm(props) {
    
    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Amount (to the nearest dollar)"  name="credit"/>
                <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup.Append>
                 
                <Button onClick = {props.onAddCredit} variant="primary">Add Credit</Button>
            </InputGroup>

        </div>
    )
}
