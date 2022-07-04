import React, {useState} from 'react'
import { Form, Button} from 'react-bootstrap';

import Web3 from 'web3';
import { CONTACT_ADDRESS,CONTACT_ADDRESS2 } from '../../config';





export const Buytokes = ({account,setAccount}) => {
    const MY_ABI= require('../../contracts/DappFumi.json');
    const MY_ABI2= require('../../contracts/FumigaToken.json');

    const [FUMIGAT, setFUMIGAT]= useState(0)
    const [Eth, setEth]= useState(0)

    const handleSubmit= async (e)=>{
        console.log(e.target.ETH.value)
        if(parseInt(e.target.ETH.value)>0){
            try{
                const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');  
                const contract = new web3.eth.Contract(MY_ABI2.abi, CONTACT_ADDRESS2);
        
                const inWei=(parseInt(e.target.ETH.value)*10**18);
                const weitt=parseInt(inWei);
                const canttoken=parseInt(e.target.ETH.value)/(0.1)
                console.log("weits:"+weitt);
                await contract.methods.buy(canttoken).send({from: account.Address, value: weitt, gas:1000000})
    
    
              } catch (err) {
                console.log(err);
              }
              e.preventDefault();
        }else{alert("Ingrese una cantidad mayor a cero")}
        
    }
const Handlechange=(e)=>{
    console.log(e)
    setEth(parseInt(e.target.value))
    setFUMIGAT(parseInt(e.target.value)/(0.1))
    e.preventDefault();
}

  return (
    <div>
        <h1>Comprar tokens FUMIGAT</h1>
        <div>
      
      <Form className='p-5' onSubmit={handleSubmit}>
        <button type="submit" className='btn btn-primary m-3' >Comprar Tokens</button>

        <Form.Control  type="text"  placeholder="1 FUMIGAT = 0.1 ETH" disabled />
        <Form.Control onChange={Handlechange}className='mt-3' type="text" placeholder="Ingrese la Cantidad de ETH" name="ETH" /> 
        <Form.Control className='mt-3' type="text" placeholder={FUMIGAT} disabled /> 
      </Form>
    </div>


    </div>
  )
}
