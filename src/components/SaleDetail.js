import React, { Component } from 'react'
import axios from 'axios'
import {Card, Button} from 'react-bootstrap'
import BidChart from './BidChart'
export default class SaleDetail extends Component {

    state={
        sale:{},
        showBidChart: false,
    }


    handleShowBidChart = ()=>{
        this.setState({
            showBidChart:true,
        })

    }

    componentDidMount(){
        let saleId = this.props.match.params.saleid
        console.log(this.props.match.params.saleid)
        axios.get(`http://localhost:5000/api/detail/${saleId}`)
            .then((response)=>{
                console.log(response.data)
                this.setState({
                    sale: response.data
                })
            })

    }

    render() {
        const {sale, showBidChart} = this.state
        return (
            <div style={{width:"700px"}}>
                <img alt="comic" src = {sale.image_url} ></img>
                <h1>{sale.title}</h1>
                <h2><small>Starting price</small> {sale.starting_price}$</h2>
                <h3>{sale.expiring_date}</h3>
                <p>{sale.description}</p>
                <button onClick={this.handleShowBidChart}>Show BidChart</button>

                {
                    showBidChart ? (<BidChart sale={sale}/>) : (null)
                }
                
            </div>
        )
    }
}
