import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Theme as UWPThemeProvider, getTheme } from 'react-uwp/Theme';
import Misiogram from './Misiogram';
import registerServiceWorker from './registerServiceWorker';

export class App extends Component {
  config = {
    message: 'Kocham Cię Julitko',
    speeches: {
      intro: 'Witaj w Misiogramie. Ktoś chciał przekazać Ci coś misiowego. Użyj klawiatury, aby odmisiować wiadomość.',
      correct: ['zdolny miś', 'brawo misiu', 'dobrze misiujesz'],
      incorrect: ['misiuj dalej', 'wymisiuj inną literkę', 'nie misiu'],
      outro: 'Brawo Misiu. Kocham Cię jak z Łodzi do Hajnówki. To mówiłem ja Twój miś.'
    }
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
