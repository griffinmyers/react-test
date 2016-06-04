import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Foo from '../../components/foo';
import store from '../../store';

describe('<Foo />', function() {

  for (var i = 0; i < 5; ++i) {
    it('mounts', function() {
      const wrapper = mount(<Foo />);
      expect(wrapper.find('.foo').length).to.equal(1);
      wrapper.unmount();
    });
  }

  it('listens for events', function(done) {
    setTimeout(() => {
      store.emit('change');
      done();
    }, 1000);
  });

});
