import React from 'react';
import MongoReq from './util/fetchScripts'
import SuccessComponent from './SuccessComponent';

const resetState = {
    number: '',
    passCode: '',
}

class UserComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            number: "",
            passCode: ''
        }
        this.handleNumChange = this.handleNumChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.submit = this.submit.bind(this);
        this.userAdded = false;
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
    async submit(){
        const result = await MongoReq.addUser(this.state);
        if(!this.userAdded){
            this.userAdded = true;
            this.setState({
                number: '',
                passCode: '',
            });
        }
    }
    test(){
        const result = MongoReq.getUsers();
        console.log(result);
    }
    render() {
        return (
            <div className='inputbox' id='inputbox'>
                <input onChange={this.handleNumChange} className='textinput' value={this.state.number} placeholder='Input Phone Number'/>
                <input onChange={this.handleCodeChange} className='textinput' value={this.state.passCode} placeholder='4 digit passcode'/>
                <div className = 'buttonContainer'>
                <a className='button' onClick={this.submit}>Register</a>
                <SuccessComponent success={this.userAdded} word='Number' />
                </div>
            </div>
        )
    }
}

export default UserComponent;