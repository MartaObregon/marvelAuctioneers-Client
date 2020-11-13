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
        winning_buyer: {},
        errorMessage: null,
        errorDetail: this.props.errorDetail
       

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
            .catch((err)=>{
                console.log( err.response.data.error)
                this.setState({
                    errorDetail: err.response.data.error,
                })
            })

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
        .catch((err)=>{
            console.log(err.response.data.errorMessage)
            this.setState({
                errorMessage: err.response.data.errorMessage,
            })
        })

    }

    render() {
        const {sale, showBidChart, seller, bidList, onShowBidInput, showBidInput, saleOpen, winning_buyer, errorMessage} = this.state
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
                                        errorMessage = {errorMessage}
                        />) : (null)
                    }
                    </div>
                    ) : (
                        <>
                        <div>
                            <h3 style={{backgroundColor:"red", color: "white", textAlign:'center'}}>SALE CLOSED</h3>
                            {
                                loggedInUser._id === winning_buyer._id ? (
                                    <>
                                    <h2 style={{textAlign:'center'}}>Congratz! You won the fight for the highest bidder!</h2>
                                    
                                    </>
                                ):(<h2>Sold for {sale.winning_bid}$ to {winning_buyer.username}</h2>)
                            }
                            
                        </div>
                        {
                            loggedInUser._id === winning_buyer._id
                            && !sale.close 
                            ? (
                                <div style={{textAlign:'center'}}>
                                <p>Complete the payment so we can ship your new Marvel comic</p>
                                <Button variant="warning"><Link style={{color:'white'}}to={`/detail/${sale._id}/checkout`}>Go to Checkout</Link></Button>
                                </div>
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
