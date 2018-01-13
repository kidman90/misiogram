import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-uwp/Button';

export default class Misiogram extends Component {
  static contextTypes = { theme: PropTypes.object };

  constructor(props) {
    super(props);
    this.state = {
      guessed: this.generateGuessed(props.message),
      guessingIndex: 0
    };
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

  handleClick = index => {
    this.setState({ guessingIndex: index });
  };

  render() {
    const { theme } = this.context; console.log(theme);
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
      textTransform: 'uppercase',
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
