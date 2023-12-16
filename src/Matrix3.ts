import { NUMERICAL_TOLERANCE } from './constants';
import type { Vector2Readonly } from './Vector2';
import type { Vector2 as THREE_Vector2 } from 'three';

export type Matrix3Readonly = {
	readonly elements: readonly number[];
	readonly isIdentity: boolean;
	equals: (matrix: Matrix3Readonly) => boolean;
	clone: () => Matrix3;
}

/**
 * These Matrix3s represent a rigid transform in homogeneous coords,
 * therefore, we assume that the bottom row is [0, 0, 1] and only store 6 elements.
 */
export class Matrix3 {
	private readonly _elements: number[];
	private _isIdentity: boolean;

	/**
	 * If no elements passed in, defaults to identity matrix.
	 */
	constructor();
	constructor(
		n11: number,
		n12: number,
		n13: number,
		n21: number,
		n22: number,
		n23: number,
		isIdentity?: boolean,
	);
	constructor(
		n11?: number,
		n12?: number,
		n13?: number,
		n21?: number,
		n22?: number,
		n23?: number,
		isIdentity?: boolean,
	) {
		if (n11 !== undefined) {
			this._elements = [
				n11, n12!, n13!,
				n21!, n22!, n23!,
			];
			this._isIdentity = isIdentity === undefined ? Matrix3._checkElementForIdentity(this._elements) : isIdentity;
		} else {
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
	set elements(elements: readonly number[]) {
		throw new Error('No elements setter on Matrix3.');
	}

	/**
	 * Returns elements of Matrix3.
	 */
	get elements() {
		return this._elements as readonly number[];
	}

	/**
	 * @private
	 */
	set isIdentity(isIdentity: boolean) {
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
	private _set(
		n11: number,
		n12: number,
		n13: number,
		n21: number,
		n22: number,
		n23: number,
	) {
		const { _elements } = this;
		_elements[0] = n11; _elements[1] = n12; _elements[2] = n13;
		_elements[3] = n21; _elements[4] = n22; _elements[5] = n23;
		return this;
	}

	/**
	 * Set this Matrix4 to the identity matrix.
	 * @returns this
	 */
	setIdentity() {
		this._set(
			1, 0, 0,
			0, 1, 0,
		);
		this._isIdentity = true;
		return this;
	}

	private static _checkElementForIdentity(elements: number[]) {
		const [
			n11, n12, n13,
			n21, n22, n23,
		] = elements;
		return Math.abs(n11 - 1) <= NUMERICAL_TOLERANCE() && Math.abs(n22 - 1) <= NUMERICAL_TOLERANCE() &&
			Math.abs(n12) <= NUMERICAL_TOLERANCE() && Math.abs(n13) <= NUMERICAL_TOLERANCE() &&
			Math.abs(n21) <= NUMERICAL_TOLERANCE() && Math.abs(n23) <= NUMERICAL_TOLERANCE();
	}

	// _setTranslation(translation: Vector3Readonly) {
	// 	this._set(
	// 		1, 0, translation.x,
	// 		0, 1, translation.y,
	// 	);
	// 	this._isIdentity = Math.abs(translation.x) <= NUMERICAL_TOLERANCE() && Math.abs(translation.y) <= NUMERICAL_TOLERANCE();
	// 	return this;
	// }

	/**
	 * Set elements of Matrix4 according to rotation and translation.
	 * @param angle - Angle of rotation in radians.
	 * @param translation - Translation offset.
	 * @returns this
	 */
	setFromRotationTranslation(angle: number, translation: Vector2Readonly | THREE_Vector2) {
		if (Math.abs(angle) <= NUMERICAL_TOLERANCE() && Math.abs(translation.x) <= NUMERICAL_TOLERANCE() && Math.abs(translation.y) <= NUMERICAL_TOLERANCE()) {
			return this.setIdentity();
		}
		// To do this we need to calculate R(angle) * T(position).
		// Based on http://www.gamedev.net/reference/articles/article1199.asp
		// First calc R.
		const r11 = Math.cos(angle),	r12 = -Math.sin(angle);
		const r21 = -r12,				r22 = r11;
		// Pre-multiply T by R.
		const tx = translation.x * r11 + translation.y * r12;
		const ty = translation.x * r21 + translation.y * r22;
		this._set(
			r11, r12, tx,
			r21, r22, ty,
		);
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
	equals(matrix: Matrix3Readonly) {
		const elementsA = this.elements;
		const elementsB = matrix.elements;
		for (let i = 0, numElements = elementsA.length; i < numElements; i++) {
			if (Math.abs(elementsA[i] - elementsB[i]) > NUMERICAL_TOLERANCE()) return false;
		}
		return true;
	}

	/**
	 * Copy values from a Matrix3 into this Matrix3.
	 * @param matrix - Matrix3 to copy.
	 * @returns this
	 */
	copy(matrix: Matrix3Readonly) {
		const { elements } = matrix;
		this._set(
			elements[0], elements[1], elements[2],
			elements[3], elements[4], elements[5],
		);
		this._isIdentity = matrix.isIdentity;
		return this;
	}

	/**
	 * Returns a deep copy of this Matrix3.
	 */
	clone() {
		const { _elements } = this;
		const clone = new Matrix3(
			_elements[0], _elements[1], _elements[2],
			_elements[3], _elements[4], _elements[5],
			this._isIdentity,
		);
		return clone;
	}
}