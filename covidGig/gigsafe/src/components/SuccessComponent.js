import React from 'react';

class SuccessComponent extends React.Component{
    render(){
        return(
            <div className='Success'>
                {
                    this.props.success ? <p>{this.props.word} added succesfully</p> : <p></p>
                 }
            </div>
        )
    }
}
export default SuccessComponent;