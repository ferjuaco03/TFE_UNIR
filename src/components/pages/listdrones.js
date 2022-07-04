
import {Link} from 'react-router-dom';
import { Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { CONTACT_ADDRESS } from '../../config';

export const ListDrones = () => {
  const [drones, setDrones] = useState([]);
  const MY_ABI= require('../../contracts/DappFumi.json');

  const QueryDrones= async (e)=>{
 
  try{
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');  
    const contract = new web3.eth.Contract(MY_ABI.abi, CONTACT_ADDRESS);
    const datos=await contract.methods.getAllDrones().call();
    setDrones(datos);
  } catch (err) {
    console.log(err);
  }
}


  return (
    <div>
      <button type="button" className='btn btn-primary m-3' onClick={QueryDrones}>Listar Drones</button>
      <div className="text-center p-3">Lista de Drones </div>
      <div className="p-2">
          <Table striped bordered hover size="sm" >
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Address</th>
                  <th>MaxHeight</th>
                  <th>MinHeight</th>
                  <th>Cost</th>
                  <th>Pesticida</th>
                </tr>
              </thead>
              <tbody>
                  {drones.map((dron)=>(
                    <tr>
                      <th>{dron.idToken}</th>
                      <th>{dron.dir}</th>
                      <th>{dron.MaxHeight}</th>
                      <th>{dron.MinHeight}</th>
                      <th>{dron.CostxM}</th>
                      <th>{dron.Pesti}</th>
                    </tr> 
                    ))}
              </tbody>
            </Table>
      
      </div>
      
    </div>
    
  )
}
