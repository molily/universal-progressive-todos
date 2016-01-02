import React, { Component, PropTypes } from 'react';

export default class Layout extends Component {

  render() {
    return <html lang='en'>
      <head>
        <meta charSet='utf-8'/>
        <title>{this.props.title}</title>
      </head>
      <body>
        <div id='content'>{this.props.children}</div>
        <script src='/static/bundle.js'/>
      </body>
    </html>;
  }

}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};
