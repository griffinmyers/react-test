import React from 'react';

import store from '../store';

export default class Foo extends React.Component {

  constructor(props) {
    super(props);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange() {
    console.log('Foo received store change');
  }

  componentWillMount() {
    console.log('Foo registering');
    store.on('change', this.onStoreChange);
  }

  componentWillUnmount() {
    console.log('Foo unregistering');
    store.removeListener('change', this.onStoreChange);
  }

  render() {
    return (
      <div className="foo">Foo</div>
    );
  }

}
