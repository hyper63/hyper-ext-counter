<h1 align="center">⚡️ hyper-ext-counter ⚡️</h1>
<p align="center">A hyper-connect extension that increments a counter object in the hyper cache</p>

---

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [CODE OF CONDUCT](#code-of-conduct)
- [LICENSE](#license)
- [CONTRIBUTING](#contributing)
- [ABOUT](#about)

---

## Install

### NodeJS

```sh
npm install hyper-connect
npm install hyper-ext-counter
```

## Deno (using import-map)

```json
{
  "imports": {
    "hyper-connect": "https://x.nest.land/hyper-connect@VERSION/deno/mod.ts",
    "hyper-ext-counter": "https://x.nest.land/hyper-ext-counter@VERSION/deno/mod.ts"
  }
}
```

```sh
deno cache --import-map import_map.json mod.ts
```

---

## Usage

```js
import { connect } from 'hyper-connect'
import { counter } from 'hyper-ext-counter'

// create HYPER=[connection string] env variable
const hyper = counter(connect(process.env.HYPER))

// increment counter
console.log(await hyper.ext.counter.inc('count'))
// get current count
console.log(await hyper.ext.counter.get('count'))
// decrement counter
console.log(await hyper.ext.counter.dec('count'))
// reset to zero
console.log(await hyper.ext.counter.reset('count'))
```


## API

> All functions are promises and take a single argument of string and return Promise<Number> | Promise<Error>
>
> (key: string) => Promise<Number> | Promise<Error>

| command | description | example |
| ------- | ----------- | ------- |
| inc     | increments counter key | `hyper.ext.counter.inc(/* key */ 'count')` |
| dec     | decrements counter key | `hyper.ext.counter.dec(/* key */ 'count')`  |
| get     | reads and returns current count | `hyper.ext.counter.get(/* key */ 'count' )` |
| reset   | resets counter to zero | `hyper.ext.counter.get(/* key */ 'count')` |


## Code of Conduct

SEE [CODE_OF_CONDUCT](/CODE_OF_CONDUCT)

## License

SEE [LICENSE](/LICENSE)

## Contributing

All bug reports and pull requests are welcome that are focused on improving the current scope of this project.

## About

⚡️ hyper-ext-counter is an extension module for hyper-connect a client library for the ⚡️ hyper service. To learn more about ⚡️ hyper go to https://hyper.io 


