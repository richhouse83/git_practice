import React from 'react';
import MongoReq from './util/fetchScripts'
import SuccessComponent from './SuccessComponent';

class GigComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            artist: '',
            date: '',
            venue_name: ''           
        }
        this.handleArtistChange = this.handleArtistChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleVenueChange = this.handleVenueChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.hiddentoo = true;
        this.addGig = this.addGig.bind(this);
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
    toggle(){
        const hiddenForm = document.getElementById('hiddenFormToo')
        if (this.hiddentoo){
            hiddenForm.style.height = '165px';
            hiddenForm.style.width = '70%';
            hiddenForm.style.backgroundColor = '#db41ba';
            this.hiddentoo = false;
        } else {
            hiddenForm.style.height = '0';
            hiddenForm.style.width = '70%';
            hiddenForm.style.backgroundColor = '#0b0c0e';
            this.hiddentoo = true;
        }
    }
    addGig(){
        const result = MongoReq.addGig(this.state);
        console.log(result);
        if(!this.gigAdded){
            this.gigAdded = true;
        }
        this.setState({
            artist: '',
            date: '',
            venue_name: ''           
        })
    }
    render(){
        return (
            <div>
                <a onClick={this.toggle}><h2>Create Show</h2></a>
                <div id='hiddenFormToo' className='hiddenForm'>
                    <input className='textinput' onChange={this.handleArtistChange} value={this.state.artist} placeholder="Name of Artist"/>
                    <input className='textinput' onChange={this.handleDateChange} value={this.state.date} placeholder="Date of Show"/>
                    <input className='textinput' onChange={this.handleVenueChange} value={this.state.venue_name} placeholder="Name of Venue"/>
                    <div className='buttonContainer'>
                        <a className='button' onClick={this.addGig}>Submit</a>
                    </div>
                    <SuccessComponent success={this.gigAdded} word={'Gig'} />
                </div>
            </div>
        )
    }
}

export default GigComponent;