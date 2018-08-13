import React , { Component } from 'react';


import Aux from '../../hoc/Aux';
import classes from '../Inputfields/Inputfields.css';
import Contactbuilder from '../../components/Contactbuilder/Contactbuilder';
class Inputfields extends Component {
    constructor(){
        super();
         this.state = {
            contact: [
                
            ],
            disabledProperty:false,
            numberofContacts:0,
            maxContacts:5,
            showModelStatus:false,
            modalName: null,
            modalNumber:null,
            selectedUpdated:null,
            deletemultiplearray:[

            ],
            enabledel:true
    }
   }
   reccuranceHandler = (name , number) => {
     let testcontact = this.state.contact;
     for (var i in testcontact){
         let testVar = testcontact[i].phone;
         let nameVar = testcontact[i].name;
         if(testVar === number){
            return false;
         }else if(nameVar === name){

         }
     }
     return true;
   }
   cookieupdateHandler = ( updatedContact ) => {
    let contactarray = updatedContact;
    sessionStorage.setItem('contactarray',JSON.stringify(contactarray));
   }
    addContactHandler = () =>{
        let newContactName = document.getElementById('name').value;
        let newContactNumber = document.getElementById('number').value;
        let regex = /[0-9]{10}/;
        if(newContactName !== "" && newContactNumber !== ""){
            if(regex.test(newContactNumber)){
                let recurrantVar = this.reccuranceHandler(newContactName , newContactNumber);
                if(recurrantVar){
                  this.checkNumberstatus();
                  let newContact = {
                     name:newContactName,
                     phone:newContactNumber
                  };
                  let updatedContact = [...this.state.contact,newContact];
                  this.cookieupdateHandler(updatedContact);
                  this.setState({contact:updatedContact});
                  document.getElementById('name').value = "";
                  document.getElementById('number').value = "";
                  document.getElementById('alert_tag').innerHTML = 'CREATE CONTACT HERE';
                }else{
                    document.getElementById('alert_tag').innerHTML = 'CONTACT ALREADY AVAILBALE<sup>*</sup>';
                }
            }else{
                document.getElementById('alert_tag').innerHTML = 'INVALID NUMBER<sup>*</sup>';
            }
        }else{
            document.getElementById('alert_tag').innerHTML = 'EMPTY FIELDS<sup>*</sup>';
        }
    }
    checkNumberstatus = () => {
        let updatedNumber = this.state.numberofContacts;
        let updatedDisabledProprty = this.state.disabledProperty;
        updatedNumber = updatedNumber + 1;
        if(updatedNumber === this.state.maxContacts){
            updatedDisabledProprty = true;
            document.getElementById('numbertext').style.cssText = 'color:red';
            document.getElementById('numbertext1').style.cssText = 'color:red';
        }
        this.setState({numberofContacts:updatedNumber,disabledProperty:updatedDisabledProprty});
    }
    deleteContactHandler = (ids) => {
     let originalarray = this.state.deletemultiplearray;
     let delIndex = originalarray.indexOf(ids);
     if(originalarray.includes(ids)) {
        originalarray.splice(delIndex,1); 
        let updatedDeletedContacts = [...this.state.contact];
        updatedDeletedContacts.splice(ids,1);
        this.cookieupdateHandler(updatedDeletedContacts);
        let updatedNumber = this.state.numberofContacts;
        let updatedDisabledProprty = this.state.disabledProperty;
        updatedNumber = updatedNumber - 1;
        if(updatedNumber < this.state.maxContacts){
            updatedDisabledProprty = false;
            document.getElementById('numbertext').style.cssText = 'color:black';
            document.getElementById('numbertext1').style.cssText = 'color:black';         
        }
        this.setState({deletemultiplearray:originalarray,contact:updatedDeletedContacts,disabledProperty:updatedDisabledProprty,numberofContacts:updatedNumber});
       }else{
        let updatedDeletedContacts = [...this.state.contact];
        updatedDeletedContacts.splice(ids,1);
        this.cookieupdateHandler(updatedDeletedContacts);
        let updatedNumber = this.state.numberofContacts;
        let updatedDisabledProprty = this.state.disabledProperty;
        updatedNumber = updatedNumber - 1;
        if(updatedNumber < this.state.maxContacts){
            updatedDisabledProprty = false;
            document.getElementById('numbertext').style.cssText = 'color:black';
            document.getElementById('numbertext1').style.cssText = 'color:black';         
        }
       this.setState({contact:updatedDeletedContacts,disabledProperty:updatedDisabledProprty,numberofContacts:updatedNumber});
       
       }
     }
     
    updateContactHandler = (ids) => {
        let currentSelectedcontact = this.state.selectedUpdated;
        currentSelectedcontact = ids;
        let UpdateContactModal = this.state.showModelStatus;
        this.setState({showModelStatus: !UpdateContactModal});
        this.setState({selectedUpdated:currentSelectedcontact});
        let person_name = this.state.contact[ids].name;
        let person_number = this.state.contact[ids].phone;
        this.setState({modalName : person_name});
        this.setState({modalNumber : person_number});
    }
    closeModalHandler = () => {
        let UpdateContactModal = this.state.showModelStatus;
        this.setState({showModelStatus: !UpdateContactModal});
    }
    updateSingleContactHandler = () => {
        let updatearray = this.state.contact;
        let changeVar = this.state.selectedUpdated;
        let update_name = document.getElementById('update_name').value;
        let update_number = document.getElementById('update_number').value;
        if(update_name !== "" && update_number !== ""){
            let updateobj = {
                name:update_name,
                phone:update_number
            };
            updatearray.splice(changeVar, 1 , updateobj);
            this.cookieupdateHandler(updatearray);
            this.closeModalHandler();
        }else if(update_name === "" && update_number === ""){
            let updateobj = {
                name:this.state.contact[changeVar].name,
                phone:this.state.contact[changeVar].phone
            };
            updatearray.splice(changeVar, 1 , updateobj);
            this.cookieupdateHandler(updatearray);
            this.closeModalHandler(); 
        }else if(update_name === "" && update_number !== ""){
            let updateobj = {
                name:this.state.contact[changeVar].name,
                phone:update_number
            };
            updatearray.splice(changeVar, 1 , updateobj);
            this.cookieupdateHandler(updatearray);
            this.closeModalHandler(); 
        }else if(update_number === "" && update_name !== ""){
            let updateobj = {
                name:update_name,
                phone:this.state.contact[changeVar].phone
            };
            updatearray.splice(changeVar, 1 , updateobj);
            this.cookieupdateHandler(updatearray);
            this.closeModalHandler(); 
        }
    }
    deleteAllContacts = () => {
        let flusharray = this.state.contact;
        let flushnumber = this.state.numberofContacts;
        if(flusharray.length !== 0){
            flusharray = [];
            flushnumber = 0;
            this.cookieupdateHandler(flusharray);
            this.setState({contact:flusharray,numberofContacts:flushnumber});
        }
    }
    deletemultipleHandler = (ele,ids) => {
        let deletearray = this.state.deletemultiplearray;
        let pos = ele;
        let changedelstat;
        if(deletearray.includes(ele)){
            let index = deletearray.indexOf(ele);
            deletearray.splice(index,1);
            this.setState({deletemultiplearray:deletearray});
            alert(deletearray);
        }else{
            deletearray.splice( pos , 0 ,ele);
            this.setState({deletemultiplearray:deletearray});
            alert(deletearray);
        }
        if(this.state.deletemultiplearray.length === 0){
            changedelstat = false;
            this.setState({enabledel:changedelstat});
        }else{
            changedelstat = true;
            this.setState({enabledel:changedelstat});
        }
    }
    deletemultiplesHandler = () => {
        let deletingarray = this.state.deletemultiplearray;
        let deleteupdatearray = this.state.contact;
        let itr;
        for(itr = deletingarray.length - 1;itr >= 0;itr--){
            deleteupdatearray.splice(deletingarray[itr],1);
        }
        this.cookieupdateHandler(deleteupdatearray);
        this.setState({contact:deleteupdatearray});
        deletingarray = [];
        this.setState({deletemultiplearray:deletingarray});
         document.getElementById('uncheck').reset();
         let conts = this.state.contact;
         let contcatlength = conts.length;
         let updatedDisabledProprty;
         if(contcatlength < this.state.maxContacts){
            updatedDisabledProprty = false;
            document.getElementById('numbertext').style.cssText = 'color:black';
            document.getElementById('numbertext1').style.cssText = 'color:black';         
        }
        this.setState({numberofContacts:contcatlength,disabledProperty:updatedDisabledProprty});
    }
    componentWillMount = () => {
        var obj = JSON.parse(sessionStorage.getItem('contactarray'));
        if(obj === "" ||  obj === null){
            var contactarray = [];
            sessionStorage.setItem('contactarray',JSON.stringify(contactarray));
            //let cntslength = obj.length;
           // this.setState({numberofContacts:cntslength});
        }else{
            let cntslength = obj.length;
            this.setState({numberofContacts:cntslength});
            this.setState({contact:obj});
        }
    }
    render(){
        let UpdateModal = null;
        let disabledel = 'disabledelete';
        if(this.state.showModelStatus){
          UpdateModal = (
            <div id="myModal" className={classes.modal}>
              <div className={classes.modal_content}>
                <strong className = {classes.text}>UPADTE CONTACT</strong>
                <div className = {classes.updatebox}>
                   <input 
                    id = "update_name"
                    onChange = {(e) => { e.target.value}}  
                    className = {classes.update_inputs}
                    placeholder = {this.state.modalName} />
                   <input 
                   id = "update_number" 
                   onChange = {(ev) => { ev.target.value}}
                   className = {classes.update_inputs} 
                   placeholder = {this.state.modalNumber}/>
                </div>
                 <div className = {classes.btn_div}>
                   <button className = {classes.bttn} onClick = {this.updateSingleContactHandler}>UPDATE</button>
                   <button className = {classes.bttn} onClick = {this.closeModalHandler}>CLOSE</button>
                 </div>
              </div>
            </div>
          );
        }
        return(
            <Aux>
                <p className = {classes.alert_tag} id = "alert_tag">CREATE CONTACT HERE</p>
                <section className = {classes.fieldcontainer}>
                  <div>
                      <input type = "text" className = {classes.name_input} placeholder = "Your Name here" id = "name"/>
                  </div>
                  <div>
                      <input type = "text" className = {classes.number_input} name = "phone_number" placeholder = "Your Number here" id = "number"/>
                  </div>
                  <div>                                                 
                      <button className = {classes.btn} disabled = {this.state.disabledProperty} onClick = {this.addContactHandler}>ADD CONTACT</button>
                  </div>
                </section> 
                <div className = {classes.contactcontainer}>
                   <div className = {classes.contactinfo}>
                     <div>Your Contacts: <strong id = "numbertext1">{this.state.numberofContacts}</strong></div>
                     <div className = {classes.delete_text} onClick = {this.deleteAllContacts}><i className="fa fa-trash"></i> DELETE ALL </div>
                     <div className = {classes.delete_text} onClick = {this.deletemultiplesHandler}><i className="fa fa-trash"></i> DELETE MULTIPLE </div>
                     <div id = "numbertext" className = {classes.contacttext}>{this.state.numberofContacts} / 5 Contacts</div>
                   </div>
                   <div className = {classes.contact_box}>
                    <form id = "uncheck">
                     <Contactbuilder id = {disabledel} multipledeleted = {this.deletemultipleHandler} updated = {this.updateContactHandler.bind(this)} contacts = {this.state.contact} disabled = {this.state.disabledProperty} numberofcontacts = {this.props.numberofContacts} deleted = {this.deleteContactHandler} />
                    </form> 
                     {UpdateModal}
                   </div>
                </div>
            </Aux>

          );
    }
}

export default Inputfields;



              
              