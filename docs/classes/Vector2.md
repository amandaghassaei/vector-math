[@amandaghassaei/vector-math](../README.md) / Vector2

# Class: Vector2

## Table of contents

### Constructors

- [constructor](Vector2.md#constructor)

### Properties

- [x](Vector2.md#x)
- [y](Vector2.md#y)

### Methods

- [set](Vector2.md#set)
- [setFromArray](Vector2.md#setfromarray)
- [add](Vector2.md#add)
- [sub](Vector2.md#sub)
- [multiplyScalar](Vector2.md#multiplyscalar)
- [divideScalar](Vector2.md#dividescalar)
- [dot](Vector2.md#dot)
- [cross](Vector2.md#cross)
- [angle](Vector2.md#angle)
- [lengthSq](Vector2.md#lengthsq)
- [length](Vector2.md#length)
- [distanceToSquared](Vector2.md#distancetosquared)
- [distanceTo](Vector2.md#distanceto)
- [normalize](Vector2.md#normalize)
- [applyMatrix3](Vector2.md#applymatrix3)
- [lerp](Vector2.md#lerp)
- [average](Vector2.md#average)
- [min](Vector2.md#min)
- [max](Vector2.md#max)
- [invert](Vector2.md#invert)
- [angleTo](Vector2.md#angleto)
- [angleToNormalized](Vector2.md#angletonormalized)
- [copy](Vector2.md#copy)
- [equals](Vector2.md#equals)
- [isZero](Vector2.md#iszero)
- [clone](Vector2.md#clone)
- [toArray](Vector2.md#toarray)

## Constructors

### constructor

• **new Vector2**()

• **new Vector2**(`x`, `y`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

## Properties

### x

• **x**: `number`

___

### y

• **y**: `number`

## Methods

### set

▸ **set**(`x`, `y`): [`Vector2`](Vector2.md)

Set the contents of a Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | x component. |
| `y` | `number` | y component. |

#### Returns

[`Vector2`](Vector2.md)

this

___

### setFromArray

▸ **setFromArray**(`array`): [`Vector2`](Vector2.md)

Set the contents of a Vector3 from an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly [`number`, `number`] | Array containing x, and y components. |

#### Returns

[`Vector2`](Vector2.md)

this

___

### add

▸ **add**(`vec`): [`Vector2`](Vector2.md)

Add a Vector2 to this Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to add. |

#### Returns

[`Vector2`](Vector2.md)

this

___

### sub

▸ **sub**(`vec`): [`Vector2`](Vector2.md)

Subtract a Vector2 from this Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to subtract. |

#### Returns

[`Vector2`](Vector2.md)

this

___

### multiplyScalar

▸ **multiplyScalar**(`scalar`): [`Vector2`](Vector2.md)

Multiply this Vector2 by scalar value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | Scalar to multiply. |

#### Returns

[`Vector2`](Vector2.md)

this

___

### divideScalar

▸ **divideScalar**(`scalar`): [`Vector2`](Vector2.md)

Divide this Vector2 by scalar value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | Scalar to divide. |

#### Returns

[`Vector2`](Vector2.md)

this

___

### dot

▸ **dot**(`vec`): `number`

Returns the dot product of this Vector2 with another Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to dot with. |

#### Returns

`number`

The dot product.

___

### cross

▸ **cross**(`vec`): `number`

Compute the 2D cross product (wedge product) with another Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to cross. |

#### Returns

`number`

The cross product.

___

### angle

▸ **angle**(): `number`

Get the angle of this Vector2.
Computes the angle in radians with respect to the positive x-axis.
Angle is always in range [0, 2 * Math.PI] (and 2 * Math.PI is slightly less than 2 * PI).

#### Returns

`number`

The angle.

___

### lengthSq

▸ **lengthSq**(): `number`

Returns the squared length of the Vector2.

#### Returns

`number`

The squared length.

___

### length

▸ **length**(): `number`

Returns the length of the Vector2.

#### Returns

`number`

The length.

___

### distanceToSquared

▸ **distanceToSquared**(`vec`): `number`

Returns the squared distance between this Vector2 and another Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to measure distance to. |

#### Returns

`number`

The squared distance.

___

### distanceTo

▸ **distanceTo**(`vec`): `number`

Returns the distance between this Vector2 and another Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to measure distance to. |

#### Returns

`number`

The distance.

___

### normalize

▸ **normalize**(): [`Vector2`](Vector2.md)

Normalize the length of this Vector2.

#### Returns

[`Vector2`](Vector2.md)

this

___

### applyMatrix3

▸ **applyMatrix3**(`matrix`): [`Vector2`](Vector2.md)

Apply Matrix3 transformation to this Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`Matrix3Readonly`](../README.md#matrix3readonly) | Matrix3 to apply. |

#### Returns

[`Vector2`](Vector2.md)

this

___

### lerp

▸ **lerp**(`vector`, `t`): [`Vector2`](Vector2.md)

Linearly interpolate between this Vector2 and another Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to lerp to. |
| `t` | `number` | Interpolation factor between 0 and 1. |

#### Returns

[`Vector2`](Vector2.md)

this

___

### average

▸ **average**(`vector`): [`Vector2`](Vector2.md)

Average this Vector2 with another Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to average with. |

#### Returns

[`Vector2`](Vector2.md)

this

___

### min

▸ **min**(`vector`): [`Vector2`](Vector2.md)

Min this Vector3 with another Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector3 to min with. |

#### Returns

[`Vector2`](Vector2.md)

this

___

### max

▸ **max**(`vector`): [`Vector2`](Vector2.md)

Max this Vector2 with another Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to max with. |

#### Returns

[`Vector2`](Vector2.md)

this

___

### invert

▸ **invert**(): [`Vector2`](Vector2.md)

Invert this Vector2.

#### Returns

[`Vector2`](Vector2.md)

this

___

### angleTo

▸ **angleTo**(`vector`): `number`

Calculate the angle between this Vector2 and another Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to calculate angle to. |

#### Returns

`number`

The angle between the vectors.

___

### angleToNormalized

▸ **angleToNormalized**(`vector`): `number`

Calculate the angle between this (normalized) Vector2 and another (normalized) Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to calculate angle to. |

#### Returns

`number`

The angle between the vectors.

___

### copy

▸ **copy**(`vec`): [`Vector2`](Vector2.md)

Copy the contents of a Vector2 to this Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to copy. |

#### Returns

[`Vector2`](Vector2.md)

this

___

### equals

▸ **equals**(`vec`): `boolean`

Test if this Vector2 equals another Vector2.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Vector2 to test equality with. |

#### Returns

`boolean`

True if the vectors are equal.

___

### isZero

▸ **isZero**(): `boolean`

Test if this vector is the zero vector.

#### Returns

`boolean`

True if the vector is the zero vector.

___

### clone

▸ **clone**(): [`Vector2`](Vector2.md)

Clone this Vector2 into a new Vector2.

#### Returns

[`Vector2`](Vector2.md)

The cloned Vector2.

___

### toArray

▸ **toArray**(): [`number`, `number`]

Returns an array containing the x and y components of this Vector3.

#### Returns

[`number`, `number`]

The Vector2 as an array.
