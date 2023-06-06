# @amandaghassaei/vector-math
[![NPM Package](https://img.shields.io/npm/v/@amandaghasaei/vector-math)](https://www.npmjs.com/package/@amandaghasaei/vector-math)
[![Build Size](https://img.shields.io/bundlephobia/min/@amandaghasaei/vector-math)](https://bundlephobia.com/result?p=@amandaghasaei/vector-math)
[![NPM Downloads](https://img.shields.io/npm/dw/@amandaghasaei/vector-math)](https://www.npmtrends.com/@amandaghasaei/vector-math)
[![License](https://img.shields.io/npm/l/@amandaghasaei/vector-math)](https://github.com/amandaghassaei/vector-math/blob/main/LICENSE)

A minimal vector math library to handle 2D/3D vector translations/rotations.

- Written in Typescript with exported type declarations.
- Supports some Three.js types as inputs.
- Includes unit tests with 100% coverage.

Table of Contents:

- [Installation](#installation)
- [Use](#use)
- [License](#license)
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
*OR* in the browser you can add [vector-math.js](https://github.com/amandaghassaei/vector-math/blob/main/dist/vector-math.js) or [vector-math.min.js](https://github.com/amandaghassaei/vector-math/blob/main/dist/vector-math.min.js) to your html:
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

This work is distributed under an MIT [license](https://github.com/amandaghassaei/vector-math/blob/main/LICENSE).  It has no dependencies.


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

