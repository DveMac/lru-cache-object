const LRU = require('lru-cache');

const toJSON = (lru) => {
  const json = {};
  lru.forEach((value, key) => {
    json[key] = value;
  });
  return json;
};

module.exports = function lru(o) {
  return new Proxy(new LRU(o), {
    get: (target, prop) => ((prop === 'toJSON') ? () => toJSON(target) : target.get(prop)),
    set: (target, prop, value) => target.set(prop, value),
    ownKeys: target => target.keys().reverse(),
    has: (target, key) => target.has(key),
    getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true }),
    deleteProperty: (target, prop) => target.del(prop),
  });
};
