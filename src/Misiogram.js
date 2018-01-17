import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import Sound from 'react-sound';
import Button from 'react-uwp/Button';
import './Misiogram.css';

export default class Misiogram extends Component {
  static contextTypes = { theme: PropTypes.object };

  constructor(props) {
    super(props);

    const message = props.message.toUpperCase().split('');
    const remainingIndexes = _.shuffle(message
      .map((letter, index) => index)
      .filter(index => message[index] !== ' ')
    );

    this.state = {
      message,
      guessed: this.generateGuessed(message),
      guessingIndex: _.first(remainingIndexes),
      remainingIndexes,
      downSound: 'STOPPED',
      upSound: 'STOPPED',
      fanfareSound: 'STOPPED'
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.guess);
    speechSynthesis.speak(new SpeechSynthesisUtterance(this.props.speeches.intro));
  }

  generateGuessed = message => {
    return message
      .map(letter => {
        if (letter === ' ') {
          return letter;
        } else {
          return <span style={{ fontFamily: 'icofont' }}>&#xef7e;</span>;
        }
      });
  };

  guess = e => {
    if (!this.state.remainingIndexes.length) return;

    if (e.key.toUpperCase() === this.state.message[this.state.guessingIndex]) {
      const remainingIndexes = _.remove(this.state.remainingIndexes, index => index !== this.state.guessingIndex);
      let sounds = {};
      if (!remainingIndexes.length) {
        sounds = {
          upSound: 'STOPPED',
          fanfareSound: 'PLAYING'
        };
        speechSynthesis.speak(new SpeechSynthesisUtterance(this.props.speeches.outro));
      } else {
        sounds = {
          downSound: 'STOPPED',
          upSound: 'PLAYING'
        };
        speechSynthesis.speak(new SpeechSynthesisUtterance(_.sample(this.props.speeches.correct)));
      }
      this.setState({
        guessed: [
          ...this.state.guessed.slice(0, this.state.guessingIndex),
          e.key.toUpperCase(),
          ...this.state.guessed.slice(this.state.guessingIndex + 1)
        ],
        guessingIndex: _.first(remainingIndexes),
        remainingIndexes,
        ...sounds
      });
    } else if ((e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode >= 186) {
      this.setState({
        downSound: 'PLAYING',
        upSound: 'STOPPED'
      });
      speechSynthesis.speak(new SpeechSynthesisUtterance(_.sample(this.props.speeches.incorrect)));
    }
  };

  handleClick = index => {
    this.setState({
      guessingIndex: index,
      downSound: 'STOPPED',
      upSound: 'STOPPED'
    });
  };

  render() {
    const { theme } = this.context;
    const { guessed, guessingIndex } = this.state;
    const { letterMargin } = this.props;
    const letterSize = `100vw / ${guessed.length + 2}`;

    const rootStyle = theme.prefixStyle({
      display: 'flex',
      alignItems: 'center',
      height: '100vh',
      padding: `calc(${letterSize})`,
      overflow: 'hidden'
    });
    const buttonStyle = theme.prefixStyle({
      flex: 1,
      background: theme.acrylicTexture80.background,
      fontSize: `calc(${letterSize} / 2)`,
      height: `calc(${letterSize} - ${letterMargin * 2}px)`,
      minHeight: 32,
      minWidth: 32,
      margin: letterMargin,
      padding: 0
    });

    const letters = guessed
      .map((letter, index) => {
        return <Button
          key={index}
          style={{
            ...buttonStyle,
            visibility: (letter === ' ') ? 'hidden' : 'visible',
            borderColor: (index === guessingIndex) ? theme.accent : theme.baseLow
          }}
          onClick={() => this.handleClick(index)}
        >
          {letter}
        </Button>;
      });

    return (
      <div style={rootStyle}>
        {letters}
        <Sound
          url="./sounds/down.wav"
          playStatus={this.state.downSound}
          onFinishedPlaying={(() => this.setState({ downSound: 'STOPPED' }))}
        />
        <Sound
          url="./sounds/up.wav"
          playStatus={this.state.upSound}
          onFinishedPlaying={(() => this.setState({ upSound: 'STOPPED' }))}
        />
        <Sound
          url="./sounds/fanfare.mp3"
          playStatus={this.state.fanfareSound}
          onFinishedPlaying={(() => this.setState({ fanfareSound: 'STOPPED' }))}
        />
      </div>
    );
  }
}

Misiogram.defaultProps = {
  message: 'Kocham Cię',
  letterMargin: 5
};

Misiogram.propTypes = {
  message: PropTypes.string,
  letterMargin: PropTypes.number
};
