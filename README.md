# react-test

Minimum Viable Test Case for the dangers of global state singletons. 

#### Running

```bash
npm install
npm test
```

I run two tests: one for my `<Bar />` component and one for my `<Foo />` component.  Once I'm done testing `<Bar />` I have no reason to keep it around (but the node GC will because the store still has a reference to it, and even if it didn't, we can't rely on GC for proper deallocation / cleanup).  But so it sticks around, and the `<Foo />` test runs, and maybe triggers something in the global store, and voila, our jocular friend `<Bar />` chirps up, never one to leave a good party first.

Observe the global state leakage.  Observe how if you run 500+ tests, you're doing to have 500+ dormant components hanging around listening for store events.  Observe how clogged your event loop is going to get with crud. 

Takeaways: 

* Do not mount components that talk to global state in your view tests.  Inject global state with something like a redux container in your app, and test views by passing explicitly passing global state as props into a container's child.  Not only is this easier to reason about (I'm not setting global state in my tests, thus making my tests execution-order dependent), but it largely decouples us from this event leakage.
* Try as best you can to assert views using a shallow rendering technique. 
* If you do need a full DOM to verify the correctness of a component, ensure it is properly unounted at the conclusion of your tests.  
  * One idea would be to write a 'context manager' for a mounted component `mount(<Foo />, (c) => { expect(c)... })` so we can abstract mounting / umounting boilerplate from most tests
  * Another idea is to define a global `afterEach` hook that unmounts a magical array set on `this`: somewhere in your tests say `this._mountPoints.push(componentImFinishedWith)`, `afterEach(() => this._mountPoints.forEach(unmount))`


