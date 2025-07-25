[@amandaghassaei/vector-math](../README.md) / Quaternion

# Class: Quaternion

## Table of contents

### Constructors

- [constructor](Quaternion.md#constructor)

### Accessors

- [x](Quaternion.md#x)
- [y](Quaternion.md#y)
- [z](Quaternion.md#z)
- [w](Quaternion.md#w)

### Methods

- [setFromUnitVectors](Quaternion.md#setfromunitvectors)
- [lengthSq](Quaternion.md#lengthsq)
- [length](Quaternion.md#length)
- [normalize](Quaternion.md#normalize)
- [multiply](Quaternion.md#multiply)
- [premultiply](Quaternion.md#premultiply)
- [invert](Quaternion.md#invert)
- [copy](Quaternion.md#copy)
- [clone](Quaternion.md#clone)

## Constructors

### constructor

• **new Quaternion**()

• **new Quaternion**(`x`, `y`, `z`, `w`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |
| `w` | `number` |

## Accessors

### x

• `get` **x**(): `number`

#### Returns

`number`

The x component of the Quaternion.

___

### y

• `get` **y**(): `number`

#### Returns

`number`

The y component of the Quaternion.

___

### z

• `get` **z**(): `number`

#### Returns

`number`

The z component of the Quaternion.

___

### w

• `get` **w**(): `number`

#### Returns

`number`

The w component of the Quaternion.

## Methods

### setFromUnitVectors

▸ **setFromUnitVectors**(`vFrom`, `vTo`): [`Quaternion`](Quaternion.md)

Set quaternion from two unit vectors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vFrom` | `THREE_Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | From unit vector (normalized). |
| `vTo` | `THREE_Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | To unit vector (normalized). |

#### Returns

[`Quaternion`](Quaternion.md)

this

___

### lengthSq

▸ **lengthSq**(): `number`

Returns the squared length of the Quaternion.

#### Returns

`number`

___

### length

▸ **length**(): `number`

Returns the length of the Quaternion.

#### Returns

`number`

___

### normalize

▸ **normalize**(): [`Quaternion`](Quaternion.md)

Normalize the length of this Quaternion.

#### Returns

[`Quaternion`](Quaternion.md)

this

___

### multiply

▸ **multiply**(`quat`): [`Quaternion`](Quaternion.md)

In place quaternion multiplication of this Quaternion (A) with another Quaternion (B).
Sets value of this Quaternion to A*B.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quat` | `THREE_Quaternion` \| [`QuaternionReadonly`](../README.md#quaternionreadonly) | Quaternion to multiply with. |

#### Returns

[`Quaternion`](Quaternion.md)

this

___

### premultiply

▸ **premultiply**(`quat`): [`Quaternion`](Quaternion.md)

In place quaternion multiplication of this Quaternion (A) with another Quaternion (B).
Sets value of this Quaternion to B*A.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quat` | `THREE_Quaternion` \| [`QuaternionReadonly`](../README.md#quaternionreadonly) | Quaternion to premultiply with. |

#### Returns

[`Quaternion`](Quaternion.md)

this

___

### invert

▸ **invert**(): [`Quaternion`](Quaternion.md)

Invert this Quaternion.

#### Returns

[`Quaternion`](Quaternion.md)

this

___

### copy

▸ **copy**(`quaternion`): [`Quaternion`](Quaternion.md)

Copy the contents of a Quaternion to this Quaternion.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quaternion` | `THREE_Quaternion` \| [`QuaternionReadonly`](../README.md#quaternionreadonly) | Quaternion to copy. |

#### Returns

[`Quaternion`](Quaternion.md)

this

___

### clone

▸ **clone**(): [`Quaternion`](Quaternion.md)

Clone this Quaternion into a new Quaternion.

#### Returns

[`Quaternion`](Quaternion.md)
