import React from 'react'

class Tile extends React.Component {
  constructor(props){
    super(props);

    this.value = props.value;
    this.mode = props.mode;
   
  }

  render() {
    return (
      <div className='letter' id={this.mode} >{this.value}</div>
      
    )
  }
}
export default Tile