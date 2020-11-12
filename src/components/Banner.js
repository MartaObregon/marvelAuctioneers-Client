import React from 'react'
import {Form, Button} from 'react-bootstrap'

export default function Banner() {
    return (
        <div style={{position:'relative', display:'flex', justifyContent:"center"}}>
            <img src="../images/banner3.jpg" alt="banner" style={{width:'100%', maxHeight:'530px', maxWidth:'1400px'}}>
                
            </img>
            {/* <Button style = {{position: 'absolute', left: "50px", top: '250px', backgroundColor:'red'}}>Watch trailer</Button> */}

            
        </div>
    )
}
