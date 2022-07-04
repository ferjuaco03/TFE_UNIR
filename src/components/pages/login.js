import React from 'react';
import { useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap';
import Web3 from 'web3';
import { CONTACT_ADDRESS } from '../../config';


export const Login = ({setTipeact, account}) => {
    const MY_ABI= require('../../contracts/DappFumi.json');
    const navigate = useNavigate();
    let path='/';
    const validatetipe=async (e)=>{

        if(account !='0x0000000000000000000000000000000000000000'){
            try{
                const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545'); 
                const contract = new web3.eth.Contract(MY_ABI.abi, CONTACT_ADDRESS);
                //pruebas
                const balanceDron= await contract.methods.getBalanceOwnerDron(account).call();
                const balanceParcela= await contract.methods.getBalanceOwnerParcela(account).call();
                console.log("balances");
                console.log(account);
                console.log(balanceDron);
                console.log(balanceParcela);
                if(e.target.name=='Empresa' ){
                    if(balanceParcela==0){
                        setTipeact('Dron');
                        path='/Drones';
                        console.log(path);
                    }else{alert('No puede ser una empresa la cuenta tiene parcelas creadas')}
                    
                } else if(e.target.name=='Propietario' ){
                    if(balanceDron==0){
                        setTipeact('Parcela');
                        path='/Parcelas'; 
                        console.log(path);
                    }else{alert('No puede ser un propietario la cuenta tiene Drones creados')}

                }
                //fin pruebas
            } catch (err) {
                console.log(err);
            }
        }else{alert('no se a conectado con ninguna cuenta')}

        navigate(path);
        
    }
  return (
    <div>
        <h3 className="text-center p-3">Seleccione si es o quiere ser una empresa de Drones o propietaro de parcelas</h3>
        <div className="text-center ">
            <Button onClick={validatetipe} variant="outline-success"size="lg" name="Empresa" className="m-3">Empresa</Button>
            <Button onClick={validatetipe} variant="outline-info" size="lg" name="Propietario" >Propietario</Button>
        </div>    
    </div>
  )
}
