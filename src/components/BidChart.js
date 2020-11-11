import React, { Component } from 'react'
import AddBid from './AddBid'
import {Table} from 'react-bootstrap'
import moment from 'moment'

export default class BidChart extends Component {

  

    render() {
        const {sale, seller, bidList, onShowBidInput, onAddBid, showBidInput} = this.props
        
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
                    <td>{seller.username}</td>
                    <td>{sale.starting_price}$</td>
                    <td></td>
                    </tr>
                    {   bidList? (bidList.sort((a,b)=>{
                            if(a.createdAt>b.createdAt){return 1}
                            else if(a.createdAt<b.createdAt){return -1}
                            else{return 0}
                        }).map((bid)=>{
                            
                            return (
                            <tr>
                            <td></td>
                            <td>{bid.bidder_username}</td>
                            <td>{bid.bid_price}$</td>
                            <td>{moment(bid.createdAt).format('MMMM Do YYYY, h:mm a')}</td> 
                            <td></td>
                            </tr>
                        )
                    })
                        ): (null)
                        
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
            <button onClick={onShowBidInput}>Bid</button>

            {
                showBidInput? (<AddBid onAddBid = {onAddBid}/>):(null)
            }
            </div>
        )
    }
}
