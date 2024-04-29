import logo from './logo.svg';
import './App.css';
import React,{Component, createRef} from 'react';
import ModelViewer from './ModelViewer';
import InfoCard from './InfoCard';

// Icons
import { FaReact } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaUnity } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { TbBrandCpp } from "react-icons/tb";
import { FaPython } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

class App extends Component {
  state ={
    scroll: 0,
    colors: ["#40e0d0","#39FF14","#FF9900","#6A0DAD","#FFFF00","#DC143C"],
    cards: [
      {title: "Who am i?", content: <h2>My name is Kokas Márk...</h2>},
      {title: "Skills", content: 
        <div>
          <FaReact className='icon'/>
          <FaCss3Alt className='icon'/>
          <FaUnity className='icon'/>
          <TbBrandCSharp className='icon'/>
          <TbBrandCpp className='icon'/>
          <FaPython className='icon'/>
        </div>},
      {title: "Contact info",content: 
        <div>
          <div className='row'> 
            <MdAlternateEmail className='icon'/>
            <h3>mark.kokas04@gmail.com</h3>
          </div>
          <div className='row'> 
            <FaInstagram className='icon'/>
            <h3>kokasmark</h3>
          </div>
        </div>},
        {title: "",content: 
        <div>
          <div className='row'> 
            <h3>VXEngine</h3>
            <FaUnity className='icon'/>
            <TbBrandCSharp className='icon'/>
          </div>
          <img className='img' src={require('./assets/vxengine-screenshot.webp')}/>
        </div>}]
  }
  setScroll(delta) {
    const acceleration = delta*100; // Adjust the acceleration factor as needed
    const friction = 0.8; // Adjust the friction factor (0 to 1) to control the slowdown rate
    let velocity = acceleration;
  
    const updateScroll = () => {
      const newScroll = this.state.scroll + velocity;
      velocity *= friction; // Apply friction to gradually slow down the velocity
  
      // Update the state with the new scroll position
      this.setState({ scroll: newScroll });
  
      // If the velocity is still significant, continue updating the scroll position
      if (Math.abs(velocity) > 0.1) {
        requestAnimationFrame(updateScroll);
      }
    };
  
    updateScroll();
  }
 render(){
  return (
    <div className="App">
      
      <ModelViewer parent={this}/>
      {this.state.cards.map((info, index) => (
        <InfoCard key={`card-${index}`} position={{x: index % 2 == 0? 1200 : 400, y:200+((index+1)*1000)+this.state.scroll}} info={info} color={this.state.colors[index]}/>
      ))}
      {/* <InfoCard position={{x: 1200, y:200+this.state.scroll}} info={{title: "Kokas Márk"}} color={this.state.colors[0]}/>
      <InfoCard position={{x: 400, y:1200+this.state.scroll}} info={{title: "Ez most piros"}} color={"red"}/>
      <InfoCard position={{x: 1200, y:2200+this.state.scroll}} info={{title: "Ez most kék"}} color={"blue"}/> */}
      <div className='titleBar'></div>
      <div className='titleBar-down'></div>
      <h1 className='title'>Kokas Márk's Portfolio</h1>
    </div>
  );
 }
}

export default App;
