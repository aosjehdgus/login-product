import React from 'react';



class InputField extends React.Component {

  render(){

    return (
      <div className="inputField">

          <label
            className = 'input_label'>
              {this.props.label}
          </label>
          
          <input
              className = 'input'
              type = {this.props.type}
              placeholder ={this.props.placeholder}
              value ={this.props.value}
              onChange = { (e) => this.props.onChange(e.target.value)}   
          />
          
      </div>
    );
  }
}
export default InputField;
