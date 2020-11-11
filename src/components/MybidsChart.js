import Axios from 'axios'
import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {API_URL} from '../config'

export default class MybidsChart extends Component {


    state={
        myBidList: [],
        salesBided: [],
        showCheckOut: false,
        updatedUser: this.props.loggedInUser
    }

    componentDidMount(){
        this.getAllMyBids()
        this.getsaleInfo()
    }

    getAllMyBids = () =>{
        const {loggedInUser} = this.props
        axios.get(`${API_URL}/profile/${loggedInUser._id}/mybids`, {}, {withCredentials:true})
        .then((response)=>{
            console.log(response.data)
            this.setState({
                myBidList: [...response.data]
            })
        })
    }
    getsaleInfo=()=>{
        const {loggedInUser} = this.props
        axios.get(`${API_URL}/profile/sale/${loggedInUser._id}`)
        .then((mybids)=>{
            mybids.map((bid)=>{
                return bid.sale_id
            })
        })
    }

    handleShowChekOutBox = () =>{
        const {loggedInUser} = this.props
        this.setState({
            showCheckOut: true,
        })
          
    }

    handlePayment = () =>{
        const {loggedInUser} = this.props
        console.log(this.state.salesBided)

        axios.patch(`${API_URL}/profile/sale/payment`)
        .then((response)=>{
            console.log(response.data)
            
            this.setState({
                updatedUser: response.data
            })
        })
    }

    render() {
        const {salesList, loggedInUser} = this.props
        const {myBidList, showCheckOut} = this.state
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Sale Id</th>
                        <th>Title</th>
                        <th>Starting price</th>
                        <th>Expiring date</th>
                        <th>My bid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           myBidList.map((bid)=>{return(
                                <tr>
                                <td></td>
                                <td><Link to={`/detail/${bid.sale_id}`}>{bid.sale_id}</Link></td>
                                <td>Title goes here</td>
                                <td>Starting price goes here</td>
                                <td>Expiring date goes here</td>
                                <td>{bid.bid_price}$</td>
                                {
                                    bid.winner ? (
                                        <>
                                        <td>
                                            Congratz! you won the sale!
                                            <button onClick={this.handleShowChekOutBox} style={{backgroundColor:"green", color:'white'}}>Go to Checkout</button>
                                        </td>
                                        </>
                                    ) : (null)
                                }
                                
                        {
                                showCheckOut ? (
                                    <div>
                                        <p>To pay {bid.bid_price}$</p>
                                        <p>Current Balance: {loggedInUser.wallet_credit}$</p>
                                        <button onClick={this.handlePayment}>Complete Payment</button>
                                    </div>
                                ): (null)
                        }

                        </tr>
                           )}) 
                        }
                    
                      
                    </tbody>
                    </Table>

                    

                   
            </div>
        )
    }
}
