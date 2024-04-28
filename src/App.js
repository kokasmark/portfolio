import logo from './logo.svg';
import './App.css';
import React,{Component} from 'react';
import ModelViewer from './ModelViewer';
import InfoCard from './InfoCard';

class App extends Component {
 render(){
  return (
    <div className="App">
      <ModelViewer/>
      <InfoCard position={{x: 1200, y:200}} info={{title: "Kokas Márk"}}/>
    </div>
  );
 }
}

export default App;
