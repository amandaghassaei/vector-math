import { tempVector3 } from './common';
import { NUMERICAL_TOLERANCE } from './constants';
import { Vector3 } from './Vector3';
/**
 * These Matrix4s represent a rigid transform in homogeneous coords,
 * therefore, we assume that the bottom row is [0, 0, 0, 1] and only store 12 elements.
 */
export class Matrix4 {
    constructor(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, isIdentity) {
        if (n11 !== undefined) {
            this._elements = [
                n11, n12, n13, n14,
                n21, n22, n23, n24,
                n31, n32, n33, n34,
            ];
            this._isIdentity = isIdentity === undefined ? Matrix4._checkElementsForIdentity(this._elements) : isIdentity;
        }
        else {
            this._elements = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
            ];
            this._isIdentity = true;
        }
    }
    /**
     * @private
     */
    set elements(elements) {
        throw new Error('No elements setter on Matrix4.');
    }
    /**
     * Returns elements of Matrix4.
     */
    get elements() {
        return this._elements;
    }
    /**
     * @private
     */
    set isIdentity(isIdentity) {
        throw new Error('No isIdentity setter on Matrix4.');
    }
    /**
     * Returns whether Matrix4 is the identity matrix.
     */
    get isIdentity() {
        return this._isIdentity;
    }
    static _checkElementsForIdentity(elements) {
        const [n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34] = elements;
        return Math.abs(n11 - 1) <= NUMERICAL_TOLERANCE() && Math.abs(n22 - 1) <= NUMERICAL_TOLERANCE() && Math.abs(n33 - 1) <= NUMERICAL_TOLERANCE() &&
            Math.abs(n12) <= NUMERICAL_TOLERANCE() && Math.abs(n13) <= NUMERICAL_TOLERANCE() && Math.abs(n14) <= NUMERICAL_TOLERANCE() &&
            Math.abs(n21) <= NUMERICAL_TOLERANCE() && Math.abs(n23) <= NUMERICAL_TOLERANCE() && Math.abs(n24) <= NUMERICAL_TOLERANCE() &&
            Math.abs(n31) <= NUMERICAL_TOLERANCE() && Math.abs(n32) <= NUMERICAL_TOLERANCE() && Math.abs(n34) <= NUMERICAL_TOLERANCE();
    }
    /**
     * Set values element-wise.
     */
    _set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34) {
        const { _elements } = this;
        _elements[0] = n11;
        _elements[1] = n12;
        _elements[2] = n13;
        _elements[3] = n14;
        _elements[4] = n21;
        _elements[5] = n22;
        _elements[6] = n23;
        _elements[7] = n24;
        _elements[8] = n31;
        _elements[9] = n32;
        _elements[10] = n33;
        _elements[11] = n34;
        return this;
    }
    /**
     * Set this Matrix4 to the identity matrix.
     * @returns this
     */
    setIdentity() {
        this._set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0);
        this._isIdentity = true;
        return this;
    }
    /**
     * In place matrix multiplication of this Matrix4 (A) with another Matrix4 (B).
     * Sets value of this Matrix4 to B*A.
     * @param matrix - Matrix4 to multiply with.
     * @returns this
     */
    premultiplyMatrix4(matrix) {
        return Matrix4._multiplyMatrices(this, matrix, this);
    }
    /**
     * In place matrix multiplication of this Matrix4 (A) with another Matrix4 (B).
     * Sets value of this Matrix4 to A*B.
     * @param matrix - Matrix4 to multiply with.
     */
    multiplyMatrix4(matrix) {
        return Matrix4._multiplyMatrices(this, this, matrix);
    }
    /**
     * Matrix multiplication of two matrices.
     */
    static _multiplyMatrices(self, matrixA, matrixB) {
        // Check if we need to multiply through.
        if (matrixA.isIdentity)
            return self.copy(matrixB);
        if (matrixB.isIdentity)
            return self.copy(matrixA);
        const { _elements } = self;
        const ae = matrixA.elements;
        const be = matrixB.elements;
        const a11 = ae[0], a12 = ae[1], a13 = ae[2], a14 = ae[3];
        const a21 = ae[4], a22 = ae[5], a23 = ae[6], a24 = ae[7];
        const a31 = ae[8], a32 = ae[9], a33 = ae[10], a34 = ae[11];
        const b11 = be[0], b12 = be[1], b13 = be[2], b14 = be[3];
        const b21 = be[4], b22 = be[5], b23 = be[6], b24 = be[7];
        const b31 = be[8], b32 = be[9], b33 = be[10], b34 = be[11];
        _elements[0] = a11 * b11 + a12 * b21 + a13 * b31;
        _elements[1] = a11 * b12 + a12 * b22 + a13 * b32;
        _elements[2] = a11 * b13 + a12 * b23 + a13 * b33;
        _elements[3] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
        _elements[4] = a21 * b11 + a22 * b21 + a23 * b31;
        _elements[5] = a21 * b12 + a22 * b22 + a23 * b32;
        _elements[6] = a21 * b13 + a22 * b23 + a23 * b33;
        _elements[7] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
        _elements[8] = a31 * b11 + a32 * b21 + a33 * b31;
        _elements[9] = a31 * b12 + a32 * b22 + a33 * b32;
        _elements[10] = a31 * b13 + a32 * b23 + a33 * b33;
        _elements[11] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
        self._isIdentity = Matrix4._checkElementsForIdentity(_elements);
        return self;
    }
    setTranslation(translation) {
        if (Math.abs(translation.x) <= NUMERICAL_TOLERANCE() && Math.abs(translation.y) <= NUMERICAL_TOLERANCE() && Math.abs(translation.z) <= NUMERICAL_TOLERANCE())
            return this.setIdentity();
        this._set(1, 0, 0, translation.x, 0, 1, 0, translation.y, 0, 0, 1, translation.z);
        this._isIdentity = false;
        return this;
    }
    /**
     * Set elements of Matrix4 according to rotation about axis.
     * @param axis - Unit vector around which to rotate, must be normalized.
     * @param angle - Angle of rotation in radians.
     * @param offset - Offset vector.
     * @returns this
     */
    setRotationAxisAngleAtOffset(axis, angle, offset) {
        if (Math.abs(angle) <= NUMERICAL_TOLERANCE()) {
            return this.setIdentity();
        }
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        return this._setRotationAxisCosSin(cosAngle, sinAngle, axis, offset);
    }
    /**
     * Set elements of Matrix4 according to rotation from one vector to another.
     * @param fromVector - Unit vector to rotate from, must be normalized.
     * @param toVector - Unit vector to rotate to, must be normalized.
     * @returns this
     */
    setRotationFromVectorToVector(fromVector, toVector, offset) {
        // Check for no rotation.
        if (Vector3.equals(fromVector, toVector)) {
            return this.setIdentity();
        }
        const axis = tempVector3.copy(fromVector).cross(toVector);
        let sinAngle = axis.length();
        if (sinAngle <= NUMERICAL_TOLERANCE()) {
            sinAngle = 0;
            // Vectors are perfectly opposite, chose any axis orthogonal to fromVector.
            axis.set(fromVector.y, -fromVector.x, 0);
            let axisLength = axis.length();
            /* c8 ignore next 4 */
            if (axisLength <= NUMERICAL_TOLERANCE()) { // Just in case.
                axis.set(-fromVector.z, 0, fromVector.x);
                axisLength = axis.length();
            }
            axis.divideScalar(axisLength); // Normalize axis.
        }
        else {
            axis.divideScalar(sinAngle); // Normalize axis.
        }
        const cosAngle = Vector3.dot(fromVector, toVector);
        return this._setRotationAxisCosSin(cosAngle, sinAngle, axis, offset);
    }
    /**
     * Set elements of Matrix4 according to reflection.
     * @param normal - Unit vector about which to reflect, must be normalized.
     * @param offset - Offset vector of reflection.
     * @returns this
     */
    setReflectionNormalAtOffset(normal, offset) {
        // To do this we need to calculate T * R * (-T).
        // Based on https://math.stackexchange.com/questions/693414/reflection-across-the-plane
        // First calc R.
        const nx = normal.x;
        const ny = normal.y;
        const nz = normal.z;
        const r11 = 1 - 2 * nx * nx, r12 = -2 * nx * ny, r13 = -2 * nx * nz;
        const r21 = r12, r22 = 1 - 2 * ny * ny, r23 = -2 * ny * nz;
        const r31 = r13, r32 = r23, r33 = 1 - 2 * nz * nz;
        if (offset) {
            this._setRotationMatrixAtOffset(r11, r12, r13, r21, r22, r23, r31, r32, r33, offset);
        }
        else {
            this._set(r11, r12, r13, 0, r21, r22, r23, 0, r31, r32, r33, 0);
        }
        this._isIdentity = false;
        return this;
    }
    _setRotationAxisCosSin(cosAngle, sinAngle, axis, offset) {
        // To do this we need to calculate T * R * (-T).
        // Based on http://www.gamedev.net/reference/articles/article1199.asp
        // First calc R.
        const t = 1 - cosAngle;
        const x = axis.x, y = axis.y, z = axis.z;
        const t_x = t * x, t_y = t * y;
        const r11 = t_x * x + cosAngle, r12 = t_x * y - sinAngle * z, r13 = t_x * z + sinAngle * y;
        const r21 = t_x * y + sinAngle * z, r22 = t_y * y + cosAngle, r23 = t_y * z - sinAngle * x;
        const r31 = t_x * z - sinAngle * y, r32 = t_y * z + sinAngle * x, r33 = t * z * z + cosAngle;
        if (offset) {
            this._setRotationMatrixAtOffset(r11, r12, r13, r21, r22, r23, r31, r32, r33, offset);
        }
        else {
            this._set(r11, r12, r13, 0, r21, r22, r23, 0, r31, r32, r33, 0);
        }
        this._isIdentity = false;
        return this;
    }
    _setRotationMatrixAtOffset(r11, r12, r13, r21, r22, r23, r31, r32, r33, offset) {
        // Apply T * R * (-T).
        // Pre-multiply R by T and post multiply by -T.
        // This is a bit confusing to follow, but it reduces the amount of operations in the calc.
        const tx = -offset.x * (r11 - 1) - offset.y * r12 - offset.z * r13;
        const ty = -offset.x * r21 - offset.y * (r22 - 1) - offset.z * r23;
        const tz = -offset.x * r31 - offset.y * r32 - offset.z * (r33 - 1);
        this._set(r11, r12, r13, tx, r21, r22, r23, ty, r31, r32, r33, tz);
    }
    /**
     * Invert the current transform.
     * https://math.stackexchange.com/questions/1234948/inverse-of-a-rigid-transformation
     * @returns this
     */
    invertTransform() {
        if (this._isIdentity)
            return this;
        const { _elements } = this;
        // The inverted 3x3 rotation matrix is equal to its transpose: rTrans.
        const rTrans11 = _elements[0], rTrans12 = _elements[4], rTrans13 = _elements[8];
        const rTrans21 = _elements[1], rTrans22 = _elements[5], rTrans23 = _elements[9];
        const rTrans31 = _elements[2], rTrans32 = _elements[6], rTrans33 = _elements[10];
        // The inverted translation is -rTrans * t.
        const t1 = _elements[3], t2 = _elements[7], t3 = _elements[11];
        const t1Inv = -rTrans11 * t1 - rTrans12 * t2 - rTrans13 * t3;
        const t2Inv = -rTrans21 * t1 - rTrans22 * t2 - rTrans23 * t3;
        const t3Inv = -rTrans31 * t1 - rTrans32 * t2 - rTrans33 * t3;
        this._set(rTrans11, rTrans12, rTrans13, t1Inv, rTrans21, rTrans22, rTrans23, t2Inv, rTrans31, rTrans32, rTrans33, t3Inv);
        return this;
    }
    /**
     * Test if this Matrix4 equals another Matrix4.
     * @param matrix - Matrix4 to test equality with.
     * @returns
     */
    equals(matrix) {
        const elementsA = this.elements;
        const elementsB = matrix.elements;
        for (let i = 0, numElements = elementsA.length; i < numElements; i++) {
            if (Math.abs(elementsA[i] - elementsB[i]) > NUMERICAL_TOLERANCE())
                return false;
        }
        return true;
    }
    /**
     * Copy values from a Matrix4 into this Matrix4.
     * @param matrix - Matrix4 to copy.
     * @returns this
     */
    copy(matrix) {
        const { elements } = matrix;
        this._set(elements[0], elements[1], elements[2], elements[3], elements[4], elements[5], elements[6], elements[7], elements[8], elements[9], elements[10], elements[11]);
        this._isIdentity = matrix.isIdentity;
        return this;
    }
    /**
     * Returns a deep copy of this Matrix4.
     */
    clone() {
        const { _elements } = this;
        const clone = new Matrix4(_elements[0], _elements[1], _elements[2], _elements[3], _elements[4], _elements[5], _elements[6], _elements[7], _elements[8], _elements[9], _elements[10], _elements[11], this._isIdentity);
        return clone;
    }
}
//# sourceMappingURL=Matrix4.js.map