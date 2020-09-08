import React from 'react';
import MongoReq from './util/fetchScripts'
import SuccessComponent from './SuccessComponent';




class AttendedComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            number: '',
            passCode: '',
            artist: '',
            date: '',
            venue_name: ''           
        }
        this.handleArtistChange = this.handleArtistChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleVenueChange = this.handleVenueChange.bind(this);
        this.handleNumChange = this.handleNumChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.hiddenthree = true;
        this.addGigToUser = this.addGigToUser.bind(this);
        this.gigAdded = false;
    }
    handleArtistChange(artist){
        this.setState({
            artist: artist.target.value
        })
        if(this.gigAdded){
            this.gigAdded = false;
        }
    }
    handleDateChange(date){
        this.setState({
            date: date.target.value
        })
        if(this.gigAdded){
            this.gigAdded = false;
        }
    }
    handleVenueChange(venue){
        this.setState({
            venue_name: venue.target.value
        })
        if(this.gigAdded){
            this.gigAdded = false;
        }
    }
    handleNumChange(number){
        this.setState({number: number.target.value});
        if(this.gigAdded){
            this.gigAdded = false;
        }
    }
    handleCodeChange(code){
        this.setState({passCode: code.target.value});
        if(this.gigAdded){
            this.gigAdded = false;
        }
    }
    toggle(){
        const hiddenForm = document.getElementById('hiddenFormThree')
        if (this.hiddenthree){
            hiddenForm.style.height = '165px';
            hiddenForm.style.width = '70%';
            hiddenForm.style.backgroundColor = '#db41ba';
            this.hiddenthree = false;
        } else {
            hiddenForm.style.height = '0';
            hiddenForm.style.width = '70%';
            hiddenForm.style.backgroundColor = '#0b0c0e';
            this.hiddenthree = true;
        }
    }
    addGigToUser(){
        const result = MongoReq.addGigToUser(this.state);
        console.log('completed');
        if(!this.gigAdded){
            this.gigAdded = true;
        }
        this.setState({
            artist: '',
            venue_name: '',
            number: '',
            passCode: '',
        });
    }
    render(){
        return (
            <div>
                <a onClick={this.toggle}><h2>Add show to user</h2></a>
                <div id='hiddenFormThree' className='hiddenForm'>
                    <input className='textinput' onChange={this.handleArtistChange} value={this.state.artist} placeholder="Name of Artist"/>
                    <input className='textinput' onChange={this.handleVenueChange} value={this.state.venue_name} placeholder="Name of Venue"/>
                    <input onChange={this.handleNumChange} className='textinput' value={this.state.number} placeholder='Input Phone Number'/>
                    <input onChange={this.handleCodeChange} className='textinput' value={this.state.passCode} placeholder='4 digit passcode'/>
                    <div className='buttonContainer'>
                        <a className='button' onClick={this.addGigToUser}>Submit</a>
                    </div>
                    <SuccessComponent success={this.gigAdded} word='Attendance' />
                </div>
            </div>
        )
    }
}

export default AttendedComponent;