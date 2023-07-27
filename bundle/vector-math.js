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

    let Vector3$1 = class Vector3 {
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
    };

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
     * @license
     * Copyright 2010-2023 Three.js Authors
     * SPDX-License-Identifier: MIT
     */
    const REVISION = '153';

    function clamp( value, min, max ) {

    	return Math.max( min, Math.min( max, value ) );

    }

    let Quaternion$1 = class Quaternion {

    	constructor( x = 0, y = 0, z = 0, w = 1 ) {

    		this.isQuaternion = true;

    		this._x = x;
    		this._y = y;
    		this._z = z;
    		this._w = w;

    	}

    	static slerpFlat( dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t ) {

    		// fuzz-free, array-based Quaternion SLERP operation

    		let x0 = src0[ srcOffset0 + 0 ],
    			y0 = src0[ srcOffset0 + 1 ],
    			z0 = src0[ srcOffset0 + 2 ],
    			w0 = src0[ srcOffset0 + 3 ];

    		const x1 = src1[ srcOffset1 + 0 ],
    			y1 = src1[ srcOffset1 + 1 ],
    			z1 = src1[ srcOffset1 + 2 ],
    			w1 = src1[ srcOffset1 + 3 ];

    		if ( t === 0 ) {

    			dst[ dstOffset + 0 ] = x0;
    			dst[ dstOffset + 1 ] = y0;
    			dst[ dstOffset + 2 ] = z0;
    			dst[ dstOffset + 3 ] = w0;
    			return;

    		}

    		if ( t === 1 ) {

    			dst[ dstOffset + 0 ] = x1;
    			dst[ dstOffset + 1 ] = y1;
    			dst[ dstOffset + 2 ] = z1;
    			dst[ dstOffset + 3 ] = w1;
    			return;

    		}

    		if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

    			let s = 1 - t;
    			const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
    				dir = ( cos >= 0 ? 1 : - 1 ),
    				sqrSin = 1 - cos * cos;

    			// Skip the Slerp for tiny steps to avoid numeric problems:
    			if ( sqrSin > Number.EPSILON ) {

    				const sin = Math.sqrt( sqrSin ),
    					len = Math.atan2( sin, cos * dir );

    				s = Math.sin( s * len ) / sin;
    				t = Math.sin( t * len ) / sin;

    			}

    			const tDir = t * dir;

    			x0 = x0 * s + x1 * tDir;
    			y0 = y0 * s + y1 * tDir;
    			z0 = z0 * s + z1 * tDir;
    			w0 = w0 * s + w1 * tDir;

    			// Normalize in case we just did a lerp:
    			if ( s === 1 - t ) {

    				const f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );

    				x0 *= f;
    				y0 *= f;
    				z0 *= f;
    				w0 *= f;

    			}

    		}

    		dst[ dstOffset ] = x0;
    		dst[ dstOffset + 1 ] = y0;
    		dst[ dstOffset + 2 ] = z0;
    		dst[ dstOffset + 3 ] = w0;

    	}

    	static multiplyQuaternionsFlat( dst, dstOffset, src0, srcOffset0, src1, srcOffset1 ) {

    		const x0 = src0[ srcOffset0 ];
    		const y0 = src0[ srcOffset0 + 1 ];
    		const z0 = src0[ srcOffset0 + 2 ];
    		const w0 = src0[ srcOffset0 + 3 ];

    		const x1 = src1[ srcOffset1 ];
    		const y1 = src1[ srcOffset1 + 1 ];
    		const z1 = src1[ srcOffset1 + 2 ];
    		const w1 = src1[ srcOffset1 + 3 ];

    		dst[ dstOffset ] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
    		dst[ dstOffset + 1 ] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
    		dst[ dstOffset + 2 ] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
    		dst[ dstOffset + 3 ] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;

    		return dst;

    	}

    	get x() {

    		return this._x;

    	}

    	set x( value ) {

    		this._x = value;
    		this._onChangeCallback();

    	}

    	get y() {

    		return this._y;

    	}

    	set y( value ) {

    		this._y = value;
    		this._onChangeCallback();

    	}

    	get z() {

    		return this._z;

    	}

    	set z( value ) {

    		this._z = value;
    		this._onChangeCallback();

    	}

    	get w() {

    		return this._w;

    	}

    	set w( value ) {

    		this._w = value;
    		this._onChangeCallback();

    	}

    	set( x, y, z, w ) {

    		this._x = x;
    		this._y = y;
    		this._z = z;
    		this._w = w;

    		this._onChangeCallback();

    		return this;

    	}

    	clone() {

    		return new this.constructor( this._x, this._y, this._z, this._w );

    	}

    	copy( quaternion ) {

    		this._x = quaternion.x;
    		this._y = quaternion.y;
    		this._z = quaternion.z;
    		this._w = quaternion.w;

    		this._onChangeCallback();

    		return this;

    	}

    	setFromEuler( euler, update ) {

    		const x = euler._x, y = euler._y, z = euler._z, order = euler._order;

    		// http://www.mathworks.com/matlabcentral/fileexchange/
    		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
    		//	content/SpinCalc.m

    		const cos = Math.cos;
    		const sin = Math.sin;

    		const c1 = cos( x / 2 );
    		const c2 = cos( y / 2 );
    		const c3 = cos( z / 2 );

    		const s1 = sin( x / 2 );
    		const s2 = sin( y / 2 );
    		const s3 = sin( z / 2 );

    		switch ( order ) {

    			case 'XYZ':
    				this._x = s1 * c2 * c3 + c1 * s2 * s3;
    				this._y = c1 * s2 * c3 - s1 * c2 * s3;
    				this._z = c1 * c2 * s3 + s1 * s2 * c3;
    				this._w = c1 * c2 * c3 - s1 * s2 * s3;
    				break;

    			case 'YXZ':
    				this._x = s1 * c2 * c3 + c1 * s2 * s3;
    				this._y = c1 * s2 * c3 - s1 * c2 * s3;
    				this._z = c1 * c2 * s3 - s1 * s2 * c3;
    				this._w = c1 * c2 * c3 + s1 * s2 * s3;
    				break;

    			case 'ZXY':
    				this._x = s1 * c2 * c3 - c1 * s2 * s3;
    				this._y = c1 * s2 * c3 + s1 * c2 * s3;
    				this._z = c1 * c2 * s3 + s1 * s2 * c3;
    				this._w = c1 * c2 * c3 - s1 * s2 * s3;
    				break;

    			case 'ZYX':
    				this._x = s1 * c2 * c3 - c1 * s2 * s3;
    				this._y = c1 * s2 * c3 + s1 * c2 * s3;
    				this._z = c1 * c2 * s3 - s1 * s2 * c3;
    				this._w = c1 * c2 * c3 + s1 * s2 * s3;
    				break;

    			case 'YZX':
    				this._x = s1 * c2 * c3 + c1 * s2 * s3;
    				this._y = c1 * s2 * c3 + s1 * c2 * s3;
    				this._z = c1 * c2 * s3 - s1 * s2 * c3;
    				this._w = c1 * c2 * c3 - s1 * s2 * s3;
    				break;

    			case 'XZY':
    				this._x = s1 * c2 * c3 - c1 * s2 * s3;
    				this._y = c1 * s2 * c3 - s1 * c2 * s3;
    				this._z = c1 * c2 * s3 + s1 * s2 * c3;
    				this._w = c1 * c2 * c3 + s1 * s2 * s3;
    				break;

    			default:
    				console.warn( 'THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order );

    		}

    		if ( update !== false ) this._onChangeCallback();

    		return this;

    	}

    	setFromAxisAngle( axis, angle ) {

    		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

    		// assumes axis is normalized

    		const halfAngle = angle / 2, s = Math.sin( halfAngle );

    		this._x = axis.x * s;
    		this._y = axis.y * s;
    		this._z = axis.z * s;
    		this._w = Math.cos( halfAngle );

    		this._onChangeCallback();

    		return this;

    	}

    	setFromRotationMatrix( m ) {

    		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

    		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    		const te = m.elements,

    			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
    			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
    			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

    			trace = m11 + m22 + m33;

    		if ( trace > 0 ) {

    			const s = 0.5 / Math.sqrt( trace + 1.0 );

    			this._w = 0.25 / s;
    			this._x = ( m32 - m23 ) * s;
    			this._y = ( m13 - m31 ) * s;
    			this._z = ( m21 - m12 ) * s;

    		} else if ( m11 > m22 && m11 > m33 ) {

    			const s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

    			this._w = ( m32 - m23 ) / s;
    			this._x = 0.25 * s;
    			this._y = ( m12 + m21 ) / s;
    			this._z = ( m13 + m31 ) / s;

    		} else if ( m22 > m33 ) {

    			const s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

    			this._w = ( m13 - m31 ) / s;
    			this._x = ( m12 + m21 ) / s;
    			this._y = 0.25 * s;
    			this._z = ( m23 + m32 ) / s;

    		} else {

    			const s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

    			this._w = ( m21 - m12 ) / s;
    			this._x = ( m13 + m31 ) / s;
    			this._y = ( m23 + m32 ) / s;
    			this._z = 0.25 * s;

    		}

    		this._onChangeCallback();

    		return this;

    	}

    	setFromUnitVectors( vFrom, vTo ) {

    		// assumes direction vectors vFrom and vTo are normalized

    		let r = vFrom.dot( vTo ) + 1;

    		if ( r < Number.EPSILON ) {

    			// vFrom and vTo point in opposite directions

    			r = 0;

    			if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

    				this._x = - vFrom.y;
    				this._y = vFrom.x;
    				this._z = 0;
    				this._w = r;

    			} else {

    				this._x = 0;
    				this._y = - vFrom.z;
    				this._z = vFrom.y;
    				this._w = r;

    			}

    		} else {

    			// crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3

    			this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
    			this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
    			this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
    			this._w = r;

    		}

    		return this.normalize();

    	}

    	angleTo( q ) {

    		return 2 * Math.acos( Math.abs( clamp( this.dot( q ), - 1, 1 ) ) );

    	}

    	rotateTowards( q, step ) {

    		const angle = this.angleTo( q );

    		if ( angle === 0 ) return this;

    		const t = Math.min( 1, step / angle );

    		this.slerp( q, t );

    		return this;

    	}

    	identity() {

    		return this.set( 0, 0, 0, 1 );

    	}

    	invert() {

    		// quaternion is assumed to have unit length

    		return this.conjugate();

    	}

    	conjugate() {

    		this._x *= - 1;
    		this._y *= - 1;
    		this._z *= - 1;

    		this._onChangeCallback();

    		return this;

    	}

    	dot( v ) {

    		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

    	}

    	lengthSq() {

    		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

    	}

    	length() {

    		return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

    	}

    	normalize() {

    		let l = this.length();

    		if ( l === 0 ) {

    			this._x = 0;
    			this._y = 0;
    			this._z = 0;
    			this._w = 1;

    		} else {

    			l = 1 / l;

    			this._x = this._x * l;
    			this._y = this._y * l;
    			this._z = this._z * l;
    			this._w = this._w * l;

    		}

    		this._onChangeCallback();

    		return this;

    	}

    	multiply( q ) {

    		return this.multiplyQuaternions( this, q );

    	}

    	premultiply( q ) {

    		return this.multiplyQuaternions( q, this );

    	}

    	multiplyQuaternions( a, b ) {

    		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

    		const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
    		const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

    		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

    		this._onChangeCallback();

    		return this;

    	}

    	slerp( qb, t ) {

    		if ( t === 0 ) return this;
    		if ( t === 1 ) return this.copy( qb );

    		const x = this._x, y = this._y, z = this._z, w = this._w;

    		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

    		let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

    		if ( cosHalfTheta < 0 ) {

    			this._w = - qb._w;
    			this._x = - qb._x;
    			this._y = - qb._y;
    			this._z = - qb._z;

    			cosHalfTheta = - cosHalfTheta;

    		} else {

    			this.copy( qb );

    		}

    		if ( cosHalfTheta >= 1.0 ) {

    			this._w = w;
    			this._x = x;
    			this._y = y;
    			this._z = z;

    			return this;

    		}

    		const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

    		if ( sqrSinHalfTheta <= Number.EPSILON ) {

    			const s = 1 - t;
    			this._w = s * w + t * this._w;
    			this._x = s * x + t * this._x;
    			this._y = s * y + t * this._y;
    			this._z = s * z + t * this._z;

    			this.normalize();
    			this._onChangeCallback();

    			return this;

    		}

    		const sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
    		const halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
    		const ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
    			ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

    		this._w = ( w * ratioA + this._w * ratioB );
    		this._x = ( x * ratioA + this._x * ratioB );
    		this._y = ( y * ratioA + this._y * ratioB );
    		this._z = ( z * ratioA + this._z * ratioB );

    		this._onChangeCallback();

    		return this;

    	}

    	slerpQuaternions( qa, qb, t ) {

    		return this.copy( qa ).slerp( qb, t );

    	}

    	random() {

    		// Derived from http://planning.cs.uiuc.edu/node198.html
    		// Note, this source uses w, x, y, z ordering,
    		// so we swap the order below.

    		const u1 = Math.random();
    		const sqrt1u1 = Math.sqrt( 1 - u1 );
    		const sqrtu1 = Math.sqrt( u1 );

    		const u2 = 2 * Math.PI * Math.random();

    		const u3 = 2 * Math.PI * Math.random();

    		return this.set(
    			sqrt1u1 * Math.cos( u2 ),
    			sqrtu1 * Math.sin( u3 ),
    			sqrtu1 * Math.cos( u3 ),
    			sqrt1u1 * Math.sin( u2 ),
    		);

    	}

    	equals( quaternion ) {

    		return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

    	}

    	fromArray( array, offset = 0 ) {

    		this._x = array[ offset ];
    		this._y = array[ offset + 1 ];
    		this._z = array[ offset + 2 ];
    		this._w = array[ offset + 3 ];

    		this._onChangeCallback();

    		return this;

    	}

    	toArray( array = [], offset = 0 ) {

    		array[ offset ] = this._x;
    		array[ offset + 1 ] = this._y;
    		array[ offset + 2 ] = this._z;
    		array[ offset + 3 ] = this._w;

    		return array;

    	}

    	fromBufferAttribute( attribute, index ) {

    		this._x = attribute.getX( index );
    		this._y = attribute.getY( index );
    		this._z = attribute.getZ( index );
    		this._w = attribute.getW( index );

    		return this;

    	}

    	toJSON() {

    		return this.toArray();

    	}

    	_onChange( callback ) {

    		this._onChangeCallback = callback;

    		return this;

    	}

    	_onChangeCallback() {}

    	*[ Symbol.iterator ]() {

    		yield this._x;
    		yield this._y;
    		yield this._z;
    		yield this._w;

    	}

    };

    class Vector3 {

    	constructor( x = 0, y = 0, z = 0 ) {

    		Vector3.prototype.isVector3 = true;

    		this.x = x;
    		this.y = y;
    		this.z = z;

    	}

    	set( x, y, z ) {

    		if ( z === undefined ) z = this.z; // sprite.scale.set(x,y)

    		this.x = x;
    		this.y = y;
    		this.z = z;

    		return this;

    	}

    	setScalar( scalar ) {

    		this.x = scalar;
    		this.y = scalar;
    		this.z = scalar;

    		return this;

    	}

    	setX( x ) {

    		this.x = x;

    		return this;

    	}

    	setY( y ) {

    		this.y = y;

    		return this;

    	}

    	setZ( z ) {

    		this.z = z;

    		return this;

    	}

    	setComponent( index, value ) {

    		switch ( index ) {

    			case 0: this.x = value; break;
    			case 1: this.y = value; break;
    			case 2: this.z = value; break;
    			default: throw new Error( 'index is out of range: ' + index );

    		}

    		return this;

    	}

    	getComponent( index ) {

    		switch ( index ) {

    			case 0: return this.x;
    			case 1: return this.y;
    			case 2: return this.z;
    			default: throw new Error( 'index is out of range: ' + index );

    		}

    	}

    	clone() {

    		return new this.constructor( this.x, this.y, this.z );

    	}

    	copy( v ) {

    		this.x = v.x;
    		this.y = v.y;
    		this.z = v.z;

    		return this;

    	}

    	add( v ) {

    		this.x += v.x;
    		this.y += v.y;
    		this.z += v.z;

    		return this;

    	}

    	addScalar( s ) {

    		this.x += s;
    		this.y += s;
    		this.z += s;

    		return this;

    	}

    	addVectors( a, b ) {

    		this.x = a.x + b.x;
    		this.y = a.y + b.y;
    		this.z = a.z + b.z;

    		return this;

    	}

    	addScaledVector( v, s ) {

    		this.x += v.x * s;
    		this.y += v.y * s;
    		this.z += v.z * s;

    		return this;

    	}

    	sub( v ) {

    		this.x -= v.x;
    		this.y -= v.y;
    		this.z -= v.z;

    		return this;

    	}

    	subScalar( s ) {

    		this.x -= s;
    		this.y -= s;
    		this.z -= s;

    		return this;

    	}

    	subVectors( a, b ) {

    		this.x = a.x - b.x;
    		this.y = a.y - b.y;
    		this.z = a.z - b.z;

    		return this;

    	}

    	multiply( v ) {

    		this.x *= v.x;
    		this.y *= v.y;
    		this.z *= v.z;

    		return this;

    	}

    	multiplyScalar( scalar ) {

    		this.x *= scalar;
    		this.y *= scalar;
    		this.z *= scalar;

    		return this;

    	}

    	multiplyVectors( a, b ) {

    		this.x = a.x * b.x;
    		this.y = a.y * b.y;
    		this.z = a.z * b.z;

    		return this;

    	}

    	applyEuler( euler ) {

    		return this.applyQuaternion( _quaternion$4.setFromEuler( euler ) );

    	}

    	applyAxisAngle( axis, angle ) {

    		return this.applyQuaternion( _quaternion$4.setFromAxisAngle( axis, angle ) );

    	}

    	applyMatrix3( m ) {

    		const x = this.x, y = this.y, z = this.z;
    		const e = m.elements;

    		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
    		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
    		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

    		return this;

    	}

    	applyNormalMatrix( m ) {

    		return this.applyMatrix3( m ).normalize();

    	}

    	applyMatrix4( m ) {

    		const x = this.x, y = this.y, z = this.z;
    		const e = m.elements;

    		const w = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] );

    		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * w;
    		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * w;
    		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * w;

    		return this;

    	}

    	applyQuaternion( q ) {

    		const x = this.x, y = this.y, z = this.z;
    		const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

    		// calculate quat * vector

    		const ix = qw * x + qy * z - qz * y;
    		const iy = qw * y + qz * x - qx * z;
    		const iz = qw * z + qx * y - qy * x;
    		const iw = - qx * x - qy * y - qz * z;

    		// calculate result * inverse quat

    		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
    		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
    		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

    		return this;

    	}

    	project( camera ) {

    		return this.applyMatrix4( camera.matrixWorldInverse ).applyMatrix4( camera.projectionMatrix );

    	}

    	unproject( camera ) {

    		return this.applyMatrix4( camera.projectionMatrixInverse ).applyMatrix4( camera.matrixWorld );

    	}

    	transformDirection( m ) {

    		// input: THREE.Matrix4 affine matrix
    		// vector interpreted as a direction

    		const x = this.x, y = this.y, z = this.z;
    		const e = m.elements;

    		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z;
    		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z;
    		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

    		return this.normalize();

    	}

    	divide( v ) {

    		this.x /= v.x;
    		this.y /= v.y;
    		this.z /= v.z;

    		return this;

    	}

    	divideScalar( scalar ) {

    		return this.multiplyScalar( 1 / scalar );

    	}

    	min( v ) {

    		this.x = Math.min( this.x, v.x );
    		this.y = Math.min( this.y, v.y );
    		this.z = Math.min( this.z, v.z );

    		return this;

    	}

    	max( v ) {

    		this.x = Math.max( this.x, v.x );
    		this.y = Math.max( this.y, v.y );
    		this.z = Math.max( this.z, v.z );

    		return this;

    	}

    	clamp( min, max ) {

    		// assumes min < max, componentwise

    		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
    		this.y = Math.max( min.y, Math.min( max.y, this.y ) );
    		this.z = Math.max( min.z, Math.min( max.z, this.z ) );

    		return this;

    	}

    	clampScalar( minVal, maxVal ) {

    		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
    		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
    		this.z = Math.max( minVal, Math.min( maxVal, this.z ) );

    		return this;

    	}

    	clampLength( min, max ) {

    		const length = this.length();

    		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

    	}

    	floor() {

    		this.x = Math.floor( this.x );
    		this.y = Math.floor( this.y );
    		this.z = Math.floor( this.z );

    		return this;

    	}

    	ceil() {

    		this.x = Math.ceil( this.x );
    		this.y = Math.ceil( this.y );
    		this.z = Math.ceil( this.z );

    		return this;

    	}

    	round() {

    		this.x = Math.round( this.x );
    		this.y = Math.round( this.y );
    		this.z = Math.round( this.z );

    		return this;

    	}

    	roundToZero() {

    		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
    		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
    		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

    		return this;

    	}

    	negate() {

    		this.x = - this.x;
    		this.y = - this.y;
    		this.z = - this.z;

    		return this;

    	}

    	dot( v ) {

    		return this.x * v.x + this.y * v.y + this.z * v.z;

    	}

    	// TODO lengthSquared?

    	lengthSq() {

    		return this.x * this.x + this.y * this.y + this.z * this.z;

    	}

    	length() {

    		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

    	}

    	manhattanLength() {

    		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

    	}

    	normalize() {

    		return this.divideScalar( this.length() || 1 );

    	}

    	setLength( length ) {

    		return this.normalize().multiplyScalar( length );

    	}

    	lerp( v, alpha ) {

    		this.x += ( v.x - this.x ) * alpha;
    		this.y += ( v.y - this.y ) * alpha;
    		this.z += ( v.z - this.z ) * alpha;

    		return this;

    	}

    	lerpVectors( v1, v2, alpha ) {

    		this.x = v1.x + ( v2.x - v1.x ) * alpha;
    		this.y = v1.y + ( v2.y - v1.y ) * alpha;
    		this.z = v1.z + ( v2.z - v1.z ) * alpha;

    		return this;

    	}

    	cross( v ) {

    		return this.crossVectors( this, v );

    	}

    	crossVectors( a, b ) {

    		const ax = a.x, ay = a.y, az = a.z;
    		const bx = b.x, by = b.y, bz = b.z;

    		this.x = ay * bz - az * by;
    		this.y = az * bx - ax * bz;
    		this.z = ax * by - ay * bx;

    		return this;

    	}

    	projectOnVector( v ) {

    		const denominator = v.lengthSq();

    		if ( denominator === 0 ) return this.set( 0, 0, 0 );

    		const scalar = v.dot( this ) / denominator;

    		return this.copy( v ).multiplyScalar( scalar );

    	}

    	projectOnPlane( planeNormal ) {

    		_vector$b.copy( this ).projectOnVector( planeNormal );

    		return this.sub( _vector$b );

    	}

    	reflect( normal ) {

    		// reflect incident vector off plane orthogonal to normal
    		// normal is assumed to have unit length

    		return this.sub( _vector$b.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

    	}

    	angleTo( v ) {

    		const denominator = Math.sqrt( this.lengthSq() * v.lengthSq() );

    		if ( denominator === 0 ) return Math.PI / 2;

    		const theta = this.dot( v ) / denominator;

    		// clamp, to handle numerical problems

    		return Math.acos( clamp( theta, - 1, 1 ) );

    	}

    	distanceTo( v ) {

    		return Math.sqrt( this.distanceToSquared( v ) );

    	}

    	distanceToSquared( v ) {

    		const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

    		return dx * dx + dy * dy + dz * dz;

    	}

    	manhattanDistanceTo( v ) {

    		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );

    	}

    	setFromSpherical( s ) {

    		return this.setFromSphericalCoords( s.radius, s.phi, s.theta );

    	}

    	setFromSphericalCoords( radius, phi, theta ) {

    		const sinPhiRadius = Math.sin( phi ) * radius;

    		this.x = sinPhiRadius * Math.sin( theta );
    		this.y = Math.cos( phi ) * radius;
    		this.z = sinPhiRadius * Math.cos( theta );

    		return this;

    	}

    	setFromCylindrical( c ) {

    		return this.setFromCylindricalCoords( c.radius, c.theta, c.y );

    	}

    	setFromCylindricalCoords( radius, theta, y ) {

    		this.x = radius * Math.sin( theta );
    		this.y = y;
    		this.z = radius * Math.cos( theta );

    		return this;

    	}

    	setFromMatrixPosition( m ) {

    		const e = m.elements;

    		this.x = e[ 12 ];
    		this.y = e[ 13 ];
    		this.z = e[ 14 ];

    		return this;

    	}

    	setFromMatrixScale( m ) {

    		const sx = this.setFromMatrixColumn( m, 0 ).length();
    		const sy = this.setFromMatrixColumn( m, 1 ).length();
    		const sz = this.setFromMatrixColumn( m, 2 ).length();

    		this.x = sx;
    		this.y = sy;
    		this.z = sz;

    		return this;

    	}

    	setFromMatrixColumn( m, index ) {

    		return this.fromArray( m.elements, index * 4 );

    	}

    	setFromMatrix3Column( m, index ) {

    		return this.fromArray( m.elements, index * 3 );

    	}

    	setFromEuler( e ) {

    		this.x = e._x;
    		this.y = e._y;
    		this.z = e._z;

    		return this;

    	}

    	setFromColor( c ) {

    		this.x = c.r;
    		this.y = c.g;
    		this.z = c.b;

    		return this;

    	}

    	equals( v ) {

    		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

    	}

    	fromArray( array, offset = 0 ) {

    		this.x = array[ offset ];
    		this.y = array[ offset + 1 ];
    		this.z = array[ offset + 2 ];

    		return this;

    	}

    	toArray( array = [], offset = 0 ) {

    		array[ offset ] = this.x;
    		array[ offset + 1 ] = this.y;
    		array[ offset + 2 ] = this.z;

    		return array;

    	}

    	fromBufferAttribute( attribute, index ) {

    		this.x = attribute.getX( index );
    		this.y = attribute.getY( index );
    		this.z = attribute.getZ( index );

    		return this;

    	}

    	random() {

    		this.x = Math.random();
    		this.y = Math.random();
    		this.z = Math.random();

    		return this;

    	}

    	randomDirection() {

    		// Derived from https://mathworld.wolfram.com/SpherePointPicking.html

    		const u = ( Math.random() - 0.5 ) * 2;
    		const t = Math.random() * Math.PI * 2;
    		const f = Math.sqrt( 1 - u ** 2 );

    		this.x = f * Math.cos( t );
    		this.y = f * Math.sin( t );
    		this.z = u;

    		return this;

    	}

    	*[ Symbol.iterator ]() {

    		yield this.x;
    		yield this.y;
    		yield this.z;

    	}

    }

    const _vector$b = /*@__PURE__*/ new Vector3();
    const _quaternion$4 = /*@__PURE__*/ new Quaternion$1();

    if ( typeof __THREE_DEVTOOLS__ !== 'undefined' ) {

    	__THREE_DEVTOOLS__.dispatchEvent( new CustomEvent( 'register', { detail: {
    		revision: REVISION,
    	} } ) );

    }

    if ( typeof window !== 'undefined' ) {

    	if ( window.__THREE__ ) {

    		console.warn( 'WARNING: Multiple instances of Three.js being imported.' );

    	} else {

    		window.__THREE__ = REVISION;

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
            const cosAngle = Math.cos(angle);
            const sinAngle = Math.sin(angle);
            return this._setRotationAxisCosSin(cosAngle, sinAngle, axis, offset);
        }
        setRotationFromVectorToVector(fromVector, toVector, offset) {
            if (fromVector.equals(toVector)) {
                return this.setIdentity();
            }
            const axis = tempVector3.crossVectors(fromVector, toVector);
            const sinAngle = axis.length();
            axis.divideScalar(sinAngle); // Normalize axis.
            const cosAngle = fromVector.dot(toVector);
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
    exports.Vector3 = Vector3$1;
    exports.clampValue = clampValue;
    exports.degreesToRadians = degreesToRadians;
    exports.radiansToDegrees = radiansToDegrees;
    exports.roundValueToIncrement = roundValueToIncrement;

}));
//# sourceMappingURL=vector-math.js.map
