[@amandaghassaei/vector-math](../README.md) / Matrix4

# Class: Matrix4

These Matrix4s represent a rigid transform in homogeneous coords,
therefore, we assume that the bottom row is [0, 0, 0, 1] and only store 12 elements.

## Table of contents

### Constructors

- [constructor](Matrix4.md#constructor)

### Accessors

- [elements](Matrix4.md#elements)
- [isIdentity](Matrix4.md#isidentity)

### Methods

- [setIdentity](Matrix4.md#setidentity)
- [premultiplyMatrix4](Matrix4.md#premultiplymatrix4)
- [multiplyMatrix4](Matrix4.md#multiplymatrix4)
- [setTranslation](Matrix4.md#settranslation)
- [setRotationAxisAngleAtOffset](Matrix4.md#setrotationaxisangleatoffset)
- [setRotationFromVectorToVector](Matrix4.md#setrotationfromvectortovector)
- [setReflectionNormalAtOffset](Matrix4.md#setreflectionnormalatoffset)
- [invertTransform](Matrix4.md#inverttransform)
- [equals](Matrix4.md#equals)
- [copy](Matrix4.md#copy)
- [clone](Matrix4.md#clone)

## Constructors

### constructor

• **new Matrix4**()

If no elements passed in, defaults to identity matrix.

• **new Matrix4**(`n11`, `n12`, `n13`, `n14`, `n21`, `n22`, `n23`, `n24`, `n31`, `n32`, `n33`, `n34`, `isIdentity?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n11` | `number` |
| `n12` | `number` |
| `n13` | `number` |
| `n14` | `number` |
| `n21` | `number` |
| `n22` | `number` |
| `n23` | `number` |
| `n24` | `number` |
| `n31` | `number` |
| `n32` | `number` |
| `n33` | `number` |
| `n34` | `number` |
| `isIdentity?` | `boolean` |

## Accessors

### elements

• `get` **elements**(): readonly `number`[]

Returns elements of Matrix4.

#### Returns

readonly `number`[]

___

### isIdentity

• `get` **isIdentity**(): `boolean`

Returns whether Matrix4 is the identity matrix.

#### Returns

`boolean`

## Methods

### setIdentity

▸ **setIdentity**(): [`Matrix4`](Matrix4.md)

Set this Matrix4 to the identity matrix.

#### Returns

[`Matrix4`](Matrix4.md)

this

___

### premultiplyMatrix4

▸ **premultiplyMatrix4**(`matrix`): [`Matrix4`](Matrix4.md)

In place matrix multiplication of this Matrix4 (A) with another Matrix4 (B).
Sets value of this Matrix4 to B*A.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`Matrix4Readonly`](../README.md#matrix4readonly) | Matrix4 to multiply with. |

#### Returns

[`Matrix4`](Matrix4.md)

this

___

### multiplyMatrix4

▸ **multiplyMatrix4**(`matrix`): [`Matrix4`](Matrix4.md)

In place matrix multiplication of this Matrix4 (A) with another Matrix4 (B).
Sets value of this Matrix4 to A*B.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`Matrix4Readonly`](../README.md#matrix4readonly) | Matrix4 to multiply with. |

#### Returns

[`Matrix4`](Matrix4.md)

___

### setTranslation

▸ **setTranslation**(`translation`): [`Matrix4`](Matrix4.md)

Set elements of Matrix4 according to translation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `translation` | `THREE_Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Translation vector. |

#### Returns

[`Matrix4`](Matrix4.md)

this

___

### setRotationAxisAngleAtOffset

▸ **setRotationAxisAngleAtOffset**(`axis`, `angle`, `offset?`): [`Matrix4`](Matrix4.md)

Set elements of Matrix4 according to rotation about axis.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axis` | `THREE_Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Unit vector around which to rotate, must be normalized. |
| `angle` | `number` | Angle of rotation in radians. |
| `offset?` | `THREE_Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Offset vector. |

#### Returns

[`Matrix4`](Matrix4.md)

this

___

### setRotationFromVectorToVector

▸ **setRotationFromVectorToVector**(`fromVector`, `toVector`, `offset?`): [`Matrix4`](Matrix4.md)

Set elements of Matrix4 according to rotation from one vector to another.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromVector` | `THREE_Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Unit vector to rotate from, must be normalized. |
| `toVector` | `THREE_Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Unit vector to rotate to, must be normalized. |
| `offset?` | `THREE_Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | - |

#### Returns

[`Matrix4`](Matrix4.md)

this

___

### setReflectionNormalAtOffset

▸ **setReflectionNormalAtOffset**(`normal`, `offset?`): [`Matrix4`](Matrix4.md)

Set elements of Matrix4 according to reflection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `normal` | `THREE_Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Unit vector about which to reflect, must be normalized. |
| `offset?` | `THREE_Vector3` \| [`Vector3Readonly`](../README.md#vector3readonly) | Offset vector of reflection. |

#### Returns

[`Matrix4`](Matrix4.md)

this

___

### invertTransform

▸ **invertTransform**(): [`Matrix4`](Matrix4.md)

Invert the current transform.
https://math.stackexchange.com/questions/1234948/inverse-of-a-rigid-transformation

#### Returns

[`Matrix4`](Matrix4.md)

this

___

### equals

▸ **equals**(`matrix`): `boolean`

Test if this Matrix4 equals another Matrix4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`Matrix4Readonly`](../README.md#matrix4readonly) | Matrix4 to test equality with. |

#### Returns

`boolean`

___

### copy

▸ **copy**(`matrix`): [`Matrix4`](Matrix4.md)

Copy values from a Matrix4 into this Matrix4.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`Matrix4Readonly`](../README.md#matrix4readonly) | Matrix4 to copy. |

#### Returns

[`Matrix4`](Matrix4.md)

this

___

### clone

▸ **clone**(): [`Matrix4`](Matrix4.md)

Returns a deep copy of this Matrix4.

#### Returns

[`Matrix4`](Matrix4.md)
