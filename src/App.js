import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';



import './App.css';

import {Navbar} from './components/navbar'
import {Sidebar} from './components/sidebar'
import {Home} from './components/pages/home'
import {Login} from './components/pages/login'
import {Drones} from './components/pages/drones'
import {Parcela} from './components/pages/parcela'
import {ListParcelas} from './components/pages/listParcelas'
import {ListDrones} from './components/pages/listdrones'
import {Fumigar} from './components/pages/fumigar'
import {Buytokes} from './components/pages/buytokes'


function App() {
  const [account, setAccount] = useState({Address:'0x0000000000000000000000000000000000000000', balance:0, balanceTF:0});
  const [tipeact, setTipeact]=useState('login');
 
  

  return (
    <Router>
      
      <div className="flex">
        <Sidebar tipeact={tipeact}/>
        <div className="content">
        <Navbar account={account} setAccount={setAccount}/>
          <Routes>
            <Route path="/" exact element={<Login setTipeact={setTipeact} account={account.Address}/>} ></Route>  
            <Route path="/Drones" element={<Drones account={account.Address} tipeact={tipeact}/>} ></Route> 
            <Route path="/ListaDrones" element={<ListDrones account={account.Address}/>} ></Route>
            <Route path="/Parcelas" element={<Parcela account={account.Address} tipeact={tipeact}/>}></Route> 
            <Route path="/ListParcelas" element={<ListParcelas account={account} setAccount={setAccount}/>}></Route> 
            <Route path="/Fumigar" element={<Fumigar account={account} setAccount={setAccount}/>}></Route> 
            <Route path="/Comprar" element={<Buytokes account={account} setAccount={setAccount}/>}></Route> 
  
          </Routes>
          
        </div>
      </div>
     
    </Router>
  );
}

export default App;
