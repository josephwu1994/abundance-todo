import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import { Provider } from 'react-redux';
import { CreateStore, createStore } from 'redux';
import rootReducer from '../reducers';

import Home from '../views/Home.jsx';
import GraphContainer from '../views/GraphContainer.jsx';

const store = createStore(rootReducer);

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      slideIndex: 0,
      newTodo: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      slideIndex: value
    });
  }

  render() {
    
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div>
            <AppBar
              title={`TODO BY JOSEPH`}
              titleStyle={{
                overflow: 'visible',
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'Sans-serif',
                fontWeight: '800',
                fontSize: '3em',
                flex: 'none',
                textShadow: '1px 1px 2px #fff'
              }}
              style={{ 
                padding: '40px', 
                background: '#56ccf2', 
                background: '-webkit-linear-gradient(to right, #56ccf2, #2f80ed)', 
                background: 'linear-gradient(to right, #56ccf2, #2f80ed)'
              }}
              showMenuIconButton={false}
              children={
                <Tabs
                  onChange={this.handleChange}
                  value={this.state.slideIndex}
                  style={{
                    marginLeft: '50px',
                    width: '10vw',
                    boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  <Tab
                    buttonStyle={{
                      height: '75px',
                      backgroundColor: 'white',
                      color: 'rgba(0,0,0,0.6)',
                      fontSize: '1em',
                      fontWeight: '700'
                    }}
                    label='Home'
                    value={0}
                  />
                  <Tab
                    buttonStyle={{
                      height: '75px',
                      backgroundColor: 'white',
                      color: 'rgba(0,0,0,0.6)',
                      fontSize: '1em',
                      fontWeight: '700'
                    }}
                    label='Graph'
                    value={1}
                  />
                </Tabs>
              }
            />
            <SwipeableViews
              style={{ backgroundColor: '#f4fbfde5' }}
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}
            >
              <Home />
              <GraphContainer />
            </SwipeableViews>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
