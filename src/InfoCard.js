import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react';
import ModelViewer from './ModelViewer';

class InfoCard extends Component {
 render(){
  return (
    <div className={"Card"+(this.props.index%2==0?" right":" left")} style={{
      top: this.props.position.y,
      left: this.props.position.x, 
      borderColor: this.props.color, 
      boxShadow: this.props.parent.state.cardsFlicker ?  !this.props.parent.state.flicker ? `0px 0px 100px ${this.props.color}`:`none` : `0px 0px 100px ${this.props.color}`,
      }}>
     
      <div className='content'>
        <h1>{this.props.info.title}</h1>
        {this.props.info.content}
      </div>
    </div>
  );
 }
}

export default InfoCard;
