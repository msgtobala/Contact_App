import React from 'react';

import Contactcomponent from '../Contactcomponent/Contactcomponent';
import classes from '../../components/Contactbuilder/Contactbuilder.css';
import Aux from '../../hoc/Aux';
const contactbuilder = ( props ) => {
    let contactVar = props.contacts;
    console.log(contactVar);
    if(contactVar.length === 0){
        let template = <h1 className = {classes.notext}>No,Contacts Yet</h1>
        return template;
    }else{
    return (
       <Aux>
        {
         contactVar.map((itr,i)=>{
             return <Contactcomponent id = {i} multipledeleted = {props.multipledeleted.bind(this,i)} updated = {()=> props.updated(i)} deleted = { ()=> props.deleted(i)} key = {itr} numberofcontacts = {props.numberofcontacts} initials = {i+1} name = {itr.name} number = {itr.phone}/>
         })
        }
        </Aux>
    ); 
  }
}

export default contactbuilder;