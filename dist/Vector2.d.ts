import type { Matrix3Readonly } from './Matrix3';
import type { THREE_Vector2 } from './THREE_types';
export type Vector2Readonly = {
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
export declare class Vector2 {
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
