import {NavLink} from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import * as FaIcons from 'react-icons/fa'


export const Sidebar = ({tipeact}) => {
    const [tipe, setTipe] = useState({
        "Drones": true, "ListDrones":true, 
        "Parcelas":true, "ListParcelas":true});
    
    useEffect(() => {
        if(tipeact=='Dron'){
            const data={"Drones": false, "ListDrones":false, 
            "Parcelas":true, "ListParcelas":true}
            setTipe(data);

        }else if(tipeact=='Parcela'){
            const data={"Drones": true, "ListDrones":true, 
            "Parcelas":false, "ListParcelas":false}
            setTipe(data);
            console.log('ingreso a validacion parcela');
        }else{
            const data={"Drones": true, "ListDrones":true, 
            "Parcelas":true, "ListParcelas":true}
            setTipe(data);
        }
        
      }, [tipeact])
    
    
  return (
    <div className="sidebar bg-light">
       <ul>
           <li >
               <NavLink to="/" exact 
               className="text-dark rounded py-2 w-100 d-inline-block px-3" activeClassName="active"><FaIcons.FaHome className="me-2"/>Inicio</NavLink>
           </li>
           <li hidden={tipe.Drones}>
               <NavLink to="/Drones" exact 
               className="text-dark rounded py-2 w-100 d-inline-block px-3"> <FaIcons.FaPlane className="me-2"/>Crear Drone</NavLink>
           </li>
           <li hidden={tipe.ListDrones}>
               <NavLink to="/ListaDrones" exact 
               className="text-dark rounded py-2 w-100 d-inline-block px-3"> <FaIcons.FaPlane className="me-2"/>Lista Drones</NavLink>
           </li>
           <li hidden={tipe.Parcelas}>
               <NavLink to="/Parcelas" exact 
               className="text-dark rounded py-2 w-100 d-inline-block px-3"><FaIcons.FaPagelines className="me-2"/>Crear Parcela</NavLink>
           </li>
           <li hidden={tipe.ListParcelas}>
               <NavLink to="/ListParcelas" exact 
               className="text-dark rounded py-2 w-100 d-inline-block px-3"><FaIcons.FaPagelines className="me-2"/>Lista Parcelas</NavLink>
           </li>
           <li hidden={tipe.ListParcelas}>
               <NavLink to="/Comprar" exact 
               className="text-dark rounded py-2 w-100 d-inline-block px-3"><FaIcons.FaPagelines className="me-2"/>Comprar Token</NavLink>
           </li>


       </ul>
    </div>
  )
}
