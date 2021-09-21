import React from 'react';

class Testmodal extends React.Component{

    render(){
        const google = "<iframe width='100%' height='100%' scrolling='no' src='http://www.google.com' sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'></iframe>";

        return(
            <div className='popup'>
                <div className='popup_inner'>
                    <h1> {this.props.text} </h1>
                    <div dangerouslySetInnerHTML={{ __html: google ? google :""}}/>
                    <button onClick={this.props.closePopup}> close me </button>
                </div>
            </div>
        );
    }
}

export default Testmodal;