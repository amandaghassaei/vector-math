(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VECTOR_MATH = {}));
})(this, (function (exports) { 'use strict';

    /**
     * Default numerical tolerance for all mathematical operations and equality checks.
     */
    const DEFAULT_NUMERICAL_TOLERANCE = 1e-15;
    let numericalTolerance = DEFAULT_NUMERICAL_TOLERANCE;
    /**
     * Set global numerical tolerance for all mathematical operations and equality checks.
     * Default numerical tolerance is 1e-15.
     * @param tolerance - Numerical tolerance to set.
     */
    function setNumericalTolerance(tolerance) {
        numericalTolerance = tolerance;
    }
    /**
     * Get global numerical tolerance for all mathematical operations and equality checks.
     */
    function NUMERICAL_TOLERANCE() {
        return numericalTolerance;
    }

    /**
     * Clamp a value between a minimum and maximum value.
     * @param value - The value to clamp.
     * @param min - The minimum value.
     * @param max - The maximum value.
     * @returns The clamped value.
     */
    function clampValue(value, min, max) {
        return Math.max(Math.min(value, max), min);
    }
    /**
     * Convert a value in radians to degrees.
     * @param value - The value in radians.
     * @returns The value in degrees.
     */
    function radiansToDegrees(value) {
        return value * 180 / Math.PI;
    }
    /**
     * Convert a value in degrees to radians.
     * @param value - The value in degrees.
     * @returns The value in radians.
     */
    function degreesToRadians(value) {
        return value / 180 * Math.PI;
    }
    /**
     * Round value to increment, if increment is 0, return value.
     * @param value - The value to round.
     * @param coarseStep - The increment to round to.
     * @returns The rounded value.
     */
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

    function getStackTraceAsString() {
        try {
            throw new Error('');
        }
        catch (error) {
            /* c8 ignore next 1 */
            const stackString = error.stack || '';
            const stack = stackString.split('\n').map((line) => line.trim());
            stack.splice(0, 2); // Remove first two elements (just points to this function).
            return stack.join('\n');
        }
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
         * Set the contents of a Vector3 from an array.
         * @param array - Array containing x, and y components.
         * @returns this
         */
        setFromArray(array) {
            this.x = array[0];
            this.y = array[1];
            return this;
        }
        /**
         * Fill all components of this Vector2 with the same value.
         * @param value - Value to fill all components with.
         * @returns
         */
        fill(value) {
            this.x = value;
            this.y = value;
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
            if (Math.abs(scalar) <= NUMERICAL_TOLERANCE())
                console.warn(`Dividing by zero in Vector2.divideScalar(), stack trace:\n${getStackTraceAsString()}.`);
            return this.multiplyScalar(1 / scalar);
        }
        /**
         * Returns the dot product of this Vector2 with another Vector2.
         * @param vec - Vector2 to dot with.
         * @returns The dot product.
         */
        dot(vec) {
            return this.x * vec.x + this.y * vec.y;
        }
        /**
         * Returns the dot product of two Vector2s.
         * @param vec1 - First Vector2.
         * @param vec2 - Second Vector2.
         * @returns The dot product.
         */
        static dot(vec1, vec2) {
            return vec1.x * vec2.x + vec1.y * vec2.y;
        }
        /**
         * Compute the 2D cross product (wedge product) with another Vector2.
         * @param vec - Vector2 to cross.
         * @returns The cross product.
         */
        cross(vec) {
            return this.x * vec.y - this.y * vec.x;
        }
        /**
         * Compute the 2D cross product (wedge product) of two Vector2s.
         * @param vec1 - First Vector2.
         * @param vec2 - Second Vector2.
         * @returns The cross product.
         */
        static cross(vec1, vec2) {
            return vec1.x * vec2.y - vec1.y * vec2.x;
        }
        /**
         * Get the angle of this Vector2.
         * Computes the angle in radians with respect to the positive x-axis.
         * Angle is always in range [0, 2 * Math.PI] (and 2 * Math.PI is slightly less than 2 * PI).
         * @returns The angle.
         */
        angle() {
            return Math.atan2(-this.y, -this.x) + Math.PI;
        }
        /**
         * Returns the squared length of the Vector2.
         * @returns The squared length.
         */
        lengthSq() {
            const lengthSq = this.dot(this);
            return lengthSq;
        }
        /**
         * Returns the length of the Vector2.
         * @returns The length.
         */
        length() {
            return Math.sqrt(this.lengthSq());
        }
        /**
         * Returns the squared distance between this Vector2 and another Vector2.
         * @param vec - Vector2 to measure distance to.
         * @returns The squared distance.
         */
        distanceToSquared(vec) {
            const dx = this.x - vec.x;
            const dy = this.y - vec.y;
            return dx * dx + dy * dy;
        }
        /**
         * Returns the distance between this Vector2 and another Vector2.
         * @param vec - Vector2 to measure distance to.
         * @returns The distance.
         */
        distanceTo(vec) {
            return Math.sqrt(this.distanceToSquared(vec));
        }
        /**
         * Normalize the length of this Vector2.
         * @returns this
         */
        normalize() {
            let length = this.length();
            if (length <= NUMERICAL_TOLERANCE()) {
                console.warn(`Attempting to normalize zero length Vector2, stack trace:\n${getStackTraceAsString()}.`);
                length = 1;
            }
            this.divideScalar(length);
            return this;
        }
        /**
         * Apply Matrix3 transformation to this Vector2.
         * @param matrix - Matrix3 to apply.
         * @returns this
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
         * Linearly interpolate between this Vector2 and another Vector2.
         * @param vector - Vector2 to lerp to.
         * @param t - Interpolation factor between 0 and 1.
         * @returns this
         */
        lerp(vector, t) {
            this.x += (vector.x - this.x) * t;
            this.y += (vector.y - this.y) * t;
            return this;
        }
        /**
         * Average this Vector2 with another Vector2.
         * @param vector - Vector2 to average with.
         * @returns this
         */
        average(vector) {
            this.x = (this.x + vector.x) / 2;
            this.y = (this.y + vector.y) / 2;
            return this;
        }
        /**
         * Min this Vector3 with another Vector3.
         * @param vector - Vector3 to min with.
         * @returns this
         */
        min(vector) {
            this.x = Math.min(this.x, vector.x);
            this.y = Math.min(this.y, vector.y);
            return this;
        }
        /**
         * Max this Vector2 with another Vector2.
         * @param vector - Vector2 to max with.
         * @returns this
         */
        max(vector) {
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
         * @param vector - Vector2 to calculate angle to.
         * @returns The angle between the vectors.
         */
        angleTo(vector) {
            const theta = this.dot(vector) / Math.sqrt(this.lengthSq() * Vector2.dot(vector, vector));
            return Math.acos(Math.min(Math.max(theta, -1), 1));
        }
        /**
         * Calculate the angle between two Vector2s.
         * @param vec1 - First Vector2.
         * @param vec2 - Second Vector2.
         * @returns The angle between the vectors.
         */
        static angleTo(vec1, vec2) {
            const theta = Vector2.dot(vec1, vec2) / Math.sqrt(Vector2.dot(vec1, vec1) * Vector2.dot(vec2, vec2));
            return Math.acos(Math.min(Math.max(theta, -1), 1));
        }
        /**
         * Calculate the angle between this (normalized) Vector2 and another (normalized) Vector2.
         * @param vector - Vector2 to calculate angle to.
         * @returns The angle between the vectors.
         */
        angleToNormalized(vector) {
            const theta = this.dot(vector);
            return Math.acos(Math.min(Math.max(theta, -1), 1));
        }
        /**
         * Calculate the angle between a (normalized) Vector2 and another (normalized) Vector2.
         * @param vec1 - First Vector2.
         * @param vec2 - Second Vector2.
         * @returns The angle between the vectors.
         */
        static angleToNormalized(vec1, vec2) {
            const theta = Vector2.dot(vec1, vec2);
            return Math.acos(Math.min(Math.max(theta, -1), 1));
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
         * @param tolerance - Optional numerical tolerance for equality check, defaults to global numerical tolerance.
         * @returns True if the vectors are equal.
         */
        equals(vec, tolerance = NUMERICAL_TOLERANCE()) {
            return Math.abs(this.x - vec.x) <= tolerance && Math.abs(this.y - vec.y) <= tolerance;
        }
        /**
         * Test if two Vector2s are equal.
         * @param vec1 - First Vector2.
         * @param vec2 - Second Vector2.
         * @param tolerance - Optional numerical tolerance for equality check, defaults to global numerical tolerance.
         * @returns True if the vectors are equal.
         */
        static equals(vec1, vec2, tolerance = NUMERICAL_TOLERANCE()) {
            return Math.abs(vec1.x - vec2.x) <= tolerance && Math.abs(vec1.y - vec2.y) <= tolerance;
        }
        /**
         * Test if this vector is the zero vector.
         * @param tolerance - Optional numerical tolerance for zero check, defaults to global numerical tolerance.
         * @returns True if the vector is the zero vector.
         */
        isZero(tolerance = NUMERICAL_TOLERANCE()) {
            return Math.abs(this.x) <= tolerance && Math.abs(this.y) <= tolerance;
        }
        /**
         * Clone this Vector2 into a new Vector2.
         * @returns The cloned Vector2.
         */
        clone() {
            return new Vector2(this.x, this.y);
        }
        /**
         * Returns an array containing the x and y components of this Vector3.
         * @returns The Vector2 as an array.
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
         * Set the contents of a Vector3 from an array.
         * @param array - Array containing x, y, and z components.
         * @returns this
         */
        setFromArray(array) {
            this.x = array[0];
            this.y = array[1];
            this.z = array[2];
            return this;
        }
        /**
         * Fill all components of this Vector3 with the same value.
         * @param value - Value to fill all components with.
         * @returns
         */
        fill(value) {
            this.x = value;
            this.y = value;
            this.z = value;
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
            if (Math.abs(scalar) <= NUMERICAL_TOLERANCE())
                console.warn(`Dividing by zero in Vector3.divideScalar(), stack trace:\n${getStackTraceAsString()}.`);
            return this.multiplyScalar(1 / scalar);
        }
        /**
         * Returns the dot product of this Vector3 with another Vector3.
         * @param vec - Vector3 to dot with.
         * @returns dot product of this and vec.
         */
        dot(vec) {
            return Vector3.dot(this, vec);
        }
        /**
         * Returns the dot product of two Vector3s.
         * @param vec1 - First Vector3.
         * @param vec2 - Second Vector3.
         * @returns dot product of vec1 and vec2.
         */
        static dot(vec1, vec2) {
            return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
        }
        /**
         * Cross this Vector3 with another Vector3.
         * @param vec - Vector3 to cross with.
         * @returns this
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
         * @returns Squared length of the Vector3.
         */
        lengthSq() {
            const lengthSq = this.dot(this);
            return lengthSq;
        }
        /**
         * Returns the length of the Vector3.
         * @returns Length of the Vector3.
         */
        length() {
            return Math.sqrt(this.lengthSq());
        }
        /**
        * Returns the squared distance between this Vector3 and another Vector3.
        * @param vec - Vector3 to measure distance to.
        * @returns Squared distance between this and vec.
        */
        distanceToSquared(vec) {
            const dx = this.x - vec.x;
            const dy = this.y - vec.y;
            const dz = this.z - vec.z;
            return dx * dx + dy * dy + dz * dz;
        }
        /**
         * Returns the distance between this Vector3 and another Vector3.
         * @param vec - Vector3 to measure distance to.
         * @returns Distance between this and vec.
         */
        distanceTo(vec) {
            return Math.sqrt(this.distanceToSquared(vec));
        }
        /**
         * Normalize the length of this Vector3.
         * @returns this
         */
        normalize() {
            let length = this.length();
            if (length <= NUMERICAL_TOLERANCE()) {
                console.warn(`Attempting to normalize zero length Vector3, stack trace:\n${getStackTraceAsString()}.`);
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
         * Linearly interpolate between this Vector3 and another Vector3.
         * @param vector - Vector3 to lerp to.
         * @param t - Interpolation factor between 0 and 1.
         * @returns this
         */
        lerp(vector, t) {
            this.x += (vector.x - this.x) * t;
            this.y += (vector.y - this.y) * t;
            this.z += (vector.z - this.z) * t;
            return this;
        }
        /**
         * Average this Vector3 with another Vector3.
         * @param vector - Vector3 to average with.
         * @returns this
         */
        average(vector) {
            this.x = (this.x + vector.x) / 2;
            this.y = (this.y + vector.y) / 2;
            this.z = (this.z + vector.z) / 2;
            return this;
        }
        /**
         * Min this Vector3 with another Vector3.
         * @param vector - Vector3 to min with.
         * @returns this
         */
        min(vector) {
            this.x = Math.min(this.x, vector.x);
            this.y = Math.min(this.y, vector.y);
            this.z = Math.min(this.z, vector.z);
            return this;
        }
        /**
         * Max this Vector3 with another Vector3.
         * @param vector - Vector3 to max with.
         * @returns this
         */
        max(vector) {
            this.x = Math.max(this.x, vector.x);
            this.y = Math.max(this.y, vector.y);
            this.z = Math.max(this.z, vector.z);
            return this;
        }
        /**
         * Invert this Vector3.
         * @returns this
         */
        invert() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this;
        }
        /**
         * Calculate the angle between this Vector3 and another Vector3.
         * @param vector - Vector3 to calculate angle to.
         * @returns Angle between this and vector.
         */
        angleTo(vector) {
            const theta = this.dot(vector) / Math.sqrt(this.lengthSq() * Vector3.dot(vector, vector));
            return Math.acos(Math.min(Math.max(theta, -1), 1));
        }
        /**
         * Calculate the angle between this (normalized) Vector3 and another (normalized) Vector3.
         * @param vector - Vector3 to calculate angle to.
         * @returns Angle between this and vector.
         */
        angleToNormalized(vector) {
            const theta = this.dot(vector);
            return Math.acos(Math.min(Math.max(theta, -1), 1));
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
         * @param tolerance - Defaults to 0.
         * @returns True if the vectors are equal.
         */
        equals(vec, tolerance = NUMERICAL_TOLERANCE()) {
            return Vector3.equals(this, vec, tolerance);
        }
        /**
         * Test if two Vector3s are equal (within numerical tolerance).
         * @param vec1 - First Vector3.
         * @param vec2 - Second Vector3.
         * @param tolerance - Optional numerical tolerance for equality check, defaults to global numerical tolerance.
         * @returns True if the vectors are equal.
         */
        static equals(vec1, vec2, tolerance = NUMERICAL_TOLERANCE()) {
            return (Math.abs(vec1.x - vec2.x) <= tolerance &&
                Math.abs(vec1.y - vec2.y) <= tolerance &&
                Math.abs(vec1.z - vec2.z) <= tolerance);
        }
        /**
         * Test if this vector is the zero vector.
         * @param tolerance - Optional numerical tolerance for zero check, defaults to global numerical tolerance.
         * @returns True if the vector is the zero vector.
         */
        isZero(tolerance = NUMERICAL_TOLERANCE()) {
            return this.x <= tolerance && this.y <= tolerance && this.z <= tolerance;
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
            return Math.abs(n11 - 1) <= NUMERICAL_TOLERANCE() && Math.abs(n22 - 1) <= NUMERICAL_TOLERANCE() &&
                Math.abs(n12) <= NUMERICAL_TOLERANCE() && Math.abs(n13) <= NUMERICAL_TOLERANCE() &&
                Math.abs(n21) <= NUMERICAL_TOLERANCE() && Math.abs(n23) <= NUMERICAL_TOLERANCE();
        }
        /**
         * Set elements of Matrix3 according to rotation.
         * @param angle - Angle of rotation in radians.
         * @returns this
         */
        setRotation(angle) {
            if (Math.abs(angle) <= NUMERICAL_TOLERANCE()) {
                return this.setIdentity();
            }
            const c = Math.cos(angle), s = Math.sin(angle);
            this._set(c, -s, 0, s, c, 0);
            this._isIdentity = false;
            return this;
        }
        /**
         * Set elements of Matrix3 according to translation.
         * @param translation - Translation vector.
         * @returns this
         */
        setTranslation(translation) {
            if (Math.abs(translation.x) <= NUMERICAL_TOLERANCE() && Math.abs(translation.y) <= NUMERICAL_TOLERANCE()) {
                return this.setIdentity();
            }
            this._set(1, 0, translation.x, 0, 1, translation.y);
            this._isIdentity = false;
            return this;
        }
        /**
         * Set elements of Matrix4 according to rotation and translation.
         * @param angle - Angle of rotation in radians.
         * @param translation - Translation vector.
         * @returns this
         */
        setRotationTranslation(angle, translation) {
            if (Math.abs(angle) <= NUMERICAL_TOLERANCE() && Math.abs(translation.x) <= NUMERICAL_TOLERANCE() && Math.abs(translation.y) <= NUMERICAL_TOLERANCE()) {
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
                if (Math.abs(elementsA[i] - elementsB[i]) > NUMERICAL_TOLERANCE())
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

    const tempVector3 = new Vector3();

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
        /**
         * Set elements of Matrix4 according to translation.
         * @param translation - Translation vector.
         * @returns this
         */
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
            // if (matrix instanceof Matrix4) {
            const { elements } = matrix;
            this._set(elements[0], elements[1], elements[2], elements[3], elements[4], elements[5], elements[6], elements[7], elements[8], elements[9], elements[10], elements[11]);
            this._isIdentity = matrix.isIdentity;
            // } else {
            //     const { elements } = matrix;
            //     this._set(
            //         elements[0], elements[4], elements[8], elements[12],
            //         elements[1], elements[5], elements[9], elements[13],
            //         elements[2], elements[6], elements[10], elements[14],
            //     );
            //     this._isIdentity = Matrix4._checkElementsForIdentity(this._elements);
            // }
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
        /**
         * @returns The x component of the Quaternion.
         */
        get x() {
            return this._x;
        }
        /**
         * @private
         */
        set y(y) {
            throw new Error('No y setter on Quaternion.');
        }
        /**
         * @returns The y component of the Quaternion.
         */
        get y() {
            return this._y;
        }
        /**
         * @private
         */
        set z(z) {
            throw new Error('No z setter on Quaternion.');
        }
        /**
         * @returns The z component of the Quaternion.
         */
        get z() {
            return this._z;
        }
        /**
         * @private
         */
        set w(w) {
            throw new Error('No w setter on Quaternion.');
        }
        /**
         * @returns The w component of the Quaternion.
         */
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
            if (l <= NUMERICAL_TOLERANCE()) {
                console.warn(`Attempting to normalize zero length Quaternion, stack trace:\n${getStackTraceAsString()}.`);
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
         * Invert this Quaternion.
         * @returns this
         */
        invert() {
            // Quaternion is assumed to have unit length.
            this._x *= -1;
            this._y *= -1;
            this._z *= -1;
            return this;
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

    exports.DEFAULT_NUMERICAL_TOLERANCE = DEFAULT_NUMERICAL_TOLERANCE;
    exports.Matrix3 = Matrix3;
    exports.Matrix4 = Matrix4;
    exports.Quaternion = Quaternion;
    exports.Vector2 = Vector2;
    exports.Vector3 = Vector3;
    exports.clampValue = clampValue;
    exports.degreesToRadians = degreesToRadians;
    exports.radiansToDegrees = radiansToDegrees;
    exports.roundValueToIncrement = roundValueToIncrement;
    exports.setNumericalTolerance = setNumericalTolerance;

}));
//# sourceMappingURL=vector-math.js.map
