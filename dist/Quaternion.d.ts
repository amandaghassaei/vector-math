import type { Vector3Readonly } from './Vector3';
import type { Quaternion as THREE_Quaternion, Vector3 as THREE_Vector3 } from 'three';
export type QuaternionReadonly = {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly w: number;
    readonly lengthSq: () => number;
    readonly length: () => number;
    readonly clone: () => Quaternion;
};
export declare class Quaternion {
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
