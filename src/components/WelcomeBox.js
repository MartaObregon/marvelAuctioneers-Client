import React from 'react'
import {Jumbotron, Container} from 'react-bootstrap'
import './WelcomeBox.css'

export default function WelcomeBox() {
    return (
        <div className="Wbox-container">
            <Jumbotron fluid>
                <Container >
                    <h5 className="title">Start buying and selling high quality comics with 3 simple steps:</h5>
                    <ol>
                        <li>Create an account</li>
                        <li>Add credit to your wallet</li>
                        <li>Browse through over 1 trillion sales of your favourite issues</li>
                     </ol>
                </Container>
            </Jumbotron>
            
        </div>
    )
}
