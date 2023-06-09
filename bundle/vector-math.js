(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VECTOR_MATH = {}));
})(this, (function (exports) { 'use strict';

    const NUMERICAL_TOLERANCE = 1e-15;

    function clampValue(value, min, max) {
        return Math.max(Math.min(value, max), min);
    }
    function radiansToDegrees(value) {
        return value * 180 / Math.PI;
    }
    function degreesToRadians(value) {
        return value / 180 * Math.PI;
    }
    function roundValueToIncrement(value, coarseStep) {
        var _a;
        if (coarseStep === 0)
            return value;
        if (coarseStep < 0)
            throw new Error(`Invalid coarse step: ${coarseStep}.`);
        const rounded = Math.round(value / coarseStep) * coarseStep;
        // Use a rounding trick to avoid results like 1.7999999999998 instead of 1.8.
        const decimals = ((_a = coarseStep.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        return parseFloat(rounded.toFixed(decimals));
    }

    class Vector2 {
        constructor(x, y) {
            this.x = x || 0;
            this.y = y || 0;
        }
        /**
         * Set the contents of a Vector2.
         * @param x - x component.
         * @param y - y component.
         * @returns this
         */
        set(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }
        /**
         * Add a Vector2 to this Vector2.
         * @param vec - Vector2 to add.
         * @returns this
         */
        add(vec) {
            this.x += vec.x;
            this.y += vec.y;
            return this;
        }
        /**
         * Subtract a Vector2 from this Vector2.
         * @param vec - Vector2 to subtract.
         * @returns this
         */
        sub(vec) {
            this.x -= vec.x;
            this.y -= vec.y;
            return this;
        }
        /**
         * Multiply this Vector2 by scalar value.
         * @param scalar - Scalar to multiply.
         * @returns this
         */
        multiplyScalar(scalar) {
            this.x *= scalar;
            this.y *= scalar;
            return this;
        }
        /**
         * Divide this Vector2 by scalar value.
         * @param scalar - Scalar to divide.
         * @returns this
         */
        divideScalar(scalar) {
            if (scalar === 0)
                console.warn('Dividing by zero in Vector2.divideScalar().');
            return this.multiplyScalar(1 / scalar);
        }
        /**
         * Returns the dot product of this Vector2 with another Vector2.
         * @param vec - Vector2 to dot with.
         */
        dot(vec) {
            return this.x * vec.x + this.y * vec.y;
        }
        /**
         * Compute the 2D cross product (wedge product) with another Vector2.
         * @param vec - Vector2 to cross.
         */
        cross(vec) {
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
         * Normalize the length of this Vector2.
         */
        normalize() {
            let length = this.length();
            if (length === 0) {
                console.warn('Attempting to normalize zero length Vector2.');
                length = 1;
            }
            this.divideScalar(length);
            return this;
        }
        /**
         * Apply Matrix3 transformation to this Vector2.
         * @param matrix - Matrix3 to apply.
         */
        applyMatrix3(matrix) {
            if (matrix.isIdentity)
                return this;
            const x = this.x, y = this.y;
            const e = matrix.elements;
            this.x = e[0] * x + e[1] * y + e[2];
            this.y = e[3] * x + e[4] * y + e[5];
            return this;
        }
        /**
         * Copy the contents of a Vector2 to this Vector2.
         * @param vec - Vector2 to copy.
         * @returns this
         */
        copy(vec) {
            this.x = vec.x;
            this.y = vec.y;
            return this;
        }
        /**
         * Test if this Vector2 equals another Vector2.
         * @param vec - Vector2 to test equality with.
         */
        equals(vec) {
            return this.x === vec.x && this.y === vec.y;
        }
        /**
         * Test if this vector is the zero vector.
         */
        isZero() {
            return this.x === 0 && this.y === 0;
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
            return [this.x, this.y];
        }
    }

    class Vector3 {
        constructor(x, y, z) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
        /**
         * Set the contents of a Vector3.
         * @param x - x component.
         * @param y - y component.
         * @param z - z component.
         * @returns this
         */
        set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }
        /**
         * Add a Vector3 to this Vector3.
         * @param vec - Vector3 to add.
         * @returns this
         */
        add(vec) {
            this.x += vec.x;
            this.y += vec.y;
            this.z += vec.z;
            return this;
        }
        /**
         * Subtract a Vector3 from this Vector3.
         * @param vec - Vector3 to subtract.
         * @returns this
         */
        sub(vec) {
            this.x -= vec.x;
            this.y -= vec.y;
            this.z -= vec.z;
            return this;
        }
        /**
         * Multiply this Vector3 by scalar value.
         * @param scalar - Scalar to multiply.
         * @returns this
         */
        multiplyScalar(scalar) {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            return this;
        }
        /**
         * Divide this Vector3 by scalar value.
         * @param scalar - Scalar to divide.
         * @returns this
         */
        divideScalar(scalar) {
            if (scalar === 0)
                console.warn('Dividing by zero in Vector3.divideScalar().');
            return this.multiplyScalar(1 / scalar);
        }
        /**
         * Returns the dot product of this Vector3 with another Vector3.
         * @param vec - Vector3 to dot with.
         */
        dot(vec) {
            return this.x * vec.x + this.y * vec.y + this.z * vec.z;
        }
        /**
         * Cross this Vector3 with another Vector3.
         * @param vec - Vector3 to cross with.
         */
        cross(vec) {
            const ax = this.x, ay = this.y, az = this.z;
            const bx = vec.x, by = vec.y, bz = vec.z;
            this.x = ay * bz - az * by;
            this.y = az * bx - ax * bz;
            this.z = ax * by - ay * bx;
            return this;
        }
        /**
         * Returns the squared length of the Vector3.
         */
        lengthSq() {
            const lengthSq = this.dot(this);
            return lengthSq;
        }
        /**
         * Returns the length of the Vector3.
         */
        length() {
            return Math.sqrt(this.lengthSq());
        }
        /**
         * Normalize the length of this Vector3.
         */
        normalize() {
            let length = this.length();
            if (length === 0) {
                console.warn('Attempting to normalize zero length Vector3.');
                length = 1;
            }
            this.divideScalar(length);
            return this;
        }
        /**
         * Apply Matrix4 transformation to this Vector3.
         * @param matrix - Matrix4 to apply.
         * @returns this
         */
        applyMatrix4(matrix) {
            if (matrix.isIdentity)
                return this;
            const x = this.x, y = this.y, z = this.z;
            const e = matrix.elements;
            this.x = e[0] * x + e[1] * y + e[2] * z + e[3];
            this.y = e[4] * x + e[5] * y + e[6] * z + e[7];
            this.z = e[8] * x + e[9] * y + e[10] * z + e[11];
            return this;
        }
        /**
         * Apply Matrix4 rotation component (ignore translation) to this Vector3.
         * @param matrix - Matrix4 to apply.
         * @returns this
         */
        applyMatrix4RotationComponent(matrix) {
            if (matrix.isIdentity)
                return this;
            const x = this.x, y = this.y, z = this.z;
            const e = matrix.elements;
            this.x = e[0] * x + e[1] * y + e[2] * z;
            this.y = e[4] * x + e[5] * y + e[6] * z;
            this.z = e[8] * x + e[9] * y + e[10] * z;
            return this;
        }
        /**
         * Apply Quaternion transformation to this Vector3.
         * @param quaternion - Quaternion to apply.
         * @returns this
         */
        applyQuaternion(quaternion) {
            const x = this.x, y = this.y, z = this.z;
            const qx = quaternion.x, qy = quaternion.y, qz = quaternion.z, qw = quaternion.w;
            // Calculate quat * vector.
            const ix = qw * x + qy * z - qz * y;
            const iy = qw * y + qz * x - qx * z;
            const iz = qw * z + qx * y - qy * x;
            const iw = -qx * x - qy * y - qz * z;
            // Calculate result * inverse quat.
            this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return this;
        }
        /**
         * Copy the contents of a Vector3 to this Vector3.
         * @param vec - Vector3 to copy.
         * @returns this
         */
        copy(vec) {
            this.x = vec.x;
            this.y = vec.y;
            this.z = vec.z;
            return this;
        }
        /**
         * Test if this Vector3 equals another Vector3.
         * @param vec - Vector3 to test equality with.
         */
        equals(vec) {
            return this.x === vec.x && this.y === vec.y && this.z === vec.z;
        }
        /**
         * Test if this vector is the zero vector.
         */
        isZero() {
            return this.x === 0 && this.y === 0 && this.z === 0;
        }
        /**
         * Clone this Vector3 into a new Vector3.
         */
        clone() {
            return new Vector3(this.x, this.y, this.z);
        }
        /**
         * Returns an array containing the x, y, and z components of this Vector3.
         */
        toArray() {
            return [this.x, this.y, this.z];
        }
    }

    /**
     * These Matrix3s represent a rigid transform in homogeneous coords,
     * therefore, we assume that the bottom row is [0, 0, 1] and only store 6 elements.
     */
    class Matrix3 {
        constructor(n11, n12, n13, n21, n22, n23, isIdentity) {
            if (n11 !== undefined) {
                this._elements = [
                    n11, n12, n13,
                    n21, n22, n23,
                ];
                this._isIdentity = isIdentity === undefined ? Matrix3._checkElementForIdentity(this._elements) : isIdentity;
            }
            else {
                this._elements = [
                    1, 0, 0,
                    0, 1, 0,
                ];
                this._isIdentity = true;
            }
        }
        /**
         * @private
         */
        set elements(elements) {
            throw new Error('No elements setter on Matrix3.');
        }
        /**
         * Returns elements of Matrix3.
         */
        get elements() {
            return this._elements;
        }
        /**
         * @private
         */
        set isIdentity(isIdentity) {
            throw new Error('No isIdentity setter on Matrix3.');
        }
        /**
         * Returns whether Matrix3 is the identity matrix.
         */
        get isIdentity() {
            return this._isIdentity;
        }
        /**
         * Set values element-wise.
         */
        _set(n11, n12, n13, n21, n22, n23) {
            const { _elements } = this;
            _elements[0] = n11;
            _elements[1] = n12;
            _elements[2] = n13;
            _elements[3] = n21;
            _elements[4] = n22;
            _elements[5] = n23;
            return this;
        }
        /**
         * Set this Matrix4 to the identity matrix.
         * @returns this
         */
        setIdentity() {
            this._set(1, 0, 0, 0, 1, 0);
            this._isIdentity = true;
            return this;
        }
        static _checkElementForIdentity(elements) {
            const [n11, n12, n13, n21, n22, n23,] = elements;
            return Math.abs(n11 - 1) <= NUMERICAL_TOLERANCE && Math.abs(n22 - 1) <= NUMERICAL_TOLERANCE &&
                Math.abs(n12) <= NUMERICAL_TOLERANCE && Math.abs(n13) <= NUMERICAL_TOLERANCE &&
                Math.abs(n21) <= NUMERICAL_TOLERANCE && Math.abs(n23) <= NUMERICAL_TOLERANCE;
        }
        // _setTranslation(translation: Vector3Readonly) {
        // 	this._set(
        // 		1, 0, translation.x,
        // 		0, 1, translation.y,
        // 	);
        // 	this._isIdentity = translation.x === 0 && translation.y === 0;
        // 	return this;
        // }
        /**
         * Set elements of Matrix4 according to rotation and translation.
         * @param angle - Angle of rotation in radians.
         * @param translation - Translation offset.
         * @returns this
         */
        setFromRotationTranslation(angle, translation) {
            if (angle === 0 && translation.x === 0 && translation.y === 0) {
                return this.setIdentity();
            }
            // To do this we need to calculate R(angle) * T(position).
            // Based on http://www.gamedev.net/reference/articles/article1199.asp
            // First calc R.
            const r11 = Math.cos(angle), r12 = -Math.sin(angle);
            const r21 = -r12, r22 = r11;
            // Pre-multiply T by R.
            const tx = translation.x * r11 + translation.y * r12;
            const ty = translation.x * r21 + translation.y * r22;
            this._set(r11, r12, tx, r21, r22, ty);
            this._isIdentity = false;
            return this;
        }
        // /**
        //  * Invert the current transform.
        //  * https://math.stackexchange.com/questions/1234948/inverse-of-a-rigid-transformation
        //  */
        // invertTransform() {
        // 	if (this._isIdentity) return this;
        // 	const { _elements } = this;
        // 	// The inverted 2x2 rotation matrix is equal to its transpose: rTrans.
        // 	const rTrans11 = _elements[0], rTrans12 = _elements[3];
        // 	const rTrans21 = _elements[1], rTrans22 = _elements[4];
        // 	// The inverted translation is -rTrans * t.
        // 	const t1 = _elements[2], t2 = _elements[5];
        // 	const t1Inv = -rTrans11 * t1 - rTrans12 * t2;
        // 	const t2Inv = -rTrans21 * t1 - rTrans22 * t2;
        // 	this._set(
        // 		rTrans11, rTrans12, t1Inv,
        // 		rTrans21, rTrans22, t2Inv,
        // 	);
        // 	return this;
        // }
        /**
         * Test if this Matrix3 equals another Matrix3.
         * @param matrix - Matrix3 to test equality with.
         * @returns
         */
        equals(matrix) {
            const elementsA = this.elements;
            const elementsB = matrix.elements;
            for (let i = 0, numElements = elementsA.length; i < numElements; i++) {
                if (elementsA[i] !== elementsB[i])
                    return false;
            }
            return true;
        }
        /**
         * Copy values from a Matrix3 into this Matrix3.
         * @param matrix - Matrix3 to copy.
         * @returns this
         */
        copy(matrix) {
            const { elements } = matrix;
            this._set(elements[0], elements[1], elements[2], elements[3], elements[4], elements[5]);
            this._isIdentity = matrix.isIdentity;
            return this;
        }
        /**
         * Returns a deep copy of this Matrix3.
         */
        clone() {
            const { _elements } = this;
            const clone = new Matrix3(_elements[0], _elements[1], _elements[2], _elements[3], _elements[4], _elements[5], this._isIdentity);
            return clone;
        }
    }

    /**
     * These Matrix4s represent a rigid transform in homogeneous coords,
     * therefore, we assume that the bottom row is [0, 0, 0, 1] and only store 12 elements.
     */
    class Matrix4 {
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
            return Math.abs(n11 - 1) <= NUMERICAL_TOLERANCE && Math.abs(n22 - 1) <= NUMERICAL_TOLERANCE && Math.abs(n33 - 1) <= NUMERICAL_TOLERANCE &&
                Math.abs(n12) <= NUMERICAL_TOLERANCE && Math.abs(n13) <= NUMERICAL_TOLERANCE && Math.abs(n14) <= NUMERICAL_TOLERANCE &&
                Math.abs(n21) <= NUMERICAL_TOLERANCE && Math.abs(n23) <= NUMERICAL_TOLERANCE && Math.abs(n24) <= NUMERICAL_TOLERANCE &&
                Math.abs(n31) <= NUMERICAL_TOLERANCE && Math.abs(n32) <= NUMERICAL_TOLERANCE && Math.abs(n34) <= NUMERICAL_TOLERANCE;
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
        // private _setTranslation(translation: Vector3Readonly) {
        // 	this._set(
        // 		1, 0, 0, translation.x,
        // 		0, 1, 0, translation.y,
        // 		0, 0, 1, translation.z,
        // 	);
        //  this._isIdentity = translation.x === 0 && translation.y === 0 && translation.z === 0;
        // 	return this;
        // }
        /**
         * Set elements of Matrix4 according to rotation about axis.
         * @param axis - Unit vector around which to rotate, must be normalized.
         * @param angle - Angle of rotation in radians.
         * @param offset - Offset vector.
         * @returns this
         */
        setRotationAxisAngleAtOffset(axis, angle, offset) {
            if (angle === 0) {
                return this.setIdentity();
            }
            // To do this we need to calculate T * R * (-T).
            // Based on http://www.gamedev.net/reference/articles/article1199.asp
            // First calc R.
            const c = Math.cos(angle);
            const s = Math.sin(angle);
            const t = 1 - c;
            const x = axis.x, y = axis.y, z = axis.z;
            const t_x = t * x, t_y = t * y;
            const r11 = t_x * x + c, r12 = t_x * y - s * z, r13 = t_x * z + s * y;
            const r21 = t_x * y + s * z, r22 = t_y * y + c, r23 = t_y * z - s * x;
            const r31 = t_x * z - s * y, r32 = t_y * z + s * x, r33 = t * z * z + c;
            if (offset) {
                this._setRotationMatrixAtOffset(r11, r12, r13, r21, r22, r23, r31, r32, r33, offset);
            }
            else {
                this._set(r11, r12, r13, 0, r21, r22, r23, 0, r31, r32, r33, 0);
            }
            this._isIdentity = false;
            return this;
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
                if (elementsA[i] !== elementsB[i])
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

    class Quaternion {
        constructor(x, y, z, w) {
            this._x = x || 0;
            this._y = y || 0;
            this._z = z || 0;
            this._w = w !== undefined ? w : 1;
        }
        /**
         * @private
         */
        set x(x) {
            throw new Error('No x setter on Quaternion.');
        }
        get x() {
            return this._x;
        }
        /**
         * @private
         */
        set y(y) {
            throw new Error('No y setter on Quaternion.');
        }
        get y() {
            return this._y;
        }
        /**
         * @private
         */
        set z(z) {
            throw new Error('No z setter on Quaternion.');
        }
        get z() {
            return this._z;
        }
        /**
         * @private
         */
        set w(w) {
            throw new Error('No w setter on Quaternion.');
        }
        get w() {
            return this._w;
        }
        /**
         * Set quaternion from two unit vectors.
         * @param vFrom - From unit vector (normalized).
         * @param vTo - To unit vector (normalized).
         * @returns this
         */
        setFromUnitVectors(vFrom, vTo) {
            let r = vFrom.x * vTo.x + vFrom.y * vTo.y + vFrom.z * vTo.z + 1;
            if (r <= Number.EPSILON) { // TODO: better epsilon?
                // vFrom and vTo point in opposite directions.
                r = 0;
                if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
                    this._x = -vFrom.y;
                    this._y = vFrom.x;
                    this._z = 0;
                    this._w = r;
                }
                else {
                    this._x = 0;
                    this._y = -vFrom.z;
                    this._z = vFrom.y;
                    this._w = r;
                }
            }
            else {
                // crossVectors( vFrom, vTo );
                this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
                this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
                this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
                this._w = r;
            }
            return this.normalize();
        }
        /**
         * Returns the squared length of the Quaternion.
         */
        lengthSq() {
            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
        }
        /**
         * Returns the length of the Quaternion.
         */
        length() {
            return Math.sqrt(this.lengthSq());
        }
        /**
         * Normalize the length of this Quaternion.
         * @returns this
         */
        normalize() {
            let l = this.length();
            if (l === 0) {
                console.warn('Attempting to normalize zero length Quaternion.');
                this._x = 0;
                this._y = 0;
                this._z = 0;
                this._w = 1;
            }
            else {
                l = 1 / l;
                this._x = this._x * l;
                this._y = this._y * l;
                this._z = this._z * l;
                this._w = this._w * l;
            }
            return this;
        }
        /**
         * In place quaternion multiplication of this Quaternion (A) with another Quaternion (B).
         * Sets value of this Quaternion to A*B.
         * @param quat - Quaternion to multiply with.
         * @returns this
         */
        multiply(quat) {
            return Quaternion._multiplyQuaternions(this, this, quat);
        }
        /**
         * In place quaternion multiplication of this Quaternion (A) with another Quaternion (B).
         * Sets value of this Quaternion to B*A.
         * @param quat - Quaternion to premultiply with.
         * @returns this
         */
        premultiply(quat) {
            return Quaternion._multiplyQuaternions(this, quat, this);
        }
        /**
         * Quaternion multiplication.
         */
        static _multiplyQuaternions(self, quatA, quatB) {
            // From http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
            const qax = quatA.x, qay = quatA.y, qaz = quatA.z, qaw = quatA.w;
            const qbx = quatB.x, qby = quatB.y, qbz = quatB.z, qbw = quatB.w;
            self._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
            self._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
            self._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
            self._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
            return self;
        }
        /**
         * Copy the contents of a Quaternion to this Quaternion.
         * @param quaternion - Quaternion to copy.
         * @returns this
         */
        copy(quaternion) {
            this._x = quaternion.x;
            this._y = quaternion.y;
            this._z = quaternion.z;
            this._w = quaternion.w;
            return this;
        }
        /**
         * Clone this Quaternion into a new Quaternion.
         */
        clone() {
            return new Quaternion(this._x, this._y, this._z, this._w);
        }
    }

    exports.Matrix3 = Matrix3;
    exports.Matrix4 = Matrix4;
    exports.NUMERICAL_TOLERANCE = NUMERICAL_TOLERANCE;
    exports.Quaternion = Quaternion;
    exports.Vector2 = Vector2;
    exports.Vector3 = Vector3;
    exports.clampValue = clampValue;
    exports.degreesToRadians = degreesToRadians;
    exports.radiansToDegrees = radiansToDegrees;
    exports.roundValueToIncrement = roundValueToIncrement;

}));
//# sourceMappingURL=vector-math.js.map
