import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { CONTACT_ADDRESS, CONTACT_ADDRESS2 } from '../config';
const MY_ABI= require('../contracts/DappFumi.json');
const MY_ABI2= require('../contracts/FumigaToken.json');


export const Navbar = ({account,setAccount}) => {

//const [account, setAccount] = useState();
const [contactList, setContactList] = useState({});

useEffect(() => {
  const tempo=account;
  setAccount(tempo);
}, [account])

const connectAcount= async (e)=>{
  const Address=0;

  try{
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const data = await web3.eth.requestAccounts();
    console.log(data[0]);
    const balance=await web3.eth.getBalance(data[0]);
    console.log(balance/(10**18));
    
      const contract = new web3.eth.Contract(MY_ABI2.abi, CONTACT_ADDRESS2);
      const balanceTF= await contract.methods.balanceOf(data[0]).call();
      console.log(balanceTF);
      setAccount({Address:data[0],balance:balance/(10**18),balanceTF:(balanceTF/10**18)});
      
  } catch (err) {
    console.log("User cancelled");
    console.log(err);
  }

  
  e.preventDefault();
}
  return (
    <div className="navbar">
        <Link to="/" onClick={connectAcount} className="btn btn-primary"> Connect</Link>
        <p>
          <h4>{account.Address}</h4>
          <h5>{account.balance} ETH</h5>
          <h5>{account.balanceTF} FUMIGAT</h5>
        </p>
        <hr></hr>
        
    </div>
  )
}
