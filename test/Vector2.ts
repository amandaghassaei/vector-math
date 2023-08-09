import { Vector2 } from '../src/Vector2';
import { Vector2 as THREE_Vector2 } from 'three';
import { expect } from 'chai';
import { checkWarnings, popLastWarning } from './test-utils/utils';
import { Matrix3 } from '../src/Matrix3';

describe('Vector2', () => {
	afterEach(() => {
		checkWarnings();
	});
	it('constructor inits a Vector2', () => {
		// No params defaults to zero vector.
		const vector1 = new Vector2();
		expect(vector1.x).to.equal(0);
		expect(vector1.y).to.equal(0);

		const vector2 = new Vector2(-4.3, 50);
		expect(vector2.x).to.equal(-4.3);
		expect(vector2.y).to.equal(50);
	});
	it('set() - sets the components of this Vector2', () => {
		const vector = new Vector2(5.4, 0.5);
		expect(vector.x).to.equal(5.4);
		expect(vector.y).to.equal(0.5);
		const returnValue = vector.set(1, 2);
		expect(vector.x).to.equal(1);
		expect(vector.y).to.equal(2);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('setFromArray() - sets the components of this Vector3 from an array', () => {
		const vector = new Vector2(5.4, 0.5);
		expect(vector.x).to.equal(5.4);
		expect(vector.y).to.equal(0.5);
		const returnValue = vector.setFromArray([1, 2]);
		expect(vector.x).to.equal(1);
		expect(vector.y).to.equal(2);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('add() - adds a Vector2', () => {
		const vector = new Vector2();
		vector.add(new Vector2(5, 6));
		expect(vector.x).to.equal(5);
		expect(vector.y).to.equal(6);
		const returnValue = vector.add(new Vector2(-55.3, 45));
		expect(vector.x).to.equal(-50.3);
		expect(vector.y).to.equal(51);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
		// Works with threejs.
		vector.add(new THREE_Vector2(-30, 0.4));
		expect(vector.x).to.equal(-80.3);
		expect(vector.y).to.equal(51.4);
	});
	it('sub() - subtracts a Vector2', () => {
		const vector = new Vector2();
		vector.sub(new Vector2(5, 6));
		expect(vector.x).to.equal(-5);
		expect(vector.y).to.equal(-6);
		const returnValue = vector.sub(new Vector2(-55.3, 45));
		expect(vector.x).to.equal(50.3);
		expect(vector.y).to.equal(-51);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
		// Works with threejs.
		vector.sub(new THREE_Vector2(-30, 0.4));
		expect(vector.x).to.equal(80.3);
		expect(vector.y).to.equal(-51.4);
	});
	it('multiplyScalar() - multiplies Vector2 by scalar', () => {
		const vector = new Vector2(1, 2);
		vector.multiplyScalar(4.6);
		expect(vector.x).to.equal(4.6);
		expect(vector.y).to.equal(9.2);
		const returnValue = vector.multiplyScalar(-1);
		expect(vector.x).to.equal(-4.6);
		expect(vector.y).to.equal(-9.2);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('divideScalar() - divides Vector2 by scalar', () => {
		const vector = new Vector2(1, 2);
		vector.divideScalar(0.1);
		expect(vector.x).to.equal(10);
		expect(vector.y).to.equal(20);
		const returnValue = vector.divideScalar(-1);
		expect(vector.x).to.equal(-10);
		expect(vector.y).to.equal(-20);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
		// Handle divide by zero case.
		vector.divideScalar(0);
		// Dividing by zero should throw a warning.
		expect(popLastWarning()).to.equal('Dividing by zero in Vector2.divideScalar().');
		expect(vector.x).to.equal(-Infinity);
		expect(vector.y).to.equal(-Infinity);
	});
	it('dot() - calculated the dot product with another Vector2', () => {
		const vector = new Vector2(1, 2);
		expect(vector.dot(new Vector2(3.4, -5))).to.equal(-6.6);
		// Works with threejs.
		expect(vector.dot(new THREE_Vector2(3.4, -5))).to.equal(-6.6);
	});
	it('cross() - calculate the 2D cross product with another Vector2', () => {
		expect(new Vector2(1, 0).cross(new Vector2(1, 0))).to.equal(0);
		expect(new Vector2().cross(new Vector2())).to.equal(0);
		expect(new Vector2(1, 0.5).cross(new Vector2(1, 0))).to.equal(-0.5);
		expect(new Vector2(1, -9.2).cross(new Vector2(1.4, 0.5))).to.equal(13.379999999999999);
		// Works with threejs.
		expect(new Vector2(1, -9.2).cross(new THREE_Vector2(1.4, 0.5))).to.equal(13.379999999999999);
	});
	it('angle() - calculates the angle to another Vector2', () => {
		expect(new Vector2(1, 0).angle()).to.equal(0);
		expect(new Vector2(10, 0).angle()).to.equal(0);
		expect(new Vector2(1, 1).angle()).to.equal(Math.PI / 4);
		expect(new Vector2(0, 4.3).angle()).to.equal(Math.PI / 2);
		expect(new Vector2(-1, 1).angle()).to.equal(3 * Math.PI / 4);
		expect(new Vector2(-1, 0).angle()).to.equal(Math.PI);
		expect(new Vector2(-1, -1).angle()).to.equal(5 * Math.PI / 4);
		expect(new Vector2(0, -2.2).angle()).to.equal(3 * Math.PI / 2);
		expect(new Vector2(1, -1).angle()).to.equal(7 * Math.PI / 4);
		// Handle 0 length case.
		expect(new Vector2().angle()).to.equal(0);
		// Check that values are in range [0, 2 * Math.PI].
		expect(new Vector2(1, -Number.MIN_VALUE).angle()).to.equal(2 * Math.PI);
		expect(new Vector2(1, -0).angle()).to.equal(0);
		expect(new Vector2(100, -0).angle()).to.equal(0);
	});
	it('lengthSq() - calculates the squared length of a Vector2', () => {
		expect(new Vector2(1, 0).lengthSq()).to.equal(1);
		expect(new Vector2(3, 4).lengthSq()).to.equal(25);
		expect(new Vector2(-43, 56).lengthSq()).to.equal(4985);
		expect(new Vector2().lengthSq()).to.equal(0);
	});
	it('length() - calculates the length of a Vector2', () => {
		expect(new Vector2(1, 0).length()).to.equal(1);
		expect(new Vector2(3, 4).length()).to.equal(5);
		expect(new Vector2(-43, 56).length()).to.equal(70.60453243241541);
		expect(new Vector2().length()).to.equal(0);
	});
	it('normalize() - normalizes the length of a Vector2', () => {
		expect(new Vector2(1, 0).length()).to.equal(1);
		expect(new Vector2(1, 0).normalize().length()).to.equal(1);
		expect(new Vector2(3, 4).length()).to.equal(5);
		expect(new Vector2(3, 4).normalize().length()).to.equal(1);
		expect(new Vector2(3, -4).normalize()).to.deep.equal(new Vector2(0.6000000000000001, -0.8));
		// Handle zero case.
		expect(new Vector2().length()).to.equal(0);
		expect(new Vector2().normalize().length()).to.equal(0);
		// Normalizing zero vectors should throw a warning.
		expect(popLastWarning()).to.equal('Attempting to normalize zero length Vector2.');
		// Check that it returns this.
		const vector = new Vector2(1, 1);
		const returnValue = vector.normalize();
		expect(returnValue).to.equal(vector);
	});
	it('applyMatrix3 - applies a Matrix3 transform to this Vector2', () => {
		const vector = new Vector2(5.4, 0.5);
		const matrix1 = new Matrix3();
		// Multiply by identity.
		vector.applyMatrix3(matrix1);
		expect(vector).to.deep.equal(new Vector2(5.4, 0.5));
		// Multiply by rotation/translation transform.
		const matrix2 = new Matrix3(3.4, 6, -2, 95.4, 3, 14.5);
		const returnValue = vector.applyMatrix3(matrix2);
		expect(vector).to.deep.equal(new Vector2(19.36, 531.1600000000001));
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('lerp() - linearly interpolates between two Vector3s', () => {
		const vector1 = new Vector2(5.4, 0.5);
		vector1.lerp(new Vector2(4.6, 2), 0.25);
		expect(vector1.x).to.almost.equal(5.2);
		expect(vector1.y).to.almost.equal(0.875);
		vector1.lerp(new Vector2(4.6, 2), 1);
		expect(vector1.x).to.almost.equal(4.6);
		expect(vector1.y).to.almost.equal(2);
		const returnValue = vector1.lerp(new Vector2(30, 5.3), 0);
		expect(vector1.x).to.almost.equal(4.6);
		expect(vector1.y).to.almost.equal(2);
		// Check that it returns this.
		expect(returnValue).to.equal(vector1);
		// Works with threejs.
		expect(new Vector2(5.4, 0.5).lerp(new THREE_Vector2(1, 1), 0.5)).to.deep.equal(new Vector2(3.2, 0.75));
	});
	it('average() - calculates the average of two Vector3s', () => {
		const vector1 = new Vector2(5.4, 0.5);
		vector1.average(new Vector2(4.6, 2));
		expect(vector1.x).to.almost.equal(5);
		expect(vector1.y).to.almost.equal(1.25);
		const returnValue = vector1.average(new Vector2(30, 5.3));
		expect(vector1.x).to.almost.equal(17.5);
		expect(vector1.y).to.almost.equal(3.275);
		// Check that it returns this.
		expect(returnValue).to.equal(vector1);
		// Works with threejs.
		expect(new Vector2(5.4, 0.5).average(new THREE_Vector2(1, 1))).to.deep.equal(new Vector2(3.2, 0.75));
	});
	it ('invert() - inverts a Vector3', () => {
		const vector = new Vector2(5.4, 0.5);
		const returnValue = vector.invert();
		expect(vector.x).to.equal(-5.4);
		expect(vector.y).to.equal(-0.5);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('angleTo() - calculates the angle between two Vector3s', () => {
		expect(new Vector2(1, 0).angleTo(new Vector2(1, 0))).to.almost.equal(0);
		expect(new Vector2(1, 0).angleTo(new Vector2(-1, 0))).to.almost.equal(Math.PI);
		expect(new Vector2(0, 1).angleTo(new Vector2(1, 0))).to.almost.equal(Math.PI / 2);
		expect(new Vector2(4, 2).angleTo(new Vector2(-3, 5))).to.almost.equal(1.6475682180646747);
	});
	it('copy() - copies values of input Vector2 into this Vecto2', () => {
		const vector1 = new Vector2(5.4, 0.5);
		const vector2 = new Vector2();
		const returnValue = vector2.copy(vector1);
		expect(vector2.x).to.equal(5.4);
		expect(vector2.y).to.equal(0.5);
		// Make sure it is a deep copy.
		vector1.add(new Vector2(1, 1));
		expect(vector1.x).to.equal(6.4);
		expect(vector1.y).to.equal(1.5);
		expect(vector2.x).to.equal(5.4);
		expect(vector2.y).to.equal(0.5);
		// Make sure return value is this.
		expect(returnValue).to.equal(vector2);
		// Works with threejs.
		const vector3 = new Vector2();
		vector3.copy(new THREE_Vector2(0.34, 5.6));
		expect(vector3.x).to.equal(0.34);
		expect(vector3.y).to.equal(5.6);
	});
	it('equals() - tests equality with Vector2', () => {
		const vector1 = new Vector2(5.4, 0.5);
		const vector2 = new Vector2(5.4, 0.5);
		expect(vector1 === vector2).to.equal(false);
		expect(vector1.equals(vector2)).to.equal(true);
		expect(vector1.equals(new Vector2(5.4, 0.6))).to.equal(false);
		expect(vector1.equals(new Vector2(5.5, 0.5))).to.equal(false);
		// Works with threejs.
		expect(vector1.equals(new THREE_Vector2(5.4, 0.5))).to.equal(true);
		expect(vector1.equals(new THREE_Vector2(5.4, 0.6))).to.equal(false);
		expect(vector1.equals(new THREE_Vector2(5.5, 0.5))).to.equal(false);
	});
	it('isZero() - checks if Vector2 is zero vector', () => {
		expect(new Vector2().isZero()).to.equal(true);
		expect(new Vector2(1, 0).isZero()).to.equal(false);
		expect(new Vector2(0, 1).isZero()).to.equal(false);
	});
	it('clone() - clones a Vector2', () => {
		const vector1 = new Vector2(5.4, 0.5);
		const vector2 = vector1.clone();
		expect(vector2.x).to.equal(5.4);
		expect(vector2.y).to.equal(0.5);
		// Make sure it is a deep copy.
		vector1.add(new Vector2(1, 1));
		expect(vector1.x).to.equal(6.4);
		expect(vector1.y).to.equal(1.5);
		expect(vector2.x).to.equal(5.4);
		expect(vector2.y).to.equal(0.5);
	});
	it('toArray() - returns an array of components', () => {
		const vector = new Vector2(5.4, 0.5);
		const array = vector.toArray();
		expect(array).to.deep.equal([5.4, 0.5]);
	});
});