[@amandaghassaei/vector-math](../README.md) / Vector3

# Class: Vector3

## Table of contents

### Methods

- [dot](Vector3.md#dot)
- [equals](Vector3.md#equals)
- [set](Vector3.md#set)
- [setFromArray](Vector3.md#setfromarray)
- [fill](Vector3.md#fill)
- [add](Vector3.md#add)
- [sub](Vector3.md#sub)
- [multiplyScalar](Vector3.md#multiplyscalar)
- [divideScalar](Vector3.md#dividescalar)
- [dot](Vector3.md#dot-1)
- [cross](Vector3.md#cross)
- [lengthSq](Vector3.md#lengthsq)
- [length](Vector3.md#length)
- [distanceToSquared](Vector3.md#distancetosquared)
- [distanceTo](Vector3.md#distanceto)
- [normalize](Vector3.md#normalize)
- [applyMatrix4](Vector3.md#applymatrix4)
- [applyMatrix4RotationComponent](Vector3.md#applymatrix4rotationcomponent)
- [applyQuaternion](Vector3.md#applyquaternion)
- [lerp](Vector3.md#lerp)
- [average](Vector3.md#average)
- [min](Vector3.md#min)
- [max](Vector3.md#max)
- [invert](Vector3.md#invert)
- [angleTo](Vector3.md#angleto)
- [angleToNormalized](Vector3.md#angletonormalized)
- [copy](Vector3.md#copy)
- [equals](Vector3.md#equals-1)
- [isZero](Vector3.md#iszero)
- [clone](Vector3.md#clone)
- [toArray](Vector3.md#toarray)

### Constructors

- [constructor](Vector3.md#constructor)

### Properties

- [x](Vector3.md#x)
- [y](Vector3.md#y)
- [z](Vector3.md#z)

## Methods

### dot

▸ `Static` **dot**(`vec1`, `vec2`): `number`

Returns the dot product of two Vector3s.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec1` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | First Vector3. |
| `vec2` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Second Vector3. |

#### Returns

`number`

dot product of vec1 and vec2.

___

### equals

▸ `Static` **equals**(`vec1`, `vec2`): `boolean`

Test if two Vector3s are equal (within numerical tolerance).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec1` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | First Vector3. |
| `vec2` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Second Vector3. |

#### Returns

`boolean`

True if the vectors are equal.

___

### set

▸ **set**(`x`, `y`, `z`): [`Vector3`](Vector3.md)

Set the contents of a Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` | x component. |
| `y` | `number` | y component. |
| `z` | `number` | z component. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### setFromArray

▸ **setFromArray**(`array`): [`Vector3`](Vector3.md)

Set the contents of a Vector3 from an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly [`number`, `number`, `number`] | Array containing x, y, and z components. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### fill

▸ **fill**(`value`): [`Vector3`](Vector3.md)

Fill all components of this Vector3 with the same value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Value to fill all components with. |

#### Returns

[`Vector3`](Vector3.md)

___

### add

▸ **add**(`vec`): [`Vector3`](Vector3.md)

Add a Vector3 to this Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to add. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### sub

▸ **sub**(`vec`): [`Vector3`](Vector3.md)

Subtract a Vector3 from this Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to subtract. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### multiplyScalar

▸ **multiplyScalar**(`scalar`): [`Vector3`](Vector3.md)

Multiply this Vector3 by scalar value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | Scalar to multiply. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### divideScalar

▸ **divideScalar**(`scalar`): [`Vector3`](Vector3.md)

Divide this Vector3 by scalar value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scalar` | `number` | Scalar to divide. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### dot

▸ **dot**(`vec`): `number`

Returns the dot product of this Vector3 with another Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to dot with. |

#### Returns

`number`

dot product of this and vec.

___

### cross

▸ **cross**(`vec`): [`Vector3`](Vector3.md)

Cross this Vector3 with another Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to cross with. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### lengthSq

▸ **lengthSq**(): `number`

Returns the squared length of the Vector3.

#### Returns

`number`

Squared length of the Vector3.

___

### length

▸ **length**(): `number`

Returns the length of the Vector3.

#### Returns

`number`

Length of the Vector3.

___

### distanceToSquared

▸ **distanceToSquared**(`vec`): `number`

Returns the squared distance between this Vector3 and another Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to measure distance to. |

#### Returns

`number`

Squared distance between this and vec.

___

### distanceTo

▸ **distanceTo**(`vec`): `number`

Returns the distance between this Vector3 and another Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to measure distance to. |

#### Returns

`number`

Distance between this and vec.

___

### normalize

▸ **normalize**(): [`Vector3`](Vector3.md)

Normalize the length of this Vector3.

#### Returns

[`Vector3`](Vector3.md)

this

___

### applyMatrix4

▸ **applyMatrix4**(`matrix`): [`Vector3`](Vector3.md)

Apply Matrix4 transformation to this Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`Matrix4Readonly`](../README.md#matrix4readonly) | Matrix4 to apply. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### applyMatrix4RotationComponent

▸ **applyMatrix4RotationComponent**(`matrix`): [`Vector3`](Vector3.md)

Apply Matrix4 rotation component (ignore translation) to this Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`Matrix4Readonly`](../README.md#matrix4readonly) | Matrix4 to apply. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### applyQuaternion

▸ **applyQuaternion**(`quaternion`): [`Vector3`](Vector3.md)

Apply Quaternion transformation to this Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quaternion` | `Quaternion` \| [`QuaternionReadonly`](../README.md#quaternionreadonly) | Quaternion to apply. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### lerp

▸ **lerp**(`vector`, `t`): [`Vector3`](Vector3.md)

Linearly interpolate between this Vector3 and another Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to lerp to. |
| `t` | `number` | Interpolation factor between 0 and 1. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### average

▸ **average**(`vector`): [`Vector3`](Vector3.md)

Average this Vector3 with another Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to average with. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### min

▸ **min**(`vector`): [`Vector3`](Vector3.md)

Min this Vector3 with another Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to min with. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### max

▸ **max**(`vector`): [`Vector3`](Vector3.md)

Max this Vector3 with another Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to max with. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### invert

▸ **invert**(): [`Vector3`](Vector3.md)

Invert this Vector3.

#### Returns

[`Vector3`](Vector3.md)

this

___

### angleTo

▸ **angleTo**(`vector`): `number`

Calculate the angle between this Vector3 and another Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to calculate angle to. |

#### Returns

`number`

Angle between this and vector.

___

### angleToNormalized

▸ **angleToNormalized**(`vector`): `number`

Calculate the angle between this (normalized) Vector3 and another (normalized) Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to calculate angle to. |

#### Returns

`number`

Angle between this and vector.

___

### copy

▸ **copy**(`vec`): [`Vector3`](Vector3.md)

Copy the contents of a Vector3 to this Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to copy. |

#### Returns

[`Vector3`](Vector3.md)

this

___

### equals

▸ **equals**(`vec`): `boolean`

Test if this Vector3 equals another Vector3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vec` | `Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Vector3 to test equality with. |

#### Returns

`boolean`

True if the vectors are equal.

___

### isZero

▸ **isZero**(): `boolean`

Test if this vector is the zero vector.

#### Returns

`boolean`

___

### clone

▸ **clone**(): [`Vector3`](Vector3.md)

Clone this Vector3 into a new Vector3.

#### Returns

[`Vector3`](Vector3.md)

___

### toArray

▸ **toArray**(): [`number`, `number`, `number`]

Returns an array containing the x, y, and z components of this Vector3.

#### Returns

[`number`, `number`, `number`]

## Constructors

### constructor

• **new Vector3**()

• **new Vector3**(`x`, `y`, `z`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

## Properties

### x

• **x**: `number`

___

### y

• **y**: `number`

___

### z

• **z**: `number`
