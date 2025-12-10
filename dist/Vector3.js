import { getStackTraceAsString } from './utils';
import { NUMERICAL_TOLERANCE } from './constants';
export class Vector3 {
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
        const length = this.length();
        if (length <= NUMERICAL_TOLERANCE()) {
            console.warn(`Attempting to normalize zero length Vector3, stack trace:\n${getStackTraceAsString()}.`);
            return this;
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
        return this.lengthSq() <= tolerance * tolerance;
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
//# sourceMappingURL=Vector3.js.map