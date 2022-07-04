
import {Link} from 'react-router-dom';
import { Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { CONTACT_ADDRESS } from '../../../src/config';


export const Drones = ({account,tipeact}) => {
  const [iddron, setIddron] = useState(0);
  const [Pesti, setPesti] = useState({A:false,B:false,C:false,D:false});
  const [heights, setheights] = useState({Maxheights:0, Minheights:0,Cost:0});
  //const [cost, setCost]= useState(0);
  const MY_ABI= require('../../contracts/DappFumi.json');
  

  const createDron= async (e)=>{

  try{
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545'); 
    const contract = new web3.eth.Contract(MY_ABI.abi, CONTACT_ADDRESS);
    await contract.events.newDronToken().on('data', (event) => 
      {
        console.log(event.returnValues.token);
        setIddron(event.returnValues.token);
      }).on('error', console.error);
    const pestis=[];
    if(Pesti.A){pestis.push("A")}
    if(Pesti.B){pestis.push("B")}
    if(Pesti.C){pestis.push("C")}
    if(Pesti.D){pestis.push("D")}
 
    await contract.methods.createDron(account,heights.Cost,heights.Maxheights,heights.Minheights,pestis).send({from:account});  
    const datos=await contract.methods.getAllDrones().call();
    console.log(datos);
  } catch (err) {
    console.log(err);
  }
}

const handleSubmit=(e)=>{
  if(account.Address !='0x0000000000000000000000000000000000000000'){
    const re = /^[0-9\b]+$/;
    if(re.test(e.target.Cost.value)){
        if(re.test(e.target.Maxheights.value)){
          if(re.test(e.target.Minheights.value)){
            if(Pesti.A || Pesti.B || Pesti.C || Pesti.D){
              const TempHeights = heights;
              TempHeights["Maxheights"]=parseInt(e.target.Maxheights.value);
              TempHeights["Minheights"]=parseInt(e.target.Minheights.value);
              TempHeights["Cost"]=parseInt(e.target.Cost.value);
              setheights(TempHeights);
              //setCost(parseInt(e.target.Cost.value));
              //let datCost=cost;
             // datCost=parseInt(e.target.Cost.value)
             console.log(heights.Maxheights,heights.Minheights,heights.Cost);
             console.log(e.target.Cost.value);
             console.log(parseInt(e.target.Cost.value));

              createDron();
              
      
            }else{alert("Se debe seleccionar almenos un pesticida")}
          }else{alert("Minheights solo debe tener numeros")}
      
        }else{alert("Maxheights solo debe tener numeros")}
        
      }else{alert("No se ha conectado con una cuenta")}
  }else{alert("Cost solo debe tener numeros")}

  
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
        <button type="submit" className='btn btn-primary m-3' >Crear Dron</button>
        <div className='text-center p-3'><h1>Dron creado: {iddron}</h1></div>
        
        <Form.Control  type="text"  placeholder="Ingrese la Altura Máxima" name="Maxheights" />
        <Form.Control className='mt-3' type="text" placeholder="Ingrese la Altura Minima" name="Minheights" />
        <Form.Control className='mt-3' type="text" placeholder="Ingrese el costo" name="Cost" />
        <label className='mt-3' >Selecione los pesticidas permitidos para la Parcela</label>
        <Form.Check className='mt-2'type="switch" id="custom-switch" label="Pesticida A" onChange={handleCheck}   value="A" />
        <Form.Check className='mt-2'type="switch" id="custom-switch" label="Pesticida B" onChange={handleCheck}   value="B" />
        <Form.Check className='mt-2'type="switch" id="custom-switch" label="Pesticida C" onChange={handleCheck}   value="C" />
        <Form.Check className='mt-2'type="switch" id="custom-switch" label="Pesticida D" onChange={handleCheck}   value="D" />
       
      </Form>
    </div>
    
  )
}
