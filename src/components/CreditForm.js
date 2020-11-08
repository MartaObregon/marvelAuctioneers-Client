import React, { Component } from 'react'
import {InputGroup, Button, FormControl} from 'react-bootstrap'


export default class CreditForm extends Component {

    state = {
        user: {}
    }

    componentDidMount(){
        // let id = this.props.match.params.id
        console.log(this.props)
        // axios.get(`http://localhost:5000/api/profile/${id}`)
        //     .then((response) => {
        //         this.setState({
        //             user: response.data
        //         })
        //     })
    }


    render() {
        return (
            <div>
                
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl   value="wallet_credit"/>
                <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup.Append>
                 
                <Button  onClick={()=>{this.props.onAddCredit(this.state.user)}} type = "submit" variant="primary">Add Credit</Button>
            </InputGroup>
            </div>
        )
    }
}

