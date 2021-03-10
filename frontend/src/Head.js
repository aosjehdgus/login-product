import React from 'react';

class Head extends React.Component {

  render(){

    return (
      <div className="head">
          
        <h1>
          {this.props.title}
        </h1>    
       
      </div>
    );
  }
}
export default Head;
