import { getStackTraceAsString } from './utils';
import { NUMERICAL_TOLERANCE } from './constants';
export class Quaternion {
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
//# sourceMappingURL=Quaternion.js.map