import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

const validKeys = ['Q','W','E','A','S','D','Z','X','C'];

const playDrum = function(drum_id) {
  let drum=document.getElementById(drum_id);
  drum.className = "drum-pad drum-pad-played";

  let mydrum=drum_id.substring(drum_id.length-1);
  document.getElementById('drum_'+mydrum).play();
  document.getElementById('drumtext').innerHTML='Played key: '+mydrum;
  // wait 0.1 seconds so user can 'see' change of background
  // and realizes that the click or keypress has happened.
  setTimeout( () => drum.className = "drum-pad drum-pad-not-played", 100);
  return (null);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let key =event.target.id;
    playDrum(key);
  }

  onKeyDown(event) {
    let key = String.fromCharCode(event.keyCode);
    if (!(validKeys.indexOf(key) < 0)) {
      playDrum('divdrum'+key);
    }
  }

  componentWillMount() {
      document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyDown);
  }

  render() {
    const items = validKeys.map((instrument) =>
         <DisplayDrum
              key={instrument}
              drum_number={instrument}
              onclick={this.handleClick} />);
    return (
      <div id='drum-machine'>
        <div id='display'>
          {items}
          <p id='drumtext' />
        </div>
      </div>
    );
  }
};

class DisplayDrum extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const drumid='divdrum'+[this.props.drum_number];
    return (
      <div id={drumid}
           className='drum-pad drum-pad-not-played'
           onClick={this.props.onclick}
           >
           <audio className='clip'
                  id={this.props.drum_number}
                  type='audio/wav'
                  src='https://freewavesamples.com/files/Bass-Drum-1.wav'
                  preload='auto'>
           </audio>
          {this.props.drum_number}
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
