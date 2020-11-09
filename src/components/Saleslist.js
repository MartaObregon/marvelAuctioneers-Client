import React from 'react'
import {CardDeck, Card, Button} from 'react-bootstrap'
import './Salelist.css'
import {Link} from 'react-router-dom'

export default function Saleslist(props) {
    return (
        <div className="container1">
            <h1>LIST OF ONGOING SALES</h1>

            <div className ="list-box">

            
                {
                    props.salesList.map((sale)=>{
                        return (
                        <Card className="eachcard">
                            <Card.Img variant="top" src={sale.image_url} />
                            <Card.Body>
                            <Card.Title>{sale.title}</Card.Title>
                            <Card.Text>
                                <p>Release year: {sale.release_year}</p>   
                                <p>Starting price: {sale.starting_price}$</p>
                                <p>Sale expiring: {sale.expiring_date}</p>
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <Button><Link to = {`/sale-detail/${sale._id}`}>See Details</Link></Button>
                            </Card.Footer>
                        </Card>
                        )
                    })
                }
                
            </div>  
           











           
        </div>
    )
}
