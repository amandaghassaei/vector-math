import type { Vector3Readonly } from './Vector3';
import type {
	Quaternion as THREE_Quaternion,
	Vector3 as THREE_Vector3,
} from 'three';
import { getStackTraceAsString } from './utils';

export type QuaternionReadonly = {
	readonly x: number;
	readonly y: number;
	readonly z: number;
	readonly w: number;
	readonly lengthSq: () => number;
	readonly length: () => number;
	readonly clone: () => Quaternion;
}

export class Quaternion {
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
	constructor(x?: number, y?: number, z?: number, w?: number) {
		this._x = x || 0;
		this._y = y || 0;
		this._z = z || 0;
		this._w = w !== undefined ? w : 1;
	}

	/**
	 * @private
	 */
	set x(x: number) {
		throw new Error('No x setter on Quaternion.');
	}

	get x() {
		return this._x;
	}

	/**
	 * @private
	 */
	set y(y: number) {
		throw new Error('No y setter on Quaternion.');
	}

	get y() {
		return this._y;
	}

	/**
	 * @private
	 */
	set z(z: number) {
		throw new Error('No z setter on Quaternion.');
	}

	get z() {
		return this._z;
	}

	/**
	 * @private
	 */
	set w(w: number) {
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
	setFromUnitVectors(
		vFrom: Vector3Readonly | THREE_Vector3,
		vTo: Vector3Readonly | THREE_Vector3,
	) {
		let r = vFrom.x * vTo.x + vFrom.y * vTo.y + vFrom.z * vTo.z + 1;
		if ( r <= Number.EPSILON ) { // TODO: better epsilon?
			// vFrom and vTo point in opposite directions.
			r = 0;
			if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
				this._x = -vFrom.y;
				this._y = vFrom.x;
				this._z = 0;
				this._w = r;
			} else {
				this._x = 0;
				this._y = -vFrom.z;
				this._z = vFrom.y;
				this._w = r;
			}
		} else {
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
			console.warn(`Attempting to normalize zero length Quaternion, stack trace:\n${getStackTraceAsString()}.`);
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
		return this;
	}

	/**
	 * In place quaternion multiplication of this Quaternion (A) with another Quaternion (B).
	 * Sets value of this Quaternion to A*B.
	 * @param quat - Quaternion to multiply with.
	 * @returns this
	 */
	multiply(quat: QuaternionReadonly | THREE_Quaternion) {
		return Quaternion._multiplyQuaternions(this, this, quat);

	}

	/**
	 * In place quaternion multiplication of this Quaternion (A) with another Quaternion (B).
	 * Sets value of this Quaternion to B*A.
	 * @param quat - Quaternion to premultiply with.
	 * @returns this
	 */
	premultiply(quat: QuaternionReadonly | THREE_Quaternion) {
		return Quaternion._multiplyQuaternions(this, quat, this);
	}

	/**
	 * Quaternion multiplication.
	 */
	private static _multiplyQuaternions(
		self: Quaternion,
		quatA: QuaternionReadonly | THREE_Quaternion,
		quatB: QuaternionReadonly | THREE_Quaternion,
	) {
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
	copy(quaternion: QuaternionReadonly | THREE_Quaternion) {
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