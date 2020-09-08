import React from 'react';

class ContactsComponent extends React.Component{
    render(){
        return(
            <div className='contacts'>
                <h2>Contacts</h2>
                {
                    
                    this.props.contactsArray.map(number=>{
                    return <p key={this.props.contactsArray.indexOf(number)}>{number}</p>;
                    })
                }
            </div>
        )
    }
}
export default ContactsComponent;