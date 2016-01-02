import React, { Component, PropTypes } from 'react';

export default class App extends Component {

  render() {
    return <div className='app'>
      {this.props.children}
    </div>;
  }

}

App.propTypes = {
  children: PropTypes.node.isRequired
};
