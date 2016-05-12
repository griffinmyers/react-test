# react-test

Minimum Viable Test Case for the dangers of global state singletons. 

#### Running

```bash
npm install
npm test
```

Observe the global leakage.  Observe how if you run 500+ tests, you're doing to have 500+ dormant components hanging around listening for store events.
