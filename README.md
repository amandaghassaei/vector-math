# @amandaghassaei/vector-math
[![NPM Package](https://img.shields.io/npm/v/@amandaghassaei/vector-math)](https://www.npmjs.com/package/@amandaghassaei/vector-math)
[![Build Size](https://img.shields.io/bundlephobia/min/@amandaghassaei/vector-math)](https://bundlephobia.com/result?p=@amandaghassaei/vector-math)
[![NPM Downloads](https://img.shields.io/npm/dw/@amandaghassaei/vector-math)](https://www.npmtrends.com/@amandaghassaei/vector-math)
[![License](https://img.shields.io/npm/l/@amandaghassaei/vector-math)](https://github.com/amandaghassaei/vector-math/blob/main/LICENSE)
![](https://img.shields.io/badge/Coverage-99%25-83A603.svg?prefix=$coverage$)

A minimal vector math library to handle 2D/3D translations and rotations.

- Written in Typescript with exported type declarations.
- Supports [Three.js's](https://github.com/mrdoob/three.js) Vector2, Vector3, and Quaternion types as inputs.
- Includes readonly class types.
- Includes unit tests with 100% coverage.

Table of Contents:

- [Installation](#installation)
- [Use](#use)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Development](#development)

## Installation

### Install via NPM

```sh
npm install @amandaghassaei/vector-math
```
Then import via:
```js
import { Vector2 } from '@amandaghassaei/vector-math';
```

### Install as JS
*OR* in the browser you can add [bundle/vector-math.js](https://github.com/amandaghassaei/vector-math/blob/main/bundle/vector-math.js) or [bundle/vector-math.min.js](https://github.com/amandaghassaei/vector-math/blob/main/bundle/vector-math.min.js) to your html:
```html
<html>
    <head>
        ....
        <script src="vector-math.min.js"></script>
    </head>
    <body>
    </body>
</html>
```
Then in your js files, you can access the global variable `VECTOR_MATH`:

```js
const { Vector2 } = VECTOR_MATH;
```

## Use

See full API documentation in [docs/](https://github.com/amandaghassaei/vector-math/tree/main/docs).


## License

This work is distributed under an [MIT license](https://github.com/amandaghassaei/vector-math/blob/main/LICENSE).  It has no dependencies.


## Acknowledgments

Most of this library has been ported from [Three.js's source code](https://github.com/mrdoob/three.js).


## Development

Feel free to submit pull requests pertaining to bugs or type issues, but I probably won't want to expand the functionality of this library much beyond where it is currently.  There are other libraries out there that cover a wider range of linear algebra functions and types, this library is meant to be small and bounded in its scope.

Install dev-dependencies:

```sh
npm install
```

Build from `src` to `dist` and compile docs:

```sh
npm run build
```

Test with code coverage:

```sh
npm run test-with-coverage
```

