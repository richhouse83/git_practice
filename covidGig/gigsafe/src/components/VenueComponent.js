import React from 'react';
import MongoReq from './util/fetchScripts'
import SuccessComponent from './SuccessComponent';

class VenueComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            address: '',
            capacity: '',
            contactNo: ''
        }
        this.handleVenueChange = this.handleVenueChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCapChange = this.handleCapChange.bind(this);
        this.handleNumChange = this.handleNumChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.createVenue= this.createVenue.bind(this);
        this.hidden = true;
        this.venueAdded = false;
    }
    handleVenueChange(venue){
        this.setState({
            name: venue.target.value
        })
        if(this.venueAdded){
            this.venueAdded = false;
        }
    }
    handleAddressChange(address){
        this.setState({
            address: address.target.value
        })
        if(this.venueAdded){
            this.venueAdded = false;
        }
    }
    handleCapChange(cap){
        this.setState({
            capacity: cap.target.value
        })
        if(this.venueAdded){
            this.venueAdded = false;
        }
    }
    handleNumChange(number){
        this.setState({
            contactNo: number.target.value
        })
        if(this.venueAdded){
            this.venueAdded = false;
        }
    }
    toggle(){
        const hiddenForm = document.getElementById('hiddenForm')
        if (this.hidden){
            hiddenForm.style.height = '165px';
            hiddenForm.style.width = '70%';
            hiddenForm.style.backgroundColor = '#db41ba';
            this.hidden = false;
        } else {
            hiddenForm.style.height = '0';
            hiddenForm.style.width = '70%';
            hiddenForm.style.backgroundColor = '#0b0c0e';


            this.hidden = true;
        }
    }
    createVenue(){
        const result=MongoReq.addVenue(this.state);
        console.log(result);
        if(!this.venueAdded){
            this.venueAdded = true;
        }
        this.setState({
            name: '',
            address: '',
            capacity: '',
            contactNo: ''
        })
    }
    render(){   
        return (
            <div>
                <a onClick={this.toggle} className='link-one'><h2>Create Venue</h2></a>
                <div id = 'hiddenForm' className='hiddenForm'>
                    <input className='textinput' onChange={this.handleVenueChange} value={this.state.name} placeholder="Name of venue"/>
                    <input className='textinput' onChange={this.handleAddressChange} value={this.state.address} placeholder="Address"/>
                    <input className='textinput' onChange={this.handleCapChange} value={this.state.capacity} placeholder="Capacity"/>
                    <input className='textinput' onChange={this.handleNumChange} value={this.state.contactNo} placeholder="Contact No"/>
                    <div className='buttonContainer'>
                        <a className='button' onClick={this.createVenue}>Submit</a>
                    </div>
                    <SuccessComponent success={this.venueAdded} word='Venue' />
                </div>
            </div>
        )
    }
}

export default VenueComponent;