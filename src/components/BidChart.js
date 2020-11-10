import React, { Component } from 'react'
import axios from 'axios'
import AddBid from './AddBid'
import {Table} from 'react-bootstrap'

export default class BidChart extends Component {

    state={
        showBidInput: false,
        bidList: []
    }
    componentDidMount(){
        this.getAllBids()
    }
    handleShowBidInput = ()=>{
        this.setState({
            showBidInput: true
        })
    }

    getAllBids = () =>{
        const {sale} = this.props
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
    const {sale} = this.props  

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
        const {sale} = this.props
        const {bidList} = this.state
        return (
            <div>
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Bid</th>
                    <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Starting Bid</td>
                    <td>{sale.seller}</td>
                    <td>{sale.starting_price}$</td>
                    <td></td>
                    </tr>
                    {   bidList? (bidList.map((bid)=>{
                            
                                return (
                                <tr>
                                <td></td>
                                <td>{bid.bidder_id}</td>
                                <td>{bid.bid_price}$</td>
                                <td>{bid.createdAt}</td>
                                </tr>
                            )
                            
                            
                        }).sort((a,b)=>{
                            if(a.bid_price>b.bid_price){return 1}
                            else if(a.bid_price<b.bid_price){return -1}
                            else{return 0}
                        })): (null)
                        
                    }
                    <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <td></td>
                    <td colSpan="2"></td>
                    <td></td>
                    </tr>
                </tbody>
            </Table>
            <button onClick={this.handleShowBidInput}>Bid</button>

            {
                this.state.showBidInput? (<AddBid onAddBid = {this.handleAddBid}/>):(null)
            }
            </div>
        )
    }
}
