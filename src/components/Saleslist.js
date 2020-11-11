import React from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import './Salelist.css'
import {Link} from 'react-router-dom'
import moment from 'moment'

export default function Saleslist(props) {


   

    return (
        <div className="container1">
            <h1>ONGOING SALES</h1>

            
                
                {
                    props.salesList.map((sale)=>{
                        return (
                        <Container fluid="md">
                            <Row>
                                <Col>
                                <Card className="eachcard">
                            <Card.Img variant="top" src={sale.image_url} />
                            <Card.Body>
                            <Card.Title>{sale.title}</Card.Title>
                            <Card.Text>
                                <p>Release year: {sale.release_year}</p>   
                                <p>Starting price: {sale.starting_price}$</p>
                                <p>Sale expiring: 
                                
                                   {moment(sale.expiring_date).format('MMMM Do YYYY, h:mm a')}
                                
                                </p>
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer className="footer">
                            <Button className=""><Link to = {`/detail/${sale._id}`}>See Details</Link></Button>
                            </Card.Footer>
                        </Card>
                                </Col>
                            </Row>
                        </Container>
                        
                        )
                    })
                }
                
                
           
           

            
                
                
           
           


            








           
        </div>
    )
}
