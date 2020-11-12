import React, { Component } from 'react'
import './SaleDetail.css'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
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
        winning_buyer: {}

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
                    winning_buyer: response.data.winning_buyer
                    
                })
                this.getAllBids()
                
            })
        
            
            
        // this.getName()
        

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
        const {sale, showBidChart, seller, bidList, onShowBidInput, showBidInput, saleOpen, winning_buyer} = this.state
        const {loggedInUser} = this.props
        if(!loggedInUser){
            
            return <Redirect to={'/'}/>
        }

        
        return (
            <div className="detail">
                <img alt="comic" src = {sale.image_url} ></img>
                
                <div className="detail-desc">
                <h1>{sale.title}, {sale.release_year}</h1>
                <h2><small>Starting price</small> {sale.starting_price}$</h2>
                <h3>Expiring:<small> {moment(sale.expiring_date).format('MMMM Do YYYY, h:mm a')}</small></h3>
                <p>State: {sale.state}</p>
                <p>{sale.description}</p>
                {
                    saleOpen ? (
                    <div style={{display:'flex', flexDirection:"column",alignItems:'center'}}>
                    <Button variant="warning" style={{width:'100%'}} onClick={this.handleShowBidChart}>Show BidChart</Button>

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
                            <h3 style={{backgroundColor:"red", color: "white", textAlign:'center'}}>SALE CLOSED</h3>
                            <h2>Sold for {sale.winning_bid}$ to {winning_buyer.username}</h2>
                        </div>
                        {
                            loggedInUser._id === winning_buyer._id 
                            ? (
                                <Button><Link to={`/detail/${sale._id}/checkout`}>Go to Checkout</Link></Button>
                            ):(null)
                        }
                        </>

                        
                    )
                }
                </div>
                

                
                
                
            </div>
        )
    }
}
