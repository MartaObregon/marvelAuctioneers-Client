
import React, { Component } from 'react'
import {Table, Container} from 'react-bootstrap'
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
        axios.get(`${API_URL}/profile/${loggedInUser._id}/bids-info`, {withCredentials:true})
        .then((response)=>{
            
            this.setState({
                mybidsList : [...response.data]
            })
        })

        
    }
    
    


    handleShowChekOutBox = () =>{
        
        this.setState({
            showCheckOut: true,
        })
          
    }

   

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
                                            <Container style={{backgroundColor:'green', textAlign:'center'}}>
                                            <p style={{color:"white"}}>Sold to you</p>
                                            <Link style={{color:'white', fontSize:'x-small'}} to={`/detail/${bid.sale_id._id}`}>See Results</Link>
                                            </Container>
                                        ): (null)
                                    }
                                    {
                                        !bid.winner && bid.sale_id.close? (
                                            <Container style={{backgroundColor:'red', textAlign:'center'}}>
                                            <p style={{color:"white"}}>Sale Closed</p>
                                            <Link to={`/detail/${bid.sale_id._id}`} style={{color:'white', fontSize:'x-small'}}>See Results</Link>
                                            </Container>
                                            ) : (null)
                                    }
                                    {
                                        !bid.sale_id.close ? (
                                            <Container style={{backgroundColor:'orange', textAlign:'center'}}>
                                            <p style={{color:"white"}}>Sale Open</p>
                                            <Link style={{color:'white', fontSize:'x-small'}} to={`/detail/${bid.sale_id._id}`}>Bid</Link>
                                            </Container>
                                        ):(null)
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
