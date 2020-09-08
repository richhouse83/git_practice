import React from 'react';
import MongoReq from './util/fetchScripts'
import ContactsComponent from './ContactsComponent';
import SuccessComponent from './SuccessComponent';


// Need to update submit to update User's trans info

class TransmissionComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            number: "",
            passCode: '',
            contactsArray: [],
        }
        this.handleNumChange = this.handleNumChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.submit = this.submit.bind(this);
        this.listContacts = this.listContacts.bind(this);
        this.userAdded = false;
        this.contactsArray = [];
    }
    handleNumChange(number){
        this.setState({number: number.target.value});
        if(this.userAdded){
            this.userAdded = false;
        }
    }
    handleCodeChange(code){
        this.setState({passCode: code.target.value});
        if(this.userAdded){
            this.userAdded = false;
        }
    }
    submit(){
        const result = MongoReq.updateTransmission({number: this.state.number, passCode: this.state.passCode});
        if(!this.userAdded){
            console.log(result);
            this.userAdded = true;
        }
        this.setState({
            number: '',
            passCode: '',
        }); 
    }
    async listContacts(){
        
       let contactsArray = await  MongoReq.getContactsList();
       this.setState({
        contactsArray: contactsArray,
        number: '',
        passCode: '',
    });  
    }
    render() {
        return (
            <div className='inputbox' id='transmissionbox'>
                <h2>Update Transmission status</h2>
                <input onChange={this.handleNumChange} className='textinput' value={this.state.number} placeholder='Input Phone Number'/>
                <input onChange={this.handleCodeChange} className='textinput' value={this.state.passCode} placeholder='4 digit passcode'/>
                <div className = 'buttonContainer'>
                <a className='button' onClick={this.submit}>Register</a>
                <a className='button' onClick={this.listContacts}>Contacts</a>
                <SuccessComponent success={this.userAdded} word='Transmission update' />
                <ContactsComponent contactsArray={this.state.contactsArray} />
                </div>
            </div>
        )
    }
}

export default TransmissionComponent;