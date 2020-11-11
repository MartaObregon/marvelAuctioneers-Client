import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import {Card, Button} from 'react-bootstrap'
import BidChart from './BidChart'
import {API_URL} from '../config'
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
       
        let saleId = this.props.match.params.saleid
        console.log(this.props.match.params.saleid)
        axios.get(`${API_URL}/detail/${saleId}`)
            .then((response)=>{
               
                console.log(new Date(), new Date(response.data.expiring_date))
                this.setState({
                    saleOpen: new Date () < new Date(response.data.expiring_date) ,
                    sale: response.data,
                    
                })
                this.getAllBids()
                this.handleSaleEnd()
            })
        
            
            
        // this.getName()
        

    }


    handleSaleEnd = () =>{
        
        const {sale, saleOpen, bidList} = this.state
        if(!saleOpen){
            axios.patch(`${API_URL}/close/${sale._id}`)
            .then((response)=>{
                console.log(bidList)
                console.log('HEYYYYY', response.data)
            })
        }
        
    }

    handleShowBidInput = ()=>{
        this.setState({
            showBidInput: true
        })
    }

    getName = ()=>{
        const {sale} = this.state
        axios.get(`${API_URL}/sale/username/${sale.seller}`)
        .then((response)=>{ 
            console.log(response.data)
            this.setState({
                seller: response.data
            })
        })

        
    }

    getAllBids = () =>{
        const {sale} = this.state
        axios.get(`${API_URL}/sale/${sale._id}`)
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

    axios.post(`${API_URL}/sale/${sale._id}`, newBid, {withCredentials:true})
        .then((response)=>{
            this.setState({
                bidList: [response.data,...bidList]
            })
        })

    }

    render() {
        const {sale, showBidChart, seller, bidList, onShowBidInput, showBidInput, saleOpen} = this.state
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

                {
                    saleOpen ? (
                    <div>
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
                    ) : (
                        <>
                        <div>
                            <h3 style={{backgroundColor:"red", color: "white"}}>SALE CLOSED</h3>
                            <p>Sold for {sale.winning_bid}$ to {sale.winning_buyer}</p>
                        </div>
                        </>
                    )
                }
                
                
            </div>
        )
    }
}
