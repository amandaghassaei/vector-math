import type { Vector3Readonly } from './Vector3';
import type { Vector3 as THREE_Vector3 } from 'three';
export type Matrix4Readonly = {
    readonly elements: readonly number[];
    readonly isIdentity: boolean;
    equals: (matrix: Matrix4Readonly) => boolean;
    clone: () => Matrix4;
};
/**
 * These Matrix4s represent a rigid transform in homogeneous coords,
 * therefore, we assume that the bottom row is [0, 0, 0, 1] and only store 12 elements.
 */
export declare class Matrix4 {
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
     * Set elements of Matrix4 according to rotation about axis.
     * @param axis - Unit vector around which to rotate, must be normalized.
     * @param angle - Angle of rotation in radians.
     * @param offset - Offset vector.
     * @returns this
     */
    setRotationAxisAngleAtOffset(axis: Vector3Readonly | THREE_Vector3, angle: number, offset?: Vector3Readonly | THREE_Vector3): this;
    /**
     * Set elements of Matrix4 according to reflection.
     * @param normal - Unit vector about which to reflect, must be normalized.
     * @param offset - Offset vector of reflection.
     * @returns this
     */
    setReflectionNormalAtOffset(normal: Vector3Readonly | THREE_Vector3, offset?: Vector3Readonly | THREE_Vector3): this;
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
