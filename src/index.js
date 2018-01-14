import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Theme as UWPThemeProvider, getTheme } from 'react-uwp/Theme';
import Misiogram from './Misiogram';
import registerServiceWorker from './registerServiceWorker';

export class App extends Component {
  config = {
    message: 'Kocham Cię Julitko',
    // letterMargin: 5
  };

  render() {
    return (
      <UWPThemeProvider
        theme={getTheme({
          themeName: 'dark',
          accent: '#FFC600',
          useFluentDesign: true,
          desktopBackgroundImage: './background.jpg'
        })}
      >
        <Misiogram {...this.config} />
      </UWPThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
