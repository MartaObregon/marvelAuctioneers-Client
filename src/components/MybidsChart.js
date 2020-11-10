import Axios from 'axios'
import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class MybidsChart extends Component {


    state={
        myBidList: [],
        sale: [],
    }

    componentDidMount(){
        this.getAllMyBids()
        this.getsaleInfo()
    }

    getAllMyBids = () =>{
        const {loggedInUser} = this.props
        axios.get(`http://localhost:5000/api/profile/${loggedInUser._id}/mybids`, {}, {withCredentials:true})
        .then((response)=>{
            console.log(response.data)
            this.setState({
                myBidList: [...response.data]
            })
        })
    }
    getsaleInfo=()=>{
        const {loggedInUser} = this.props
        axios.get(`http://localhost:5000/api/profile/sale/${loggedInUser._id}`)
        .then((response)=>{
            console.log(response.data)
            this.setState({
                
            })
        })
    }

    render() {
        const {salesList, loggedInUser} = this.props
        const {myBidList} = this.state
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
                        <th>Status</th>
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
                                <td>{bid.status}</td>
                                </tr>
                           )}) 
                        }
                        <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>
                        <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>
                      
                    </tbody>
                    </Table>
            </div>
        )
    }
}
