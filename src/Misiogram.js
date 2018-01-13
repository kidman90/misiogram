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
    const { letterMargin } = this.props;
    const letterSize = `100vw / ${message.length + 2}`;

    const rootStyle = theme.prefixStyle({
      display: 'flex',
      alignItems: 'center',
      height: '100vh',
      padding: `calc(${letterSize})`
    });
    const buttonStyle = theme.prefixStyle({
      flex: 1,
      background: theme.acrylicTexture80.background,
      borderColor: theme.baseLow,
      fontSize: `calc(${letterSize} / 2)`,
      height: `calc(${letterSize} - ${letterMargin * 2}px)`,
      minHeight: 32,
      minWidth: 32,
      margin: letterMargin,
      padding: 0
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
