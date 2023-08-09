import type { Matrix4Readonly } from './Matrix4';
import type { QuaternionReadonly } from './Quaternion';
import type { Vector3 as THREE_Vector3, Quaternion as THREE_Quaternion } from 'three';
export type Vector3Readonly = {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    dot: (vec: Vector3Readonly | THREE_Vector3) => number;
    lengthSq: () => number;
    length: () => number;
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
     */
    dot(vec: Vector3Readonly | THREE_Vector3): number;
    /**
     * Cross this Vector3 with another Vector3.
     * @param vec - Vector3 to cross with.
     */
    cross(vec: Vector3Readonly | THREE_Vector3): this;
    /**
     * Returns the squared length of the Vector3.
     */
    lengthSq(): number;
    /**
     * Returns the length of the Vector3.
     */
    length(): number;
    /**
     * Normalize the length of this Vector3.
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
     * Invert this Vector3.
     * @returns this
     */
    invert(): this;
    /**
     * Calculate the angle between this Vector3 and another Vector3.
     */
    angleTo(vector: Vector3Readonly | THREE_Vector3): number;
    /**
     * Copy the contents of a Vector3 to this Vector3.
     * @param vec - Vector3 to copy.
     * @returns this
     */
    copy(vec: Vector3Readonly | THREE_Vector3): this;
    /**
     * Test if this Vector3 equals another Vector3.
     * @param vec - Vector3 to test equality with.
     */
    equals(vec: Vector3Readonly | THREE_Vector3): boolean;
    /**
     * Test if this vector is the zero vector.
     */
    isZero(): boolean;
    /**
     * Clone this Vector3 into a new Vector3.
     */
    clone(): Vector3;
    /**
     * Returns an array containing the x, y, and z components of this Vector3.
     */
    toArray(): [number, number, number];
}
