import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react';
import ModelViewer from './ModelViewer';

class InfoCard extends Component {
 render(){
  return (
    <div className="Card" style={{
      top: this.props.position.y,
      left: this.props.position.x, 
      borderColor: this.props.color, 
      boxShadow: `0px 0px 1000px ${this.props.color}`,
      backgroundColor: this.props.color}}>
      {/* <div className="line"></div> */}
      <div className='content'>
        <h1>{this.props.info.title}</h1>
      </div>
    </div>
  );
 }
}

export default InfoCard;
