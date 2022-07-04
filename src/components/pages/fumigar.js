
import { useLocation } from "react-router-dom";
import { Table, Button} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { CONTACT_ADDRESS,CONTACT_ADDRESS2 } from '../../config';


export const Fumigar = ({account,setAccount}) => {
    const [drones, setDrones] = useState([]);
    const [tbody,setTbody]=useState(true);
    const location=useLocation();
    const MY_ABI= require('../../contracts/DappFumi.json');
    const MY_ABI2= require('../../contracts/FumigaToken.json');

  useEffect(() => {
    const QueryDrones= async ()=>{
 
        try{
          const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');  
          const contract = new web3.eth.Contract(MY_ABI.abi, CONTACT_ADDRESS);
          const datos=await contract.methods.getAllDrones().call();
          setDrones(datos);
        } catch (err) {
          console.log(err);
        }
    }
    QueryDrones();
   
  }, [])


  
    

    const Handlesearch=()=>{
        
        console.log("array de Drones")
        console.log(drones)
         const temdrones=drones.filter((dron)=>(
             dron.Pesti.some(x=>location.state.obj.Pesti.includes(x))&& 
             dron.MaxHeight>=location.state.obj.MaxHeight && 
             dron.MinHeight<=location.state.obj.MinHeight)) ;
         setDrones(temdrones);
         console.log("resultado de Array filtrado")
         console.log(temdrones);
         setTbody(false);
    }

    const HandleFumigar=async (dron, e)=>{
      
        
            try{
                //Validar Balance FUMIGAT
                const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');   
                const contract = new web3.eth.Contract(MY_ABI2.abi, CONTACT_ADDRESS2);
                const datos=await contract.methods.balanceOf(account.Address).call();
                console.log("datos es:"+datos);
                const tempodata=account
                tempodata.balanceFT=datos/10**18;
                setAccount(tempodata);
                if((datos/10**18)>0){
                    //inicio transfer to other account //
                  await contract.methods.TranferTo(dron.CostxM,dron.dir).send({from: account.Address});
                  //Fin transfer to other account //
                }else{ alert("No tiene tokens FUMIGAT para poder realiazar actividades de Fumigación")}

                 
                  
                  
              } catch (err) {
                console.log("User cancelled");
                console.log(err);
              }

        
        
        
          
          e.preventDefault();
    }
          
    

    
  return (
      <>
      <div>Fumigar: Parcela con id: {location.state.obj.idToken}-Pesticidas:{location.state.obj.Pesti}</div>
      <Button onClick={Handlesearch}>Buscar Drones</Button>
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
                  <th>Fumigar</th>
                </tr>
              </thead>
              <tbody hidden={tbody}>
                  {drones.map((dron)=>(
                    <tr>
                      <th>{dron.idToken}</th>
                      <th>{dron.dir}</th>
                      <th>{dron.MaxHeight}</th>
                      <th>{dron.MinHeight}</th>
                      <th>{dron.CostxM}</th>
                      <th>{dron.Pesti}</th>
                      <th><Button onClick={(e)=>{HandleFumigar(dron,e)}}>Fumigar</Button></th>
                    </tr> 
                    ))}
              </tbody>
            </Table>
      
      </div>
      
      </>
    
    
  )
}
