import { mount } from 'enzyme';

/**
 * ## safeMount
 *
 * safeMount will mount a passed component into a detached div. This will likely
 * be something provided by jsdom, or maybe a true div if tests are running in
 * a browser.
 *
 * Additionally, it will perform any cleanup work necessary to ensure you aren't
 * polluting global state, and that your component is properly unounting (and
 * calling its unmount lifecycle methods).
 *
 * Syncronous Usage:
 *
 * it('asserts my view', function() {
 *   safeMount(<WindowCleaner />, function(wrapper) {
 *     expect(wrapper.find('.panel')).to.have.length(1);
 *   });
 * })
 *
 * Asyncronous Usage:
 *
 * it('asserts my view', function(done) {
 *   safeMount(<WindowCleaner />, function(wrapper, unmount) {
 *     wrapper.instasnce().showAnimation().then(() => {
 *       expect(wrapper.state('animationDone')).to.be(true);
 *       unmount();
 *     })
 *   }, done);
 * })
 *
 * @param {Function} component The React component to mount
 * @param {Function} cb A callback to pass the mounted wrapper to (will be an
 *   enzyme wrapper)
 * @param {Function=} done A callback to signal test completion.
 *
 */
export default function safeMount(component, cb, done) {
  const wrapper = mount(component);

  if (typeof done === 'function') {
    cb(wrapper, function cleanUp() {
      wrapper.unmount();
      done();
    });
  } else {
    cb(wrapper);
    wrapper.unmount();
  }
}
