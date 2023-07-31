[@amandaghassaei/vector-math](../README.md) / Vector3

# Class: Vector3

## Table of contents

### Constructors

- [constructor](Vector3.md#constructor)

### Properties

- [x](Vector3.md#x)
- [y](Vector3.md#y)
- [z](Vector3.md#z)

### Methods

- [set](Vector3.md#set)
- [setFromArray](Vector3.md#setfromarray)
- [add](Vector3.md#add)
- [sub](Vector3.md#sub)
- [multiplyScalar](Vector3.md#multiplyscalar)
- [divideScalar](Vector3.md#dividescalar)
- [dot](Vector3.md#dot)
- [cross](Vector3.md#cross)
- [lengthSq](Vector3.md#lengthsq)
- [length](Vector3.md#length)
- [normalize](Vector3.md#normalize)
- [applyMatrix4](Vector3.md#applymatrix4)
- [applyMatrix4RotationComponent](Vector3.md#applymatrix4rotationcomponent)
- [applyQuaternion](Vector3.md#applyquaternion)
- [lerp](Vector3.md#lerp)
- [average](Vector3.md#average)
- [invert](Vector3.md#invert)
- [copy](Vector3.md#copy)
- [equals](Vector3.md#equals)
- [isZero](Vector3.md#iszero)
- [clone](Vector3.md#clone)
- [toArray](Vector3.md#toarray)

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

## Methods

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

___

### lengthSq

▸ **lengthSq**(): `number`

Returns the squared length of the Vector3.

#### Returns

`number`

___

### length

▸ **length**(): `number`

Returns the length of the Vector3.

#### Returns

`number`

___

### normalize

▸ **normalize**(): [`Vector3`](Vector3.md)

Normalize the length of this Vector3.

#### Returns

[`Vector3`](Vector3.md)

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

### invert

▸ **invert**(): [`Vector3`](Vector3.md)

Invert this Vector3.

#### Returns

[`Vector3`](Vector3.md)

this

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
