import React from 'react';
import { expect } from 'chai';

import safeMount from '../../safeMount';
import Baz from '../../components/baz';
import store from '../../store';

describe('<Baz />', function() {

  for (var i = 0; i < 5; ++i) {
    it('safeMounts', function() {
      safeMount(<Baz />, function(wrapper) {
        expect(wrapper.find('.baz').length).to.equal(1);
      });
    });
  }

  it('safeMounts async', function(done) {
    safeMount(<Baz />, function(wrapper, unmount) {
      expect(wrapper.state('mountedOneSecondAgo')).to.equal(false);
      setTimeout(() => {
        expect(wrapper.state('mountedOneSecondAgo')).to.equal(true);
        unmount();
      }, 1000);
    }, done);
  });

  it('listens for events', function(done) {
    setTimeout(() => {
      store.emit('change');
      done();
    }, 1000);
  });

});
