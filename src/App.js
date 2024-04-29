import logo from './logo.svg';
import './App.css';
import React,{Component, createRef} from 'react';
import ModelViewer from './ModelViewer';
import InfoCard from './InfoCard';

import GitHubCalendar from 'react-github-calendar';

// Icons
import { FaReact } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaUnity } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { TbBrandCpp } from "react-icons/tb";
import { FaPython } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaItchIo } from "react-icons/fa";

import { FaMouse } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";

class App extends Component {
  
  state ={
    scroll: 0,
    colors: ["#40e0d0","#39FF14","#FF9900","#6A0DAD","#FFFF00","#DC143C","#00FF00","#4f36f5"],
    cards: [
      {title: "Who am i?", content: <h2>Im a software engineer, with almost 6 years of experience and 5 years of education.</h2>},
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
        {title: "Github",content: 
        <div>
          <GitHubCalendar username="kokasmark" style={{overflow: 'hidden', width: '100%'}}/>
        </div>},
        {title: "",content: 
        <div>
          <div className='row'> 
            <h3>Itch.io</h3>
            <FaItchIo className='icon'/>
          </div>
          <img className='img' src={require('./assets/itch-screenshot.png')}/>
          <a href='https://kaakas.itch.io/'>My games</a>
        </div>},
        {title: "",content: 
        <div>
          <div className='row'> 
            <h3>VXEngine</h3>
            <FaUnity className='icon'/>
            <TbBrandCSharp className='icon'/>
          </div>
          <img className='img' src={require('./assets/vxengine-screenshot.webp')}/>
        </div>},
        {title: "",content: 
        <div>
          <div className='row'> 
            <h3>Flexify</h3>
            <FaReact className='icon'/>
            <FaCss3Alt className='icon'/>
          </div>
          <img className='img' src={require('./assets/flexify-screenshot.png')}/>
        </div>},
        {title: "",content: 
        <div>
          <div className='row'> 
            <h3>Python Cmd Raycaster</h3>
            <FaPython className='icon'/>
          </div>
          <img className='img' src={require('./assets/python-screenshot.jpg')}/>
        </div>}
        ],
        flicker: false,
        cardsFlicker: false
  }
  setScroll(delta) {
    const acceleration = delta*200; // Adjust the acceleration factor as needed
    const friction = 0.8; // Adjust the friction factor (0 to 1) to control the slowdown rate
    let velocity = acceleration;
  
    const updateScroll = () => {
      var newScroll = this.state.scroll + velocity;
      velocity *= friction; // Apply friction to gradually slow down the velocity
      
      if(newScroll > 0)
        newScroll = 0;
      // Update the state with the new scroll position
      this.setState({ scroll: newScroll });
  
      // If the velocity is still significant, continue updating the scroll position
      if (Math.abs(velocity) > 0.1) {
        requestAnimationFrame(updateScroll);
      }
      
    };
  
    updateScroll();
  }
  keyDown(e){
    if(e.keyCode === 40){
      this.setScroll(-1);
    }
    if(e.keyCode === 38){
      this.setScroll(1);
    }
  }

  componentDidMount(){
    this.keyDown = this.keyDown.bind(this);
    window.addEventListener("keydown", this.keyDown);
    this.startFlickerLoop();
  }
  componentWillUnmount(){
    window.removeEventListener("keydown", this.keyDown);
    clearTimeout(this.flickerTimeout);
  }

  toggleFlicker = () => {
    this.setState((prevState) => ({
      flicker: !prevState.flicker
    }));
  };

  // Method to start the flicker loop
  startFlickerLoop = () => {
    // Toggle flicker initially
    this.toggleFlicker();

    // Recursive function to continue the flicker loop
    const flickerLoop = () => {
      // Set a random timeout period (between 500ms and 3000ms, adjust as needed)
      const flickerTime = Math.floor(Math.random() * (1000 - 50 + 1)) ;

      // Set a timeout to toggle flicker after the random period
      this.flickerTimeout = setTimeout(() => {
        // Toggle flicker
        this.toggleFlicker();

        // Call flickerLoop again recursively
        flickerLoop();
      }, flickerTime);
    };

    // Start the flicker loop
    flickerLoop();
  };

 render(){
  return (
    <div className="App">
      
      <ModelViewer parent={this}/>
      {this.state.cards.map((info, index) => (
        <InfoCard key={`card-${index}`} position={{x: index % 2 == 0? '65%' : '15%', y:200+((index+1)*1000)+this.state.scroll}} 
        info={info} color={this.state.colors[index]} index={index} parent={this}/>
      ))}
      <div className='titleBar'></div>
      <div className='titleBar-down'>
        <div className='controls'> 
          <FaMouse className='icon'/>
          <p>Scroll</p>
          <FaKeyboard className='icon'/>
          <p>Up/Down Arrows</p>
          <FaLightbulb className='icon'/>
          <input type='checkbox' onChange={(e)=>this.setState({cardsFlicker: e.target.checked})}/>
        </div>
      </div>
      <h1 className={'title'+(this.state.flicker ? " flicker": "")} style={{top: this.state.scroll}}>Kokas Márk</h1>
    </div>
  );
 }
}

export default App;
