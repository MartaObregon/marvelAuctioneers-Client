import Axios from 'axios'
import React, { Component } from 'react'
import {NavLink, Table} from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {API_URL} from '../config'
import moment from 'moment'

export default class MybidsChart extends Component {


    state={
        mybidsList: [],
        showCheckOut: false,
        updatedUser: this.props.loggedInUser,
        closedBidList: []
        
    }

    componentDidMount(){
        
        this.getsales()
        
    }

    getsales= () => {
        const {loggedInUser} = this.props
        axios.get(`${API_URL}/profile/${loggedInUser._id}/bids-info`)
        .then((response)=>{
            
            this.setState({
                mybidsList : [...response.data]
            })
        })

        
    }
    
    


    handleShowChekOutBox = () =>{
        const {loggedInUser} = this.props
        this.setState({
            showCheckOut: true,
        })
          
    }

    // handlePayment = () =>{
    //     const {loggedInUser} = this.props
    //     console.log(this.state.salesBided)

    //     axios.patch(`${API_URL}/profile/sale/payment`)
    //     .then((response)=>{
    //         console.log(response.data)
            
    //         this.setState({
    //             updatedUser: response.data
    //         })
    //     })
    // }

    render() {
        const {loggedInUser} = this.props
        const {mybidsList, showCheckOut, salesBided} = this.state
        return (
            <div>

                    {
                        mybidsList ? (
                            <Table striped bordered hover>
                    <thead>
                        <tr>
                        
                        <th>Title</th>
                        <th>Starting price</th>
                        <th>Expiring date</th>
                        <th>My bid</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            mybidsList.map((bid)=>{return (
                                
                                    <tr>
                                    <td><Link to={`/detail/${bid.sale_id._id}`}>{bid.sale_id.title}</Link></td>
                                    <td>{bid.sale_id.starting_price}$</td>
                                    <td>{moment(bid.sale_id.expiring_date).format('MMMM Do YYYY, h:mm a')}</td>
                                    <td>{bid.bid_price}$</td>
                                    {
                                        bid.winner && bid.sale_id.close ? (
                                            <>
                                            <p style={{color:"red"}}>Sale Closed</p>
                                            <Link to={`/detail/${bid.sale_id._id}`}>See Results</Link>
                                            </>
                                        ): (null)
                                    }
                                    {
                                        !bid.winner && bid.sale_id.close? (<p style={{color:"red"}}>Sale Closed</p>) : (null)
                                    }
                                    </tr>
                        
                            )})

                        }
                                            <tr>
                                            <td></td>
                                            <td colSpan="2"></td>
                                            <td></td>
                                            </tr>
                                            <tr>
                                            <td></td>
                                            <td colSpan="2"></td>
                                            <td></td>
                                            </tr>
                                        </tbody>
                                        </Table>
                                            ) : (null)
                    }



            </div>
        )
    }
}
