[@amandaghassaei/vector-math](../README.md) / Matrix3

# Class: Matrix3

These Matrix3s represent a rigid transform in homogeneous coords,
therefore, we assume that the bottom row is [0, 0, 1] and only store 6 elements.

## Table of contents

### Constructors

- [constructor](Matrix3.md#constructor)

### Accessors

- [elements](Matrix3.md#elements)
- [isIdentity](Matrix3.md#isidentity)

### Methods

- [setIdentity](Matrix3.md#setidentity)
- [setFromRotationTranslation](Matrix3.md#setfromrotationtranslation)
- [equals](Matrix3.md#equals)
- [copy](Matrix3.md#copy)
- [clone](Matrix3.md#clone)

## Constructors

### constructor

• **new Matrix3**()

If no elements passed in, defaults to identity matrix.

• **new Matrix3**(`n11`, `n12`, `n13`, `n21`, `n22`, `n23`, `isIdentity?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n11` | `number` |
| `n12` | `number` |
| `n13` | `number` |
| `n21` | `number` |
| `n22` | `number` |
| `n23` | `number` |
| `isIdentity?` | `boolean` |

## Accessors

### elements

• `get` **elements**(): readonly `number`[]

Returns elements of Matrix3.

#### Returns

readonly `number`[]

___

### isIdentity

• `get` **isIdentity**(): `boolean`

Returns whether Matrix3 is the identity matrix.

#### Returns

`boolean`

## Methods

### setIdentity

▸ **setIdentity**(): [`Matrix3`](Matrix3.md)

Set this Matrix4 to the identity matrix.

#### Returns

[`Matrix3`](Matrix3.md)

this

___

### setFromRotationTranslation

▸ **setFromRotationTranslation**(`angle`, `translation`): [`Matrix3`](Matrix3.md)

Set elements of Matrix4 according to rotation and translation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `angle` | `number` | Angle of rotation in radians. |
| `translation` | `Vector2` \| [`Vector2Readonly`](../README.md#vector2readonly) | Translation offset. |

#### Returns

[`Matrix3`](Matrix3.md)

this

___

### equals

▸ **equals**(`matrix`): `boolean`

Test if this Matrix3 equals another Matrix3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`Matrix3Readonly`](../README.md#matrix3readonly) | Matrix3 to test equality with. |

#### Returns

`boolean`

___

### copy

▸ **copy**(`matrix`): [`Matrix3`](Matrix3.md)

Copy values from a Matrix3 into this Matrix3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matrix` | [`Matrix3Readonly`](../README.md#matrix3readonly) | Matrix3 to copy. |

#### Returns

[`Matrix3`](Matrix3.md)

this

___

### clone

▸ **clone**(): [`Matrix3`](Matrix3.md)

Returns a deep copy of this Matrix3.

#### Returns

[`Matrix3`](Matrix3.md)
