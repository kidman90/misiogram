import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-uwp/Button';

export default class Misiogram extends Component {
  static contextTypes = { theme: PropTypes.object };

  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { theme } = this.context;
    const message = this.props.message.split('');

    const rootStyle = theme.prefixStyle({
      display: 'flex',
      alignItems: 'center',
      height: '100vh',
      padding: `calc(100vw / ${message.length + 2}`
    });
    const buttonStyle = theme.prefixStyle({
      flex: 1,
      fontSize: `calc(100vw / ${message.length} / 3)`,
      background: theme.acrylicTexture80.background,
      borderColor: theme.baseLow,
      height: `calc(100vw / ${message.length + 2})`
    });

    const letters = message
      .map((letter, index) => {
        return <Button
          key={index}
          style={{
            ...buttonStyle,
            visibility: (letter === ' ') ? 'hidden' : 'visible'
          }}
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
