import React from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import './Salelist.css'
import {Link} from 'react-router-dom'
import moment from 'moment'

export default function Saleslist(props) {


   

    return (
        <div className="container1">
            <Container fluid="md">
            <Row>             
            
                
                {
                    props.salesList.map((sale)=>{
                        return (
                            
                                <Col className="col1">

                                <Card className="eachcard">
                            <Card.Img variant="top" src={sale.image_url} 
                                className="comic-img"
                            />
                            <Card.Body className="card-body">
                            <Card.Title className="comic-title">{sale.title}({sale.release_year})</Card.Title>
                            <Card.Text className="comic-text">
                                  
                                <strong>From: {sale.starting_price}$</strong>
                                <div>Sale expiring: 
                                <br></br>
                                
                                   {moment(sale.expiring_date).format('MMMM Do YYYY, h:mm a')}
                                
                                </div>
                            </Card.Text>
                            
                            </Card.Body>
                            <Button className="comic-btn"><Link to = {`/detail/${sale._id}`}>See Details</Link></Button>
                        </Card>
                        </Col>
                           
                                
                        
                        )
                    })
                }
                </Row>
                        </Container>
                
           
           

            
                
                
           
           


            








           
        </div>
    )
}
