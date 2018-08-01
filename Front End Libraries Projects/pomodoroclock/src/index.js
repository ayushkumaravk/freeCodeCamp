import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';

let playpromise='';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.moveTime = this.moveTime.bind(this);

    this.state={
      session_length: 25,
      break_length: 5,
      time_type: 'session',
      timer_paused: false,
      timeLeftMin: 25,
      timeLeftSec: 0
    }
  }

  handleClick(event) {
    let session_length = this.state.session_length;
    let break_length = this.state.break_length;
    let key =event.target.id;

    switch (key) {
      case 'session-decrement': // should be 1
         if (session_length > 1) --session_length;
         break;
      case 'session-increment':
         if (session_length < 60) ++session_length;
         break;
      case 'break-decrement': // should be 1
         if (break_length > 1) --break_length;
         break;
      case 'break-increment':
         if (break_length < 60) ++break_length;
         break;
    };

    this.setState({
      session_length: session_length,
      timeLeftMin: session_length,
      break_length: break_length
    });
  }

  handleReset() {
    clearInterval(this.interval_id);
    document.getElementById('timer-label').innerHTML='Session`';
    document.getElementById('start_stop').innerHTML='Start';
    if (playpromise !== undefined) {
      document.getElementById('beep').pause();
      document.getElementById('beep').currentTime=0;
    }

    var el = document.getElementById('progress_bar');
    el.style.width = '0%';
    el.style.heigth = '100%';
    this.setState({
      time_type: 'session',
      timer_paused: false,
      session_length: 25,
      break_length: 5,
      timeLeftMin: 25,
      timeLeftSec:0
    });

  }

  moveTime(){
    let minutes=this.state.timeLeftMin;
    let seconds=this.state.timeLeftSec;
    let time_type=this.state.time_type;
    let s_length = this.state.session_length;
    let b_length = this.state.break_length;
    let time='';
    let barcolor = '';

    --seconds;
    if ((seconds === 0) && (minutes === 0)) {
      let beeper=document.getElementById('beep');
      playpromise=beeper.play();
      if (time_type === 'session') {
      }
      else {
      }
    }
    if (seconds < 0) {
      seconds=59;
      --minutes;
      if (minutes < 0) {
        if (time_type === 'session') {
          document.getElementById('timer-label').innerHTML='Break';
          minutes=this.state.break_length;
          seconds=0;
          time_type='break';
        }
        else {
          document.getElementById('timer-label').innerHTML='Session`';
          minutes=this.state.session_length;
          seconds=0;
          time_type='session';
        }
      }
    }
    if (time_type === 'session') {
      barcolor = 'Teal';
      time=s_length;
    }
    else {
      barcolor = 'lightGreen';
      time=b_length;
    }
    let perc_advance = Math.round(100-((100*(minutes*60+seconds))/(time*60)));
    var el = document.getElementById('progress_bar');
    el.style.backgroundColor = barcolor;
    el.style.width = perc_advance+'%';
    el.style.heigth = '100%';

    this.setState({
      timeLeftMin : minutes,
      timeLeftSec : seconds,
      time_type : time_type
    });
  }

  handlePlay() {
    let paused=this.state.timer_paused;
    paused= !paused;
    if (paused) {
      document.getElementById('start_stop').innerHTML='Pause';
      this.interval_id = setInterval(this.moveTime, 1000);
    }
    else {
      document.getElementById('start_stop').innerHTML='Continue';
      paused = false;
      clearInterval(this.interval_id);
    }
    this.setState({
      timer_paused : paused
    });
  }

  render() {
    return (
      <div>
        <ClockConfig handleClick={this.handleClick}
            slength={this.state.session_length}
            blength={this.state.break_length}
            />
        <BarDisplay />
        <Timer timeMin={this.state.timeLeftMin}
               timeSec={this.state.timeLeftSec} />
        <Buttons onPlay={this.handlePlay}
                 onStop={this.handleStop}
                 onReset={this.handleReset}/>
        <div id="pomodoro-footer" className="pomodoroFooter">by Eric Day</div>
      </div>
    );
  }
};

class ClockConfig extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="clockConfig">
        <div id="pomodoro-title" className="pomodoroTitle">Pomodoro Clock</div>
        <div id="session-label" className="nameSession">Session</div>
        <div id="break-label" className="nameBreak">Break</div>
        <button id="session-decrement"
             className="leftMinus"
             onClick={this.props.handleClick}>-</button>
        <div id="session-length" className="length">
             {this.props.slength}</div>
        <button id="session-increment"
             className="leftMinus rightPlus"
             onClick={this.props.handleClick}>+</button>
        <button id="break-decrement"
             className="leftMinus"
             onClick={this.props.handleClick}>-</button>
        <div id="break-length" className="length">
             {this.props.blength}</div>
        <button id="break-increment"
             className="leftMinus rightPlus"
             onClick={this.props.handleClick}>+</button>
      </div>
    );
  }
};

class BarDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='bar'>
        <div id='progress_bar'>&nbsp;</div>
      </div>
    );
  }
};
class Timer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let date = new Date(null);
    date.setSeconds(this.props.timeSec); // specify value for SECONDS here
    date.setMinutes(this.props.timeMin);
    let timeString = date.toISOString().substr(14, 5);
    return (
      <div id='timer' className='timer'>
        <div id='timer-label' className='labelSession'>Session</div>
        <div id='time-left' className='timeLeft'>{timeString}</div>
      </div>
    );
  }
};

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='buttons' className='buttons'>
        <button onClick={this.props.onPlay}
                type="button"
                id='start_stop'
                className='btn btn-outline-success'>Start</button>
        <button onClick={this.props.onReset}
                type="button"
                id='reset'
                className="btn btn-outline-danger">Reset</button>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
