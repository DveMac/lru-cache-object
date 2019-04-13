const test = require('tape');
const lru = require('./index');

test('it behaves like an object', (t) => {
  const o = lru(10);
  const a = {
    num: 1, str: 'dog', bool: true, obj: { child: 2 },
  };
  Object.assign(o, a);
  Object.entries(a).forEach(([key, value]) => {
    t.same(o[key], value);
  });

  t.same(Object.keys(o), Object.keys(a));
  t.same(Object.values(o), Object.values(a));
  t.same(Object.entries(o), Object.entries(a));

  const keys = [];
  for (const key in o) { // eslint-disable-line
    keys.push(key);
  }
  t.same(keys, Object.keys(a));
  delete o.num;
  t.notOk(o.num);
  t.end();
});

test('it drops oldest field', (t) => {
  const o = lru(2);
  const a = {
    num: 1, str: 'dog', bool: true, obj: { child: 2 },
  };
  Object.assign(o, a);
  t.same(Object.keys(o), ['bool', 'obj']);
  o.frog = 2;
  o.list = [];
  t.same(Object.keys(o), ['frog', 'list']);
  o.frog = 3;
  t.same(Object.keys(o), ['list', 'frog']);
  t.is(o.frog, 3);
  t.end();
});
