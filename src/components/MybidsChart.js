import React, { Component } from 'react'

export default class MybidsChart extends Component {
    render() {
        const {salesList, loggedInUser} = this.props
        return (
            <div>
                {/* {
                    salesList.map((sale)=>{
                        return <p>{sale._id.includes(loggedInUser._id)}</p>
                    })
                } */}
            </div>
        )
    }
}
