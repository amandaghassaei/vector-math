import type { Matrix3Readonly } from './Matrix3';
import type { Vector2 as THREE_Vector2 } from 'three';
import { getStackTraceAsString } from './utils';
import { NUMERICAL_TOLERANCE } from './constants';

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

export class Vector2 {
    x: number;
    y: number;

    /**
     * @param x - Defaults to 0.
     * @param y - Defaults to 0.
     */
    constructor();
    constructor(x: number, y: number);
    constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    /**
     * Set the contents of a Vector2.
     * @param x - x component.
     * @param y - y component.
     * @returns this
     */
    set(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * Set the contents of a Vector3 from an array.
     * @param array - Array containing x, and y components.
     * @returns this
     */
    setFromArray(array: readonly [number, number]) {
        this.x = array[0];
        this.y = array[1];
        return this;
    }

    /**
     * Add a Vector2 to this Vector2.
     * @param vec - Vector2 to add.
     * @returns this
     */
    add(vec: Vector2Readonly | THREE_Vector2) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    /**
     * Subtract a Vector2 from this Vector2.
     * @param vec - Vector2 to subtract.
     * @returns this
     */
    sub(vec: Vector2Readonly | THREE_Vector2) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    /**
     * Multiply this Vector2 by scalar value.
     * @param scalar - Scalar to multiply.
     * @returns this
     */
    multiplyScalar(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Divide this Vector2 by scalar value.
     * @param scalar - Scalar to divide.
     * @returns this
     */
    divideScalar(scalar: number) {
        if (Math.abs(scalar) <= NUMERICAL_TOLERANCE())
            console.warn(
                `Dividing by zero in Vector2.divideScalar(), stack trace:\n${getStackTraceAsString()}.`
            );
        return this.multiplyScalar(1 / scalar);
    }

    /**
     * Returns the dot product of this Vector2 with another Vector2.
     * @param vec - Vector2 to dot with.
     */
    dot(vec: Vector2Readonly | THREE_Vector2) {
        return this.x * vec.x + this.y * vec.y;
    }

    /**
     * Compute the 2D cross product (wedge product) with another Vector2.
     * @param vec - Vector2 to cross.
     */
    cross(vec: Vector2Readonly | THREE_Vector2) {
        return this.x * vec.y - this.y * vec.x;
    }

    /**
     * Get the angle of this Vector2.
     * Computes the angle in radians with respect to the positive x-axis.
     * Angle is always in range [0, 2 * Math.PI] (and 2 * Math.PI is slightly less than 2 * PI).
     */
    angle() {
        return Math.atan2(-this.y, -this.x) + Math.PI;
    }

    /**
     * Returns the squared length of the Vector2.
     */
    lengthSq() {
        const lengthSq = this.dot(this);
        return lengthSq;
    }

    /**
     * Returns the length of the Vector2.
     */
    length() {
        return Math.sqrt(this.lengthSq());
    }

    /**
     * Returns the squared distance between this Vector2 and another Vector2.
     * @param vec - Vector2 to measure distance to.
     */
    distanceToSquared(vec: Vector2Readonly | THREE_Vector2) {
        const dx = this.x - vec.x;
        const dy = this.y - vec.y;
        return dx * dx + dy * dy;
    }

    /**
     * Returns the distance between this Vector2 and another Vector2.
     * @param vec - Vector2 to measure distance to.
     */
    distanceTo(vec: Vector2Readonly | THREE_Vector2) {
        return Math.sqrt(this.distanceToSquared(vec));
    }

    /**
     * Normalize the length of this Vector2.
     */
    normalize() {
        let length = this.length();
        if (length <= NUMERICAL_TOLERANCE()) {
            console.warn(
                `Attempting to normalize zero length Vector2, stack trace:\n${getStackTraceAsString()}.`
            );
            length = 1;
        }
        this.divideScalar(length);
        return this;
    }

    /**
     * Apply Matrix3 transformation to this Vector2.
     * @param matrix - Matrix3 to apply.
     */
    applyMatrix3(matrix: Matrix3Readonly) {
        if (matrix.isIdentity) return this;
        const x = this.x,
            y = this.y;
        const e = matrix.elements;
        this.x = e[0] * x + e[1] * y + e[2];
        this.y = e[3] * x + e[4] * y + e[5];
        return this;
    }

    /**
     * Linearly interpolate between this Vector2 and another Vector2.
     * @param vector - Vector2 to lerp to.
     * @param t - Interpolation factor between 0 and 1.
     * @returns this
     */
    lerp(vector: Vector2Readonly | THREE_Vector2, t: number) {
        this.x += (vector.x - this.x) * t;
        this.y += (vector.y - this.y) * t;
        return this;
    }

    /**
     * Average this Vector2 with another Vector2.
     * @param vector - Vector2 to average with.
     * @returns this
     */
    average(vector: Vector2Readonly | THREE_Vector2) {
        this.x = (this.x + vector.x) / 2;
        this.y = (this.y + vector.y) / 2;
        return this;
    }

    /**
     * Min this Vector3 with another Vector3.
     * @param vector - Vector3 to min with.
     * @returns this
     */
    min(vector: Vector2Readonly | THREE_Vector2) {
        this.x = Math.min(this.x, vector.x);
        this.y = Math.min(this.y, vector.y);
        return this;
    }

    /**
     * Max this Vector2 with another Vector2.
     * @param vector - Vector2 to max with.
     * @returns this
     */
    max(vector: Vector2Readonly | THREE_Vector2) {
        this.x = Math.max(this.x, vector.x);
        this.y = Math.max(this.y, vector.y);
        return this;
    }

    /**
     * Invert this Vector2.
     * @returns this
     */
    invert() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    /**
     * Calculate the angle between this Vector2 and another Vector2.
     */
    angleTo(vector: Vector2Readonly | THREE_Vector2) {
        const theta = this.dot(vector) / Math.sqrt(this.lengthSq() * vector.lengthSq());
        return Math.acos(Math.min(Math.max(theta, -1), 1));
    }

    /**
     * Calculate the angle between this (normalized) Vector2 and another (normalized) Vector2.
     */
    angleToNormalized(vector: Vector2Readonly | THREE_Vector2) {
        const theta = this.dot(vector);
        return Math.acos(Math.min(Math.max(theta, -1), 1));
    }

    /**
     * Copy the contents of a Vector2 to this Vector2.
     * @param vec - Vector2 to copy.
     * @returns this
     */
    copy(vec: Vector2Readonly | THREE_Vector2) {
        this.x = vec.x;
        this.y = vec.y;
        return this;
    }

    /**
     * Test if this Vector2 equals another Vector2.
     * @param vec - Vector2 to test equality with.
     */
    equals(vec: Vector2Readonly | THREE_Vector2) {
        return Math.abs(this.x - vec.x) <= NUMERICAL_TOLERANCE() && Math.abs(this.y - vec.y) <= NUMERICAL_TOLERANCE();
    }

    /**
     * Test if this vector is the zero vector.
     */
    isZero() {
        return Math.abs(this.x) <= NUMERICAL_TOLERANCE() && Math.abs(this.y) <= NUMERICAL_TOLERANCE();
    }

    /**
     * Clone this Vector2 into a new Vector2.
     */
    clone() {
        return new Vector2(this.x, this.y);
    }

    /**
     * Returns an array containing the x and y components of this Vector3.
     */
    toArray() {
        return [this.x, this.y] as [number, number];
    }
}
