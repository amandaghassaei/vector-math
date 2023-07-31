import type { Matrix3Readonly } from './Matrix3';
import type { Vector2 as THREE_Vector2 } from 'three';
export type Vector2Readonly = {
    readonly x: number;
    readonly y: number;
    dot: (vec: Vector2Readonly | THREE_Vector2) => number;
    cross: (vec: Vector2Readonly | THREE_Vector2) => number;
    angle: () => number;
    lengthSq: () => number;
    length: () => number;
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
     */
    dot(vec: Vector2Readonly | THREE_Vector2): number;
    /**
     * Compute the 2D cross product (wedge product) with another Vector2.
     * @param vec - Vector2 to cross.
     */
    cross(vec: Vector2Readonly | THREE_Vector2): number;
    /**
     * Get the angle of this Vector2.
     * Computes the angle in radians with respect to the positive x-axis.
     * Angle is always in range [0, 2 * Math.PI] (and 2 * Math.PI is slightly less than 2 * PI).
     */
    angle(): number;
    /**
     * Returns the squared length of the Vector2.
     */
    lengthSq(): number;
    /**
     * Returns the length of the Vector2.
     */
    length(): number;
    /**
     * Normalize the length of this Vector2.
     */
    normalize(): this;
    /**
     * Apply Matrix3 transformation to this Vector2.
     * @param matrix - Matrix3 to apply.
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
     * Copy the contents of a Vector2 to this Vector2.
     * @param vec - Vector2 to copy.
     * @returns this
     */
    copy(vec: Vector2Readonly | THREE_Vector2): this;
    /**
     * Test if this Vector2 equals another Vector2.
     * @param vec - Vector2 to test equality with.
     */
    equals(vec: Vector2Readonly | THREE_Vector2): boolean;
    /**
     * Test if this vector is the zero vector.
     */
    isZero(): boolean;
    /**
     * Clone this Vector2 into a new Vector2.
     */
    clone(): Vector2;
    /**
     * Returns an array containing the x and y components of this Vector3.
     */
    toArray(): [number, number];
}
