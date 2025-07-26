/**
 * Default numerical tolerance for all mathematical operations and equality checks.
 */
declare const DEFAULT_NUMERICAL_TOLERANCE = 1e-15;
/**
 * Set global numerical tolerance for all mathematical operations and equality checks.
 * Default numerical tolerance is 1e-15.
 * @param tolerance - Numerical tolerance to set.
 */
declare function setNumericalTolerance(tolerance: number): void;

/**
 * Clamp a value between a minimum and maximum value.
 * @param value - The value to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
declare function clampValue(value: number, min: number, max: number): number;
/**
 * Convert a value in radians to degrees.
 * @param value - The value in radians.
 * @returns The value in degrees.
 */
declare function radiansToDegrees(value: number): number;
/**
 * Convert a value in degrees to radians.
 * @param value - The value in degrees.
 * @returns The value in radians.
 */
declare function degreesToRadians(value: number): number;
/**
 * Round value to increment, if increment is 0, return value.
 * @param value - The value to round.
 * @param coarseStep - The increment to round to.
 * @returns The rounded value.
 */
declare function roundValueToIncrement(value: number, coarseStep: number): number;

type THREE_Vector2 = {
    x: number;
    y: number;
};
type THREE_Vector3 = {
    x: number;
    y: number;
    z: number;
};
type THREE_Quaternion = {
    x: number;
    y: number;
    z: number;
    w: number;
};

type Matrix3Readonly = {
    readonly elements: readonly number[];
    readonly isIdentity: boolean;
    equals: (matrix: Matrix3Readonly) => boolean;
    clone: () => Matrix3;
};
/**
 * These Matrix3s represent a rigid transform in homogeneous coords,
 * therefore, we assume that the bottom row is [0, 0, 1] and only store 6 elements.
 */
declare class Matrix3 {
    private readonly _elements;
    private _isIdentity;
    /**
     * If no elements passed in, defaults to identity matrix.
     */
    constructor();
    constructor(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, isIdentity?: boolean);
    /**
     * @private
     */
    set elements(elements: readonly number[]);
    /**
     * Returns elements of Matrix3.
     */
    get elements(): readonly number[];
    /**
     * @private
     */
    set isIdentity(isIdentity: boolean);
    /**
     * Returns whether Matrix3 is the identity matrix.
     */
    get isIdentity(): boolean;
    /**
     * Set values element-wise.
     */
    private _set;
    /**
     * Set this Matrix4 to the identity matrix.
     * @returns this
     */
    setIdentity(): this;
    private static _checkElementForIdentity;
    /**
     * Set elements of Matrix3 according to rotation.
     * @param angle - Angle of rotation in radians.
     * @returns this
     */
    setRotation(angle: number): this;
    /**
     * Set elements of Matrix3 according to translation.
     * @param translation - Translation vector.
     * @returns this
     */
    setTranslation(translation: Vector2Readonly | THREE_Vector2): this;
    /**
     * Set elements of Matrix4 according to rotation and translation.
     * @param angle - Angle of rotation in radians.
     * @param translation - Translation vector.
     * @returns this
     */
    setRotationTranslation(angle: number, translation: Vector2Readonly | THREE_Vector2): this;
    /**
     * Test if this Matrix3 equals another Matrix3.
     * @param matrix - Matrix3 to test equality with.
     * @returns
     */
    equals(matrix: Matrix3Readonly): boolean;
    /**
     * Copy values from a Matrix3 into this Matrix3.
     * @param matrix - Matrix3 to copy.
     * @returns this
     */
    copy(matrix: Matrix3Readonly): this;
    /**
     * Returns a deep copy of this Matrix3.
     */
    clone(): Matrix3;
}

type Vector2Readonly = {
    readonly x: number;
    readonly y: number;
    dot: (vec: Vector2Readonly | THREE_Vector2) => number;
    cross: (vec: Vector2Readonly | THREE_Vector2) => number;
    angle: () => number;
    lengthSq: () => number;
    length: () => number;
    distanceToSquared: (vec: Vector2Readonly | THREE_Vector2) => number;
    distanceTo: (vec: Vector2Readonly | THREE_Vector2) => number;
    angleTo: (vec: Vector2Readonly | THREE_Vector2) => number;
    angleToNormalized: (vec: Vector2Readonly | THREE_Vector2) => number;
    equals: (vec: Vector2Readonly | THREE_Vector2) => boolean;
    isZero: () => boolean;
    clone: () => Vector2;
    toArray: () => [number, number];
};
declare class Vector2 {
    x: number;
    y: number;
    /**
     * @param x - Defaults to 0.
     * @param y - Defaults to 0.
     */
    constructor();
    constructor(x: number, y: number);
    /**
     * Set the contents of a Vector2.
     * @param x - x component.
     * @param y - y component.
     * @returns this
     */
    set(x: number, y: number): this;
    /**
     * Set the contents of a Vector3 from an array.
     * @param array - Array containing x, and y components.
     * @returns this
     */
    setFromArray(array: readonly [number, number]): this;
    /**
     * Fill all components of this Vector2 with the same value.
     * @param value - Value to fill all components with.
     * @returns
     */
    fill(value: number): this;
    /**
     * Add a Vector2 to this Vector2.
     * @param vec - Vector2 to add.
     * @returns this
     */
    add(vec: Vector2Readonly | THREE_Vector2): this;
    /**
     * Subtract a Vector2 from this Vector2.
     * @param vec - Vector2 to subtract.
     * @returns this
     */
    sub(vec: Vector2Readonly | THREE_Vector2): this;
    /**
     * Multiply this Vector2 by scalar value.
     * @param scalar - Scalar to multiply.
     * @returns this
     */
    multiplyScalar(scalar: number): this;
    /**
     * Divide this Vector2 by scalar value.
     * @param scalar - Scalar to divide.
     * @returns this
     */
    divideScalar(scalar: number): this;
    /**
     * Returns the dot product of this Vector2 with another Vector2.
     * @param vec - Vector2 to dot with.
     * @returns The dot product.
     */
    dot(vec: Vector2Readonly | THREE_Vector2): number;
    /**
     * Returns the dot product of two Vector2s.
     * @param vec1 - First Vector2.
     * @param vec2 - Second Vector2.
     * @returns The dot product.
     */
    static dot(vec1: Vector2Readonly | THREE_Vector2, vec2: Vector2Readonly | THREE_Vector2): number;
    /**
     * Compute the 2D cross product (wedge product) with another Vector2.
     * @param vec - Vector2 to cross.
     * @returns The cross product.
     */
    cross(vec: Vector2Readonly | THREE_Vector2): number;
    /**
     * Compute the 2D cross product (wedge product) of two Vector2s.
     * @param vec1 - First Vector2.
     * @param vec2 - Second Vector2.
     * @returns The cross product.
     */
    static cross(vec1: Vector2Readonly | THREE_Vector2, vec2: Vector2Readonly | THREE_Vector2): number;
    /**
     * Get the angle of this Vector2.
     * Computes the angle in radians with respect to the positive x-axis.
     * Angle is always in range [0, 2 * Math.PI] (and 2 * Math.PI is slightly less than 2 * PI).
     * @returns The angle.
     */
    angle(): number;
    /**
     * Returns the squared length of the Vector2.
     * @returns The squared length.
     */
    lengthSq(): number;
    /**
     * Returns the length of the Vector2.
     * @returns The length.
     */
    length(): number;
    /**
     * Returns the squared distance between this Vector2 and another Vector2.
     * @param vec - Vector2 to measure distance to.
     * @returns The squared distance.
     */
    distanceToSquared(vec: Vector2Readonly | THREE_Vector2): number;
    /**
     * Returns the distance between this Vector2 and another Vector2.
     * @param vec - Vector2 to measure distance to.
     * @returns The distance.
     */
    distanceTo(vec: Vector2Readonly | THREE_Vector2): number;
    /**
     * Normalize the length of this Vector2.
     * @returns this
     */
    normalize(): this;
    /**
     * Apply Matrix3 transformation to this Vector2.
     * @param matrix - Matrix3 to apply.
     * @returns this
     */
    applyMatrix3(matrix: Matrix3Readonly): this;
    /**
     * Linearly interpolate between this Vector2 and another Vector2.
     * @param vector - Vector2 to lerp to.
     * @param t - Interpolation factor between 0 and 1.
     * @returns this
     */
    lerp(vector: Vector2Readonly | THREE_Vector2, t: number): this;
    /**
     * Average this Vector2 with another Vector2.
     * @param vector - Vector2 to average with.
     * @returns this
     */
    average(vector: Vector2Readonly | THREE_Vector2): this;
    /**
     * Min this Vector3 with another Vector3.
     * @param vector - Vector3 to min with.
     * @returns this
     */
    min(vector: Vector2Readonly | THREE_Vector2): this;
    /**
     * Max this Vector2 with another Vector2.
     * @param vector - Vector2 to max with.
     * @returns this
     */
    max(vector: Vector2Readonly | THREE_Vector2): this;
    /**
     * Invert this Vector2.
     * @returns this
     */
    invert(): this;
    /**
     * Calculate the angle between this Vector2 and another Vector2.
     * @param vector - Vector2 to calculate angle to.
     * @returns The angle between the vectors.
     */
    angleTo(vector: Vector2Readonly | THREE_Vector2): number;
    /**
     * Calculate the angle between two Vector2s.
     * @param vec1 - First Vector2.
     * @param vec2 - Second Vector2.
     * @returns The angle between the vectors.
     */
    static angleTo(vec1: Vector2Readonly | THREE_Vector2, vec2: Vector2Readonly | THREE_Vector2): number;
    /**
     * Calculate the angle between this (normalized) Vector2 and another (normalized) Vector2.
     * @param vector - Vector2 to calculate angle to.
     * @returns The angle between the vectors.
     */
    angleToNormalized(vector: Vector2Readonly | THREE_Vector2): number;
    /**
     * Calculate the angle between a (normalized) Vector2 and another (normalized) Vector2.
     * @param vec1 - First Vector2.
     * @param vec2 - Second Vector2.
     * @returns The angle between the vectors.
     */
    static angleToNormalized(vec1: Vector2Readonly | THREE_Vector2, vec2: Vector2Readonly | THREE_Vector2): number;
    /**
     * Copy the contents of a Vector2 to this Vector2.
     * @param vec - Vector2 to copy.
     * @returns this
     */
    copy(vec: Vector2Readonly | THREE_Vector2): this;
    /**
     * Test if this Vector2 equals another Vector2.
     * @param vec - Vector2 to test equality with.
     * @param tolerance - Optional numerical tolerance for equality check, defaults to global numerical tolerance.
     * @returns True if the vectors are equal.
     */
    equals(vec: Vector2Readonly | THREE_Vector2, tolerance?: number): boolean;
    /**
     * Test if two Vector2s are equal.
     * @param vec1 - First Vector2.
     * @param vec2 - Second Vector2.
     * @param tolerance - Optional numerical tolerance for equality check, defaults to global numerical tolerance.
     * @returns True if the vectors are equal.
     */
    static equals(vec1: Vector2Readonly | THREE_Vector2, vec2: Vector2Readonly | THREE_Vector2, tolerance?: number): boolean;
    /**
     * Test if this vector is the zero vector.
     * @param tolerance - Optional numerical tolerance for zero check, defaults to global numerical tolerance.
     * @returns True if the vector is the zero vector.
     */
    isZero(tolerance?: number): boolean;
    /**
     * Clone this Vector2 into a new Vector2.
     * @returns The cloned Vector2.
     */
    clone(): Vector2;
    /**
     * Returns an array containing the x and y components of this Vector3.
     * @returns The Vector2 as an array.
     */
    toArray(): [number, number];
}

type Matrix4Readonly = {
    readonly elements: readonly number[];
    readonly isIdentity: boolean;
    equals: (matrix: Matrix4Readonly) => boolean;
    clone: () => Matrix4;
};
/**
 * These Matrix4s represent a rigid transform in homogeneous coords,
 * therefore, we assume that the bottom row is [0, 0, 0, 1] and only store 12 elements.
 */
declare class Matrix4 {
    private readonly _elements;
    private _isIdentity;
    /**
     * If no elements passed in, defaults to identity matrix.
     */
    constructor();
    constructor(n11: number, n12: number, n13: number, n14: number, n21: number, n22: number, n23: number, n24: number, n31: number, n32: number, n33: number, n34: number, isIdentity?: boolean);
    /**
     * @private
     */
    set elements(elements: readonly number[]);
    /**
     * Returns elements of Matrix4.
     */
    get elements(): readonly number[];
    /**
     * @private
     */
    set isIdentity(isIdentity: boolean);
    /**
     * Returns whether Matrix4 is the identity matrix.
     */
    get isIdentity(): boolean;
    private static _checkElementsForIdentity;
    /**
     * Set values element-wise.
     */
    private _set;
    /**
     * Set this Matrix4 to the identity matrix.
     * @returns this
     */
    setIdentity(): this;
    /**
     * In place matrix multiplication of this Matrix4 (A) with another Matrix4 (B).
     * Sets value of this Matrix4 to B*A.
     * @param matrix - Matrix4 to multiply with.
     * @returns this
     */
    premultiplyMatrix4(matrix: Matrix4Readonly): Matrix4;
    /**
     * In place matrix multiplication of this Matrix4 (A) with another Matrix4 (B).
     * Sets value of this Matrix4 to A*B.
     * @param matrix - Matrix4 to multiply with.
     */
    multiplyMatrix4(matrix: Matrix4Readonly): Matrix4;
    /**
     * Matrix multiplication of two matrices.
     */
    private static _multiplyMatrices;
    /**
     * Set elements of Matrix4 according to translation.
     * @param translation - Translation vector.
     * @returns this
     */
    setTranslation(translation: Vector3Readonly | THREE_Vector3): this;
    /**
     * Set elements of Matrix4 according to rotation about axis.
     * @param axis - Unit vector around which to rotate, must be normalized.
     * @param angle - Angle of rotation in radians.
     * @param offset - Offset vector.
     * @returns this
     */
    setRotationAxisAngleAtOffset(axis: Vector3Readonly | THREE_Vector3, angle: number, offset?: Vector3Readonly | THREE_Vector3): this;
    /**
     * Set elements of Matrix4 according to rotation from one vector to another.
     * @param fromVector - Unit vector to rotate from, must be normalized.
     * @param toVector - Unit vector to rotate to, must be normalized.
     * @returns this
     */
    setRotationFromVectorToVector(fromVector: Vector3Readonly | THREE_Vector3, toVector: Vector3Readonly | THREE_Vector3, offset?: Vector3Readonly | THREE_Vector3): Matrix4;
    /**
     * Set elements of Matrix4 according to reflection.
     * @param normal - Unit vector about which to reflect, must be normalized.
     * @param offset - Offset vector of reflection.
     * @returns this
     */
    setReflectionNormalAtOffset(normal: Vector3Readonly | THREE_Vector3, offset?: Vector3Readonly | THREE_Vector3): this;
    private _setRotationAxisCosSin;
    private _setRotationMatrixAtOffset;
    /**
     * Invert the current transform.
     * https://math.stackexchange.com/questions/1234948/inverse-of-a-rigid-transformation
     * @returns this
     */
    invertTransform(): this;
    /**
     * Test if this Matrix4 equals another Matrix4.
     * @param matrix - Matrix4 to test equality with.
     * @returns
     */
    equals(matrix: Matrix4Readonly): boolean;
    /**
     * Copy values from a Matrix4 into this Matrix4.
     * @param matrix - Matrix4 to copy.
     * @returns this
     */
    copy(matrix: Matrix4Readonly): this;
    /**
     * Returns a deep copy of this Matrix4.
     */
    clone(): Matrix4;
}

type QuaternionReadonly = {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly w: number;
    readonly lengthSq: () => number;
    readonly length: () => number;
    readonly clone: () => Quaternion;
};
declare class Quaternion {
    private _x;
    private _y;
    private _z;
    private _w;
    /**
     * @param x - Defaults to 0.
     * @param y - Defaults to 0.
     * @param z - Defaults to 0.
     * @param w - Defaults to 1.
     */
    constructor();
    constructor(x: number, y: number, z: number, w: number);
    /**
     * @private
     */
    set x(x: number);
    /**
     * @returns The x component of the Quaternion.
     */
    get x(): number;
    /**
     * @private
     */
    set y(y: number);
    /**
     * @returns The y component of the Quaternion.
     */
    get y(): number;
    /**
     * @private
     */
    set z(z: number);
    /**
     * @returns The z component of the Quaternion.
     */
    get z(): number;
    /**
     * @private
     */
    set w(w: number);
    /**
     * @returns The w component of the Quaternion.
     */
    get w(): number;
    /**
     * Set quaternion from two unit vectors.
     * @param vFrom - From unit vector (normalized).
     * @param vTo - To unit vector (normalized).
     * @returns this
     */
    setFromUnitVectors(vFrom: Vector3Readonly | THREE_Vector3, vTo: Vector3Readonly | THREE_Vector3): this;
    /**
     * Returns the squared length of the Quaternion.
     */
    lengthSq(): number;
    /**
     * Returns the length of the Quaternion.
     */
    length(): number;
    /**
     * Normalize the length of this Quaternion.
     * @returns this
     */
    normalize(): this;
    /**
     * In place quaternion multiplication of this Quaternion (A) with another Quaternion (B).
     * Sets value of this Quaternion to A*B.
     * @param quat - Quaternion to multiply with.
     * @returns this
     */
    multiply(quat: QuaternionReadonly | THREE_Quaternion): Quaternion;
    /**
     * In place quaternion multiplication of this Quaternion (A) with another Quaternion (B).
     * Sets value of this Quaternion to B*A.
     * @param quat - Quaternion to premultiply with.
     * @returns this
     */
    premultiply(quat: QuaternionReadonly | THREE_Quaternion): Quaternion;
    /**
     * Quaternion multiplication.
     */
    private static _multiplyQuaternions;
    /**
     * Invert this Quaternion.
     * @returns this
     */
    invert(): this;
    /**
     * Copy the contents of a Quaternion to this Quaternion.
     * @param quaternion - Quaternion to copy.
     * @returns this
     */
    copy(quaternion: QuaternionReadonly | THREE_Quaternion): this;
    /**
     * Clone this Quaternion into a new Quaternion.
     */
    clone(): Quaternion;
}

type Vector3Readonly = {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    dot: (vec: Vector3Readonly | THREE_Vector3) => number;
    lengthSq: () => number;
    length: () => number;
    distanceToSquared: (vec: Vector3Readonly | THREE_Vector3) => number;
    distanceTo: (vec: Vector3Readonly | THREE_Vector3) => number;
    angleTo: (vec: Vector3Readonly | THREE_Vector3) => number;
    angleToNormalized: (vec: Vector3Readonly | THREE_Vector3) => number;
    equals: (vec: Vector3Readonly | THREE_Vector3) => boolean;
    isZero: () => boolean;
    clone: () => Vector3;
    toArray: () => [number, number, number];
};
declare class Vector3 {
    x: number;
    y: number;
    z: number;
    /**
     * @param x - Defaults to 0.
     * @param y - Defaults to 0.
     * @param z - Defaults to 0.
     */
    constructor();
    constructor(x: number, y: number, z: number);
    /**
     * Set the contents of a Vector3.
     * @param x - x component.
     * @param y - y component.
     * @param z - z component.
     * @returns this
     */
    set(x: number, y: number, z: number): this;
    /**
     * Set the contents of a Vector3 from an array.
     * @param array - Array containing x, y, and z components.
     * @returns this
     */
    setFromArray(array: readonly [number, number, number]): this;
    /**
     * Fill all components of this Vector3 with the same value.
     * @param value - Value to fill all components with.
     * @returns
     */
    fill(value: number): this;
    /**
     * Add a Vector3 to this Vector3.
     * @param vec - Vector3 to add.
     * @returns this
     */
    add(vec: Vector3Readonly | THREE_Vector3): this;
    /**
     * Subtract a Vector3 from this Vector3.
     * @param vec - Vector3 to subtract.
     * @returns this
     */
    sub(vec: Vector3Readonly | THREE_Vector3): this;
    /**
     * Multiply this Vector3 by scalar value.
     * @param scalar - Scalar to multiply.
     * @returns this
     */
    multiplyScalar(scalar: number): this;
    /**
     * Divide this Vector3 by scalar value.
     * @param scalar - Scalar to divide.
     * @returns this
     */
    divideScalar(scalar: number): this;
    /**
     * Returns the dot product of this Vector3 with another Vector3.
     * @param vec - Vector3 to dot with.
     * @returns dot product of this and vec.
     */
    dot(vec: Vector3Readonly | THREE_Vector3): number;
    /**
     * Returns the dot product of two Vector3s.
     * @param vec1 - First Vector3.
     * @param vec2 - Second Vector3.
     * @returns dot product of vec1 and vec2.
     */
    static dot(vec1: Vector3Readonly | THREE_Vector3, vec2: Vector3Readonly | THREE_Vector3): number;
    /**
     * Cross this Vector3 with another Vector3.
     * @param vec - Vector3 to cross with.
     * @returns this
     */
    cross(vec: Vector3Readonly | THREE_Vector3): this;
    /**
     * Returns the squared length of the Vector3.
     * @returns Squared length of the Vector3.
     */
    lengthSq(): number;
    /**
     * Returns the length of the Vector3.
     * @returns Length of the Vector3.
     */
    length(): number;
    /**
    * Returns the squared distance between this Vector3 and another Vector3.
    * @param vec - Vector3 to measure distance to.
    * @returns Squared distance between this and vec.
    */
    distanceToSquared(vec: Vector3Readonly | THREE_Vector3): number;
    /**
     * Returns the distance between this Vector3 and another Vector3.
     * @param vec - Vector3 to measure distance to.
     * @returns Distance between this and vec.
     */
    distanceTo(vec: Vector3Readonly | THREE_Vector3): number;
    /**
     * Normalize the length of this Vector3.
     * @returns this
     */
    normalize(): this;
    /**
     * Apply Matrix4 transformation to this Vector3.
     * @param matrix - Matrix4 to apply.
     * @returns this
     */
    applyMatrix4(matrix: Matrix4Readonly): this;
    /**
     * Apply Matrix4 rotation component (ignore translation) to this Vector3.
     * @param matrix - Matrix4 to apply.
     * @returns this
     */
    applyMatrix4RotationComponent(matrix: Matrix4Readonly): this;
    /**
     * Apply Quaternion transformation to this Vector3.
     * @param quaternion - Quaternion to apply.
     * @returns this
     */
    applyQuaternion(quaternion: QuaternionReadonly | THREE_Quaternion): this;
    /**
     * Linearly interpolate between this Vector3 and another Vector3.
     * @param vector - Vector3 to lerp to.
     * @param t - Interpolation factor between 0 and 1.
     * @returns this
     */
    lerp(vector: Vector3Readonly | THREE_Vector3, t: number): this;
    /**
     * Average this Vector3 with another Vector3.
     * @param vector - Vector3 to average with.
     * @returns this
     */
    average(vector: Vector3Readonly | THREE_Vector3): this;
    /**
     * Min this Vector3 with another Vector3.
     * @param vector - Vector3 to min with.
     * @returns this
     */
    min(vector: Vector3Readonly | THREE_Vector3): this;
    /**
     * Max this Vector3 with another Vector3.
     * @param vector - Vector3 to max with.
     * @returns this
     */
    max(vector: Vector3Readonly | THREE_Vector3): this;
    /**
     * Invert this Vector3.
     * @returns this
     */
    invert(): this;
    /**
     * Calculate the angle between this Vector3 and another Vector3.
     * @param vector - Vector3 to calculate angle to.
     * @returns Angle between this and vector.
     */
    angleTo(vector: Vector3Readonly | THREE_Vector3): number;
    /**
     * Calculate the angle between this (normalized) Vector3 and another (normalized) Vector3.
     * @param vector - Vector3 to calculate angle to.
     * @returns Angle between this and vector.
     */
    angleToNormalized(vector: Vector3Readonly | THREE_Vector3): number;
    /**
     * Copy the contents of a Vector3 to this Vector3.
     * @param vec - Vector3 to copy.
     * @returns this
     */
    copy(vec: Vector3Readonly | THREE_Vector3): this;
    /**
     * Test if this Vector3 equals another Vector3.
     * @param vec - Vector3 to test equality with.
     * @param tolerance - Defaults to 0.
     * @returns True if the vectors are equal.
     */
    equals(vec: Vector3Readonly | THREE_Vector3, tolerance?: number): boolean;
    /**
     * Test if two Vector3s are equal (within numerical tolerance).
     * @param vec1 - First Vector3.
     * @param vec2 - Second Vector3.
     * @param tolerance - Optional numerical tolerance for equality check, defaults to global numerical tolerance.
     * @returns True if the vectors are equal.
     */
    static equals(vec1: Vector3Readonly | THREE_Vector3, vec2: Vector3Readonly | THREE_Vector3, tolerance?: number): boolean;
    /**
     * Test if this vector is the zero vector.
     * @param tolerance - Optional numerical tolerance for zero check, defaults to global numerical tolerance.
     * @returns True if the vector is the zero vector.
     */
    isZero(tolerance?: number): boolean;
    /**
     * Clone this Vector3 into a new Vector3.
     */
    clone(): Vector3;
    /**
     * Returns an array containing the x, y, and z components of this Vector3.
     */
    toArray(): [number, number, number];
}

export { DEFAULT_NUMERICAL_TOLERANCE, Matrix3, Matrix3Readonly, Matrix4, Matrix4Readonly, Quaternion, QuaternionReadonly, Vector2, Vector2Readonly, Vector3, Vector3Readonly, clampValue, degreesToRadians, radiansToDegrees, roundValueToIncrement, setNumericalTolerance };
