import React, { Component, PropTypes, Children } from 'react';

export default class Provider extends Component {

  getChildContext() {
    return { providedData: this.providedData };
  }

  constructor(props, context) {
    super(props, context);
    this.providedData = props.providedData;
  }

  shouldComponentUpdate(nextProps) {
    console.log('Provider#shouldComponentUpdate', nextProps);
    return true;
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {
    return Children.only(this.props.children);
  }

}

Provider.propTypes = {
  children: PropTypes.node.isRequired
};
