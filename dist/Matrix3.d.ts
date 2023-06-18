import type { Vector2Readonly } from './Vector2';
import type { Vector2 as THREE_Vector2 } from 'three';
export type Matrix3Readonly = {
    readonly elements: readonly number[];
    readonly isIdentity: boolean;
    equals: (matrix: Matrix3Readonly) => boolean;
    clone: () => Matrix3;
};
/**
 * These Matrix3s represent a rigid transform in homogeneous coords,
 * therefore, we assume that the bottom row is [0, 0, 1] and only store 6 elements.
 */
export declare class Matrix3 {
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
     * Set elements of Matrix4 according to rotation and translation.
     * @param angle - Angle of rotation in radians.
     * @param translation - Translation offset.
     * @returns this
     */
    setFromRotationTranslation(angle: number, translation: Vector2Readonly | THREE_Vector2): this;
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
