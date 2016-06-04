import React from 'react';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';

import Bar from '../../components/bar';
import store from '../../store';

describe('<Bar />', function() {

  for (var i = 0; i < 5; ++i) {
    it('mounts', function() {
      const rendered = TestUtils.renderIntoDocument(<Bar />);
      expect(TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'bar').length).to.equal(1);
    });
  }

  it('listens for events', function(done) {
    setTimeout(() => {
      store.emit('change');
      done();
    }, 1000);
  });

});
