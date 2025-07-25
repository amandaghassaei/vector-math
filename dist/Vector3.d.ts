import type { Matrix4Readonly } from './Matrix4';
import type { QuaternionReadonly } from './Quaternion';
import type { THREE_Vector3, THREE_Quaternion } from './THREE_types';
export type Vector3Readonly = {
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
export declare class Vector3 {
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
