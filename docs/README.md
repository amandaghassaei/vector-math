@amandaghassaei/vector-math

# @amandaghassaei/vector-math

## Table of contents

### Type Aliases

- [Matrix3Readonly](README.md#matrix3readonly)
- [Matrix4Readonly](README.md#matrix4readonly)
- [QuaternionReadonly](README.md#quaternionreadonly)
- [Vector2Readonly](README.md#vector2readonly)
- [Vector3Readonly](README.md#vector3readonly)

### Classes

- [Matrix3](classes/Matrix3.md)
- [Matrix4](classes/Matrix4.md)
- [Quaternion](classes/Quaternion.md)
- [Vector2](classes/Vector2.md)
- [Vector3](classes/Vector3.md)

### Functions

- [clampValue](README.md#clampvalue)
- [radiansToDegrees](README.md#radianstodegrees)
- [degreesToRadians](README.md#degreestoradians)
- [roundValueToIncrement](README.md#roundvaluetoincrement)
- [setNumericalTolerance](README.md#setnumericaltolerance)

### Variables

- [DEFAULT\_NUMERICAL\_TOLERANCE](README.md#default_numerical_tolerance)

## Type Aliases

### Matrix3Readonly

Ƭ **Matrix3Readonly**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `elements` | readonly `number`[] |
| `isIdentity` | `boolean` |
| `equals` | (`matrix`: [`Matrix3Readonly`](README.md#matrix3readonly)) => `boolean` |
| `clone` | () => [`Matrix3`](classes/Matrix3.md) |

___

### Matrix4Readonly

Ƭ **Matrix4Readonly**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `elements` | readonly `number`[] |
| `isIdentity` | `boolean` |
| `equals` | (`matrix`: [`Matrix4Readonly`](README.md#matrix4readonly)) => `boolean` |
| `clone` | () => [`Matrix4`](classes/Matrix4.md) |

___

### QuaternionReadonly

Ƭ **QuaternionReadonly**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |
| `w` | `number` |
| `lengthSq` | () => `number` |
| `length` | () => `number` |
| `clone` | () => [`Quaternion`](classes/Quaternion.md) |

___

### Vector2Readonly

Ƭ **Vector2Readonly**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `dot` | (`vec`: [`Vector2Readonly`](README.md#vector2readonly) \| `THREE_Vector2`) => `number` |
| `cross` | (`vec`: [`Vector2Readonly`](README.md#vector2readonly) \| `THREE_Vector2`) => `number` |
| `angle` | () => `number` |
| `lengthSq` | () => `number` |
| `length` | () => `number` |
| `distanceToSquared` | (`vec`: [`Vector2Readonly`](README.md#vector2readonly) \| `THREE_Vector2`) => `number` |
| `distanceTo` | (`vec`: [`Vector2Readonly`](README.md#vector2readonly) \| `THREE_Vector2`) => `number` |
| `angleTo` | (`vec`: [`Vector2Readonly`](README.md#vector2readonly) \| `THREE_Vector2`) => `number` |
| `angleToNormalized` | (`vec`: [`Vector2Readonly`](README.md#vector2readonly) \| `THREE_Vector2`) => `number` |
| `equals` | (`vec`: [`Vector2Readonly`](README.md#vector2readonly) \| `THREE_Vector2`) => `boolean` |
| `isZero` | () => `boolean` |
| `clone` | () => [`Vector2`](classes/Vector2.md) |
| `toArray` | () => [`number`, `number`] |

___

### Vector3Readonly

Ƭ **Vector3Readonly**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |
| `dot` | (`vec`: [`Vector3Readonly`](README.md#vector3readonly) \| `THREE_Vector3`) => `number` |
| `lengthSq` | () => `number` |
| `length` | () => `number` |
| `distanceToSquared` | (`vec`: [`Vector3Readonly`](README.md#vector3readonly) \| `THREE_Vector3`) => `number` |
| `distanceTo` | (`vec`: [`Vector3Readonly`](README.md#vector3readonly) \| `THREE_Vector3`) => `number` |
| `angleTo` | (`vec`: [`Vector3Readonly`](README.md#vector3readonly) \| `THREE_Vector3`) => `number` |
| `angleToNormalized` | (`vec`: [`Vector3Readonly`](README.md#vector3readonly) \| `THREE_Vector3`) => `number` |
| `equals` | (`vec`: [`Vector3Readonly`](README.md#vector3readonly) \| `THREE_Vector3`) => `boolean` |
| `isZero` | () => `boolean` |
| `clone` | () => [`Vector3`](classes/Vector3.md) |
| `toArray` | () => [`number`, `number`, `number`] |

## Functions

### clampValue

▸ **clampValue**(`value`, `min`, `max`): `number`

Clamp a value between a minimum and maximum value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value to clamp. |
| `min` | `number` | The minimum value. |
| `max` | `number` | The maximum value. |

#### Returns

`number`

The clamped value.

___

### radiansToDegrees

▸ **radiansToDegrees**(`value`): `number`

Convert a value in radians to degrees.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value in radians. |

#### Returns

`number`

The value in degrees.

___

### degreesToRadians

▸ **degreesToRadians**(`value`): `number`

Convert a value in degrees to radians.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value in degrees. |

#### Returns

`number`

The value in radians.

___

### roundValueToIncrement

▸ **roundValueToIncrement**(`value`, `coarseStep`): `number`

Round value to increment, if increment is 0, return value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The value to round. |
| `coarseStep` | `number` | The increment to round to. |

#### Returns

`number`

The rounded value.

___

### setNumericalTolerance

▸ **setNumericalTolerance**(`tolerance`): `void`

Set global numerical tolerance for all mathematical operations and equality checks.
Default numerical tolerance is 1e-15.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tolerance` | `number` | Numerical tolerance to set. |

#### Returns

`void`

## Variables

### DEFAULT\_NUMERICAL\_TOLERANCE

• `Const` **DEFAULT\_NUMERICAL\_TOLERANCE**: ``1e-15``

Default numerical tolerance for all mathematical operations and equality checks.
