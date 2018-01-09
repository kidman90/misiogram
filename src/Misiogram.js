import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-uwp/Button';

export default class Misiogram extends Component {
  static contextTypes = { theme: PropTypes.object };

  render() {
    const { theme } = this.context;
    console.log(theme);
    const rootStyle = theme.prefixStyle({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'strech',
      justifyContent: 'center',
      height: '100vh',
      minHeight: 600,
      minWidth: 800,
      padding: 10
    });
    const rowStyle = theme.prefixStyle({
      display: 'flex',
      flex: 1,
      alignItems: 'strech'
    });
    const buttonStyle = theme.prefixStyle({
      flex: 1,
      fontSize: '10vw',
      margin: 10,
      background: theme.acrylicTexture80.background,
      borderColor: theme.baseLow
    });

    return (
      <div style={rootStyle}>
        <div style={rowStyle}>
          <Button style={buttonStyle}>K</Button>
          <Button style={buttonStyle}>O</Button>
          <Button style={buttonStyle}>C</Button>
          <Button style={buttonStyle}>H</Button>
          <Button style={buttonStyle}>A</Button>
          <Button style={buttonStyle}>M</Button>
        </div>
        <div style={rowStyle}>
          <Button style={buttonStyle}>C</Button>
          <Button style={buttonStyle}>I</Button>
          <Button style={buttonStyle}>Ę</Button>
        </div>
        <div style={rowStyle}>
          <Button style={buttonStyle}>J</Button>
          <Button style={buttonStyle}>U</Button>
          <Button style={buttonStyle}>L</Button>
          <Button style={buttonStyle}>I</Button>
          <Button style={buttonStyle}>T</Button>
          <Button style={buttonStyle}>K</Button>
          <Button style={buttonStyle}>O</Button>
          <Button style={buttonStyle}>!</Button>
        </div>
      </div>
    );
  }
}
