import React from 'react';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import Foo from '../../components/foo';

import store from '../../store';

describe('<Foo />', function() {

  for (var i = 0; i < 10; ++i) {
    it('mounts', function() {
      const rendered = TestUtils.renderIntoDocument(<Foo />);
      expect(TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'foo').length).to.equal(1);
    });
  }

  it('listens for events', function(done) {
    setTimeout(() => {
      store.emit('change');
      done();
    }, 1000);
  });

});
