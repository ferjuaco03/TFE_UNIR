import {Link} from 'react-router-dom';
import { Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { CONTACT_ADDRESS } from '../../../src/config';





export const Parcela = ({account,tipeact}) => {
  const [idparcela, setIdparcela] = useState(0);
  const [Pesti, setPesti] = useState({A:false,B:false,C:false,D:false});
  const [heights, setheights] = useState({Maxheights:0, Minheights:0});
  const MY_ABI= require('../../contracts/DappFumi.json');
  

  const createParcela= async (e)=>{

  try{
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const Addr = await web3.eth.requestAccounts();
    console.log(Addr[0]);
    
    const contract = new web3.eth.Contract(MY_ABI.abi, CONTACT_ADDRESS);
    await contract.events.newParcelaToken().on('data', (event) => 
      {
        console.log(event.returnValues.token);
        setIdparcela(event.returnValues.token);
      }).on('error', console.error);
    const pestis=[];
    if(Pesti.A){pestis.push("A")}
    if(Pesti.B){pestis.push("B")}
    if(Pesti.C){pestis.push("C")}
    if(Pesti.D){pestis.push("D")}
    
    await contract.methods.createParcela(account,heights.Maxheights,heights.Minheights,pestis).send({from:account});  
    const datos=await contract.methods.getAllParcelas().call();
    console.log(datos);
  } catch (err) {
    console.log("User cancelled");
    console.log(err);
  }

}

const handleSubmit=(e)=>{
  if(account !='0x0000000000000000000000000000000000000000'){
    const re = /^[0-9\b]+$/;
    if(re.test(e.target.Maxheights.value)){
      if(re.test(e.target.Minheights.value)){
        if(Pesti.A || Pesti.B || Pesti.C || Pesti.D){
          const TempHeights = heights;
          TempHeights["Maxheights"]=parseInt(e.target.Maxheights.value);
          TempHeights["Minheights"]=parseInt(e.target.Minheights.value);
          setheights(TempHeights);
          createParcela();
  
        }else{alert("Se debe seleccionar almenos un pesticida")}
      }else{alert("Minheights solo debe tener numeros")}
  
    }else{alert("Maxheights solo debe tener numeros")}
    
  }else{alert("No se ha conectado con una cuenta")}
  
  e.preventDefault();
}

const handleCheck=(e)=>{

  const state=Pesti;
  state[e.target.value]=e.target.checked;
  setPesti(state);
  console.log(Pesti);
}

  return (
    <div>
      
      <Form className='p-5' onSubmit={handleSubmit}>
        <button type="submit" className='btn btn-primary m-3' >Crear Parcela</button>
        <div className='text-center p-3'><h1>Parcela creada: {idparcela}</h1></div>
        
        <Form.Control  type="text"  placeholder="Ingrese la Altura Máxima" name="Maxheights" />
        <Form.Control className='mt-3' type="text" placeholder="Ingrese la Altura Minima" name="Minheights" />
        <label className='mt-3' >Selecione los pesticidas permitidos para la Parcela</label>
        <Form.Check className='mt-2'type="switch" id="custom-switch" label="Pesticida A" onChange={handleCheck}   value="A" />
        <Form.Check className='mt-2'type="switch" id="custom-switch" label="Pesticida B" onChange={handleCheck}   value="B" />
        <Form.Check className='mt-2'type="switch" id="custom-switch" label="Pesticida C" onChange={handleCheck}   value="C" />
        <Form.Check className='mt-2'type="switch" id="custom-switch" label="Pesticida D" onChange={handleCheck}   value="D" />
       
      </Form>
    </div>
    
  )
}
