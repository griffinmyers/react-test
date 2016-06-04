# react-test

Minimum Viable Test Case for the dangers of global state singletons.

#### Running

```bash
npm install
npm test
```

Herein find three components: `<Foo />`, `<Bar />`, and `<Baz />`.  It is
imperative we verify their correctness with good tests. Unfortunately they rely
on a global state singleton (like a *store*) and have life-cycle methods to keep
synchronized.

We test `<Foo />` by mounting with enzyme's `mount()`.  Unfortunately each time
we mount a `<Foo />` we don't unmount it, and because it hasn't cleaned up its
handlers with the global store, it will sit around for all time receiving store
broadcasts (and maintaining references that prohibit it from being collected).

We test `<Bar />` with React's TestUtils and see the same behavior.  In fact,
when we test `<Bar />`s connection to the global store, we still see `<Foo />`s
incoming store messages being logged to the console. Not great.

On the other hand, `<Baz />` is mounted via `safeMount`, a simple context
manager that will handle mounting and unmounting for both synchronous and
asynchronous assertions.

While unit-testing a component that depends on global-state seems like an
anti-pattern, I have no doubt it exists in the wild, and I have no doubt that
this problem is silently waiting to rear its head as code bases add more and
more tests.  They'll wonder why their tests come to a crawl towards the end
of the suite, and why their asynchronous tests spuriously time out (their event
loop is being clogged by useless store broadcasts to dead components).  This is
an idea for a simple interface to a) make it more convenient to test the entire
life-cycle of a component and b) raise awareness about an issue anyone fully
mounting their components should be aware of.
