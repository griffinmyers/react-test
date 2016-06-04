import React from 'react';

import store from '../store';

export default class Baz extends React.Component {

  constructor(props) {
    super(props);
    this.state = { mountedOneSecondAgo: false };

    this.onStoreChange = this.onStoreChange.bind(this);
  }

  onStoreChange() {
    console.log('Baz received store change');
  }

  componentWillMount() {
    console.log('Baz registering');
    store.on('change', this.onStoreChange);
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ mountedOneSecondAgo: true });
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    console.log('Baz unregistering');
    store.removeListener('change', this.onStoreChange);
  }

  render() {
    return (
      <div className="baz">Baz</div>
    );
  }

}
