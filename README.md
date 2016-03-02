Climb lookup
---

<p align="right">
  <a href="https://npmjs.org/package/climb-lookup">
    <img src="https://img.shields.io/npm/v/climb-lookup.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/59naga/climb-lookup">
    <img src="http://img.shields.io/travis/59naga/climb-lookup.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/climb-lookup/coverage">
    <img src="https://img.shields.io/codeclimate/github/59naga/climb-lookup.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/climb-lookup">
    <img src="https://img.shields.io/codeclimate/coverage/github/59naga/climb-lookup.svg?style=flat-square">
  </a>
  <a href="https://gemnasium.com/59naga/climb-lookup">
    <img src="https://img.shields.io/gemnasium/mathiasbynens/he.svg?style=flat-square">
  </a>
</p>

> a lookup climbing recursively file like a require.

Usage
---

```bash
npm install climb-lookup --save
```

```js
import {lookup, lookupSync, getPaths} from 'climb-lookup';

console.log(lookupSync('package.json')); // /path/to/package.json
```

[API Reference](https://npmcdn.com/climb-lookup/esdoc/index.html)

Why?
---

It may fail to read the configuration file due to `process.cwd()`.

```bash
cd my-project
tree . -L 1
# .
# ├── src
# ├── test
# └── package.json
node -e "require(process.cwd()+'/package.json')" # ok

cd test
node -e "require(process.cwd()+'/package.json')" # Error: Cannot find module './test/package.json'
```

`climb-lookup` is lookup climbing recursively file, like a `require`.

```bash
cd my-project
tree . -L 1
# .
# ├── src
# ├── test
# └── package.json
node -e "require(require('climb-lookup').lookupSync('package.json'))" # ok

cd test
node -e "require(require('climb-lookup').lookupSync('package.json'))" # ok
```

Test
---
```bash
git clone https://github.com/59naga/climb-lookup.git
cd climb-lookup

npm install
npm test
```

License
---
[MIT](http://59naga.mit-license.org/)