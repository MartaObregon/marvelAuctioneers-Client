import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'

export default class CheckOut extends Component {

    state={
        
        sale: {}
    }

    componentDidMount(){
        this.getSale()
        
    }

    getSale=()=>{
        let saleId = this.props.match.params.saleid
        
        axios.get(`${API_URL}/detail/${saleId}/checkout`)
        .then((response)=>{
            
            this.setState({
                sale: response.data
            })
        })
    }

    
    
    render() {
        const{sale}=this.state
        const{updatedUser} = this.props

        return (
            <div style={{border:'3px solid black'}}>
                <p>x1 item({sale.title})</p>
                <p>Total: {sale.winning_bid}$</p>
                <p>Current Balance: {updatedUser.wallet_credit}$</p>
                <button onClick = {()=>{this.props.onPayment(sale._id)}}>Complete Payment</button>
            </div>
        )
    }
}
