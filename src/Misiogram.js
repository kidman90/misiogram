import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-uwp/Button';

export default class Misiogram extends Component {
  static contextTypes = { theme: PropTypes.object };

  constructor(props) {
    super(props);
    this.state = {
      guessed: this.generateGuessed(props.message),
      guessingIndex: this.generateIndex(props.message),
      message: props.message.toUpperCase().split('')
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.guess);
  }

  generateGuessed = message => {
    return message
      .split('')
      .map(letter => {
        if (letter === ' ') {
          return letter;
        } else {
          return <span style={{ fontFamily: 'icofont' }}>&#xef7e;</span>;
        }
      });
  };

  generateIndex = message => {
    let index = Math.floor(Math.random() * message.split('').length);
    if (message.split('')[index] === ' ') {
      index = this.generateIndex(message);
    }
    return index;
  };

  nextIndex = () => {
    let index = Math.floor(Math.random() * this.state.message.length);
    if (index === this.state.guessingIndex || this.state.message[index] === ' ' || typeof this.state.guessed[index] === 'string') {
      index = this.nextIndex();
    }
    return index;
  };

  guess = e => {
    if (e.key.toUpperCase() === this.state.message[this.state.guessingIndex]) {
      this.setState({
        guessed: [
          ...this.state.guessed.slice(0, this.state.guessingIndex),
          e.key.toUpperCase(),
          ...this.state.guessed.slice(this.state.guessingIndex + 1)
        ],
        guessingIndex: this.nextIndex()
      });
    }
  };

  handleClick = index => {
    this.setState({ guessingIndex: index });
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
      padding: `calc(${letterSize})`
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
