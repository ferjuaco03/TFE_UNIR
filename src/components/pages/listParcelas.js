import {Link} from 'react-router-dom';
import { Table,Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

import { CONTACT_ADDRESS,CONTACT_ADDRESS2 } from '../../config';

export const ListParcelas = ({account,setAccount}) => {
  const [parcelas, setParcelas] = useState([]);
  const navigate = useNavigate();
  const MY_ABI= require('../../contracts/DappFumi.json');
  const MY_ABI2= require('../../contracts/FumigaToken.json');

  const QueryParcelas= async (e)=>{
  
  try{
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');   
    const contract = new web3.eth.Contract(MY_ABI.abi, CONTACT_ADDRESS);
    const datos=await contract.methods.getAllParcelas().call();
    setParcelas(datos);
    console.log(datos);
  } catch (err) {
    console.log(err);
  }

}

const HandleFumigar= async (e)=>{
  
  try{
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');   
    const contract = new web3.eth.Contract(MY_ABI2.abi, CONTACT_ADDRESS2);
    const datos=await contract.methods.balanceOf(account.Address).call();
    const tempodata=account
    tempodata.balanceFT=datos/10**18;
    setAccount(tempodata);
    if((datos/10**18)>0){
      let path="/Fumigar";
      console.log(e);
      navigate(path,{state:{id:1,obj:e}});
    }else{ alert("No tiene tokens FUMIGAT para poder realiazar actividades de Fumigación")}
  
  } catch (err) {
    console.log(err);
  }
 

}



  return (
    <div>
      <button type="button" className='btn btn-primary m-3' onClick={QueryParcelas}>Listar Parcelas</button>
      <div className="text-center p-3">Lista de Parcelas </div>
      <div className="p-2">
          <Table striped bordered hover size="sm" >
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Address</th>
                  <th>MaxHeight</th>
                  <th>MinHeight</th>
                  <th>Pesticida</th>
                  <th>Fumigar</th>
                </tr>
              </thead>
              <tbody>
                  {parcelas.map((parcela)=>(
                    <tr>
                      <th>{parcela.idToken}</th>
                      <th>{parcela.dir}</th>
                      <th>{parcela.MaxHeight}</th>
                      <th>{parcela.MinHeight}</th>
                      <th>{parcela.Pesti}</th>
                      <th><Button onClick={()=>{HandleFumigar(parcela)}}>Fumigar</Button></th>
                    </tr> 
                    ))}
              </tbody>
            </Table>
      
      </div>
      
    </div>
    
  )
}
