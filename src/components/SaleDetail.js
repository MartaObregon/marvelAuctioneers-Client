import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import {Card, Button} from 'react-bootstrap'
import BidChart from './BidChart'
export default class SaleDetail extends Component {

    state={
        sale:{},
        saleOpen: true,
        showBidChart: false,
        showBidInput: false,
        bidList: [],
        seller: {},

    }


    handleShowBidChart = ()=>{
        this.setState({
            showBidChart:true,
        })

    }

    componentDidMount(){
        this.handleSaleEnd()
        let saleId = this.props.match.params.saleid
        console.log(this.props.match.params.saleid)
        axios.get(`http://localhost:5000/api/detail/${saleId}`)
            .then((response)=>{
                console.log(new Date(), new Date(response.data.expiring_date))
                this.setState({
                    saleOpen: new Date () < new Date(response.data.expiring_date) ,
                    sale: response.data,
                    
                })
            })
        this.getAllBids()
        this.getName()
        

    }


    handleSaleEnd = () =>{
        const {sale} = this.state
        console.log(sale)
    }

    handleShowBidInput = ()=>{
        this.setState({
            showBidInput: true
        })
    }

    getName = ()=>{
        const {sale} = this.state
        axios.get(`http://localhost:5000/api/sale/username/${sale.seller}`)
        .then((response)=>{ 
            console.log(response.data)
            this.setState({
                seller: response.data
            })
        })

        
    }

    getAllBids = () =>{
        const {sale} = this.state
        axios.get(`http://localhost:5000/api/sale/${sale._id}`)
        .then((response)=>{
            this.setState({
                bidList: [...response.data]
            })
        })
    }

   

    handleAddBid = (e) =>{
    e.preventDefault()
    const {bid_price} = e.target
    const {bidList} = this.state 
    const {sale} = this.state 

    let newBid = { 
        bid_price: bid_price.value
    }

    axios.post(`http://localhost:5000/api/sale/${sale._id}`, newBid, {withCredentials:true})
        .then((response)=>{
            this.setState({
                bidList: [response.data,...bidList]
            })
        })

    }

    render() {
        const {sale, showBidChart, seller, bidList, onShowBidInput, showBidInput} = this.state
        return (
            <div style={{width:"700px"}}>
                <img alt="comic" src = {sale.image_url} ></img>
                
                    {
                        this.state.saleOpen ? <p>'Open'</p> : <p>'Closed'</p>
                    }
                
                <h1>{sale.title}</h1>
                <h2><small>Starting price</small> {sale.starting_price}$</h2>
                <h3>Expiring:<small> {moment(sale.expiring_date).format('MMMM Do YYYY, h:mm a')}</small></h3>
                <p>{sale.description}</p>
                <button onClick={this.handleShowBidChart}>Show BidChart</button>

                {
                    showBidChart ? (<BidChart sale={sale}
                                    seller = {seller}
                                    bidList = {bidList}
                                    onShowBidInput = {this.handleShowBidInput}
                                    showBidInput = {showBidInput}
                                    onAddBid = {this.handleAddBid}
                    />) : (null)
                }
                
            </div>
        )
    }
}
