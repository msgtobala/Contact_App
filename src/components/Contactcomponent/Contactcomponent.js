import React from 'react';

import classes from '../Contactcomponent/Contactcomponent.css';
const contactcomponent = ( props ) => {
    return(
      <div>
         <form id = "uncheck" className = {classes.contacts}>
          <input type = "checkbox" className = {classes.check_text} onClick = {props.multipledeleted}/>
          <p className = "text">{props.initials}</p>
          <p className = "text">{props.name}</p>
          <p className = "text">{props.number}</p>
          <i className="far fa-edit" onClick = {props.updated}> <strong>EDIT</strong> </i>
          <i className="fa fa-trash" aria-hidden="true" id = "disabledelete" onClick = {props.deleted}> <strong>DELETE</strong> </i>
        </form>
      </div>
    );
}

export default contactcomponent;