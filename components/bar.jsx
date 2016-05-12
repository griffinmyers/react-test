import React from 'react';

import store from '../store';

export default class Bar extends React.Component {

  constructor(props) {
    super(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange() {
    console.log('Bar received store change');
  }

  componentWillMount() {
    console.log('Bar registering');
    store.on('change', this.onStoreChange);
  }

  componentWillUnmount() {
    console.log('Bar unregistering');
    store.removeListener('change', this.onStoreChange);
  }

  render() {
    return (
      <div className="bar">Bar</div>
    );
  }

}
