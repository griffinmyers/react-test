import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Bar from '../../components/bar';

import store from '../../store';

describe('<Bar />', function() {

  for (var i = 0; i < 10; ++i) {
    it('mounts', function() {
      expect(mount(<Bar />).find('.bar').length).to.equal(1);
    });
  }

  it('listens for events', function(done) {
    setTimeout(() => {
      store.emit('change');
      done();
    }, 1000);
  });

});
