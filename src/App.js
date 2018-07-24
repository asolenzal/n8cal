import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Sidebar from './components/Sidebar';
import store from './store';

const App = () => (
  <div className="container-fluid with-sidebar">
    <div className="row">
      <div className="col">
        <Provider store={store}>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Sidebar />
          </MuiThemeProvider>
        </Provider>
      </div>
    </div>
  </div>
);

export default App;
