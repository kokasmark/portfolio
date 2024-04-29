import logo from './logo.svg';
import './App.css';
import React,{Component, createRef} from 'react';
import ModelViewer from './ModelViewer';
import InfoCard from './InfoCard';

class App extends Component {
  state ={
    scroll: 0,
    colors: ["#40e0d0","#39FF14","#FF9900","#6A0DAD","#FFFF00","#DC143C"],
    cards: [{title: "Kokas Márk"},{title: "Kokas Márk"},{title: "Kokas Márk"}]
  }
  setScroll(delta){
    console.log(delta)
    this.setState({scroll: this.state.scroll+delta*200});
  }
 render(){
  return (
    <div className="App">
      <ModelViewer parent={this}/>
      {this.state.cards.map((info, index) => (
        <InfoCard key={`card-${index}`} position={{x: index % 2 == 0? 1200 : 400, y:200+(index*1000)+this.state.scroll}} info={info} color={this.state.colors[index]}/>
      ))}
      {/* <InfoCard position={{x: 1200, y:200+this.state.scroll}} info={{title: "Kokas Márk"}} color={this.state.colors[0]}/>
      <InfoCard position={{x: 400, y:1200+this.state.scroll}} info={{title: "Ez most piros"}} color={"red"}/>
      <InfoCard position={{x: 1200, y:2200+this.state.scroll}} info={{title: "Ez most kék"}} color={"blue"}/> */}
    </div>
  );
 }
}

export default App;
