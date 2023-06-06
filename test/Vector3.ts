import { Vector3 } from '../src/Vector3';
import { expect } from 'chai';
import { checkWarnings, popLastWarning } from './test-utils/utils';
import { Matrix4 } from '../src/Matrix4';
import { Quaternion } from '../src/Quaternion';

describe('Vector3', () => {
	afterEach(() => {
		checkWarnings();
	});
	it('constructor inits a Vector3', () => {
		// No params defaults to zero vector.
		const vector1 = new Vector3();
		expect(vector1.x).to.equal(0);
		expect(vector1.y).to.equal(0);
		expect(vector1.z).to.equal(0);

		const vector2 = new Vector3(-4.3, 50, 2.4);
		expect(vector2.x).to.equal(-4.3);
		expect(vector2.y).to.equal(50);
		expect(vector2.z).to.equal(2.4);
	});
	it('set() - sets the components of this Vector3', () => {
		const vector = new Vector3(5.4, 0.5, 3.4);
		expect(vector.x).to.equal(5.4);
		expect(vector.y).to.equal(0.5);
		expect(vector.z).to.equal(3.4);
		const returnValue = vector.set(1, 2, 0);
		expect(vector.x).to.equal(1);
		expect(vector.y).to.equal(2);
		expect(vector.z).to.equal(0);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('add() - adds a Vector3', () => {
		const vector = new Vector3();
		vector.add(new Vector3(5, 6, -2));
		expect(vector.x).to.equal(5);
		expect(vector.y).to.equal(6);
		expect(vector.z).to.equal(-2);
		const returnValue = vector.add(new Vector3(-55.3, 45, 35.1));
		expect(vector.x).to.equal(-50.3);
		expect(vector.y).to.equal(51);
		expect(vector.z).to.equal(33.1);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('sub() - subtracts a Vector3', () => {
		const vector = new Vector3();
		vector.sub(new Vector3(5, 6, 3.2));
		expect(vector.x).to.equal(-5);
		expect(vector.y).to.equal(-6);
		expect(vector.z).to.equal(-3.2);
		const returnValue = vector.sub(new Vector3(-55.3, 45, 35));
		expect(vector.x).to.equal(50.3);
		expect(vector.y).to.equal(-51);
		expect(vector.z).to.equal(-38.2);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('multiplyScalar() - multiplies Vector3 by scalar', () => {
		const vector = new Vector3(1, 2, -4);
		vector.multiplyScalar(4.6);
		expect(vector.x).to.equal(4.6);
		expect(vector.y).to.equal(9.2);
		expect(vector.z).to.equal(-18.4);
		const returnValue = vector.multiplyScalar(-1);
		expect(vector.x).to.equal(-4.6);
		expect(vector.y).to.equal(-9.2);
		expect(vector.z).to.equal(18.4);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('divideScalar() - divides Vector3 by scalar', () => {
		const vector = new Vector3(1, 2, -3);
		vector.divideScalar(0.1);
		expect(vector.x).to.equal(10);
		expect(vector.y).to.equal(20);
		expect(vector.z).to.equal(-30);
		const returnValue = vector.divideScalar(-1);
		expect(vector.x).to.equal(-10);
		expect(vector.y).to.equal(-20);
		expect(vector.z).to.equal(30);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
		// Handle divide by zero case.
		vector.divideScalar(0);
		// Dividing by zero should throw a warning.
		expect(popLastWarning()).to.equal('Dividing by zero in Vector3.divideScalar().');
		expect(vector.x).to.equal(-Infinity);
		expect(vector.y).to.equal(-Infinity);
		expect(vector.z).to.equal(Infinity);
	});
	it('dot - calculate the dot product with another Vector3', () => {
		expect(new Vector3(1, 0.3, 5.6).dot(new Vector3(1, 0.3, 5.6))).to.equal(32.449999999999996);
		expect(new Vector3(1, 0.3, 5.6).dot(new Vector3(-1, -0.3, -5.6))).to.equal(-32.449999999999996);
		expect(new Vector3(0, 1, 0).dot(new Vector3(1, 0, 0))).to.equal(0);
	});
	it('cross() - calculate the cross product with another Vector3', () => {
		const vector1 = new Vector3(1, 0, 0);
		const vector2 = new Vector3(1, 0, 0);
		const returnValue = vector1.cross(vector2);
		expect(returnValue).to.deep.equal(new Vector3());
		expect(new Vector3().cross(new Vector3())).to.deep.equal(new Vector3());
		expect(new Vector3(1, 0.3, 5.6).cross(new Vector3(-6, 2.45, 0.1))).to.deep.equal(new Vector3(-13.690000000000001, -33.699999999999996, 4.25));
		// Check that it returns this.
		expect(returnValue).to.equal(vector1);
	});
	it('lengthSq() - calculates the squared length of a Vector3', () => {
		expect(new Vector3(1, 0, 0).lengthSq()).to.equal(1);
		expect(new Vector3(3, 4, 2).lengthSq()).to.equal(29);
		expect(new Vector3(-43, 56, 24).lengthSq()).to.equal(5561);
		expect(new Vector3().lengthSq()).to.equal(0);
	});
	it('length() - calculates the length of a Vector3', () => {
		expect(new Vector3(1, 0, 0).length()).to.equal(1);
		expect(new Vector3(3, 4, 2).length()).to.equal(5.385164807134504);
		expect(new Vector3(-43, 56, 24).length()).to.equal(74.57211275000863);
		expect(new Vector3().length()).to.equal(0);
	});
	it('normalize() - normalizes the length of a Vector3', () => {
		expect(new Vector3(1, 0, 0).length()).to.equal(1);
		expect(new Vector3(1, 0, 0).normalize().length()).to.equal(1);
		expect(new Vector3(3, 4, 2).length()).to.equal(5.385164807134504);
		expect(new Vector3(3, 4, 2).normalize().length()).to.equal(1);
		expect(new Vector3(3, -4, 2).normalize()).to.deep.equal(new Vector3(0.5570860145311556, -0.7427813527082074, 0.3713906763541037));
		// Handle zero case.
		expect(new Vector3().length()).to.equal(0);
		expect(new Vector3().normalize().length()).to.equal(0);
		// Normalizing zero vectors should throw a warning.
		expect(popLastWarning()).to.equal('Attempting to normalize zero length Vector3.');
		// Check that it returns this.
		const vector = new Vector3(1, 1, 1);
		const returnValue = vector.normalize();
		expect(returnValue).to.equal(vector);
	});
	it('applyMatrix4() - applies a Matrix4 transform to this Vector3', () => {
		const vector = new Vector3(5.4, 0.5, 3.4);
		const matrix = new Matrix4()
		// Multiply by identity.
		vector.applyMatrix4(matrix);
		expect(vector).to.deep.equal(new Vector3(5.4, 0.5, 3.4));
		// Multiply by rotation/translation transform.
		matrix.setRotationAxisAngleAtOffset(new Vector3(4, 6.7, -0.33).normalize(), -0.34, new Vector3(6, 34, 2.38));
		const returnValue = vector.applyMatrix4(matrix);
		expect(vector).to.deep.equal(new Vector3(4.761753096937314, 1.1549915954175034, 8.961988112262189));
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('applyMatrix4RotationComponent() - applies only the rotational component of a Matrix4 transform to this Vector3', () => {
		const vector = new Vector3(5.4, 0.5, 3.4);
		const length = vector.length;
		const matrix = new Matrix4()
		// Multiply by identity.
		vector.applyMatrix4RotationComponent(matrix);
		expect(vector).to.deep.equal(new Vector3(5.4, 0.5, 3.4));
		// Multiply by rotation/translation transform.
		matrix.setRotationAxisAngleAtOffset(new Vector3(4, 6.7, -0.33).normalize(), -0.34, new Vector3(6, 34, 2.38));
		const returnValue = vector.applyMatrix4RotationComponent(matrix);
		expect(vector).to.deep.equal(new Vector3(4.200592888788533, 1.2779975290298355, 4.657439392890995));
		// Length should not change.
		expect(vector.length).to.almost(length, 1e-9);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('applyQuaternion() - applies a Quaternion transform to this Vector3', () => {
		const vector = new Vector3(5.4, 0.5, 3.4);
		const length = vector.length();
		const quaternion = new Quaternion()
		// Multiply by identity.
		vector.applyQuaternion(quaternion);
		expect(vector).to.deep.equal(new Vector3(5.4, 0.5, 3.4));
		// Multiply by rotation/translation transform.
		quaternion.setFromUnitVectors(new Vector3(4, 6.7, -0.33).normalize(), new Vector3(6, 34, 2.38).normalize());
		const returnValue = vector.applyQuaternion(quaternion);
		expect(vector).to.deep.equal(new Vector3(4.783017443503779, 1.9984829357006233, 3.7548382243249856));
		// Rotation should not change vector length.
		expect(vector.length()).to.almost(length, 1e-9);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('copy() - copies a Vector3', () => {
		const vector1 = new Vector3(5.4, 0.5, 3.4);
		const vector2 = new Vector3();
		const returnValue = vector2.copy(vector1);
		expect(vector2.x).to.equal(5.4);
		expect(vector2.y).to.equal(0.5);
		expect(vector2.z).to.equal(3.4);
		// Make sure it is a deep copy.
		vector1.add(new Vector3(1, 1, 1));
		expect(vector1.x).to.equal(6.4);
		expect(vector1.y).to.equal(1.5);
		expect(vector1.z).to.equal(4.4);
		expect(vector2.x).to.equal(5.4);
		expect(vector2.y).to.equal(0.5);
		expect(vector2.z).to.equal(3.4);
		// Check that it returns this.
		expect(returnValue).to.equal(vector2);
	});
	it('equals() - tests equality with Vector3', () => {
		const vector1 = new Vector3(5.4, 0.5, -4.5);
		const vector2 = new Vector3(5.4, 0.5, -4.5);
		expect(vector1 === vector2).to.equal(false);
		expect(vector1.equals(vector2)).to.equal(true);
		expect(vector1.equals(new Vector3(5.5, 0.5, -4.5))).to.equal(false);
		expect(vector1.equals(new Vector3(5.4, 0.6, -4.5))).to.equal(false);
		expect(vector1.equals(new Vector3(5.4, 0.5, -4.4))).to.equal(false);
	});
	it('isZero() - checks if Vector3 is zero vector', () => {
		expect(new Vector3().isZero()).to.equal(true);
		expect(new Vector3(1, 0, 0).isZero()).to.equal(false);
		expect(new Vector3(0, 1, 0).isZero()).to.equal(false);
		expect(new Vector3(0, 0, 1).isZero()).to.equal(false);
	});
	it('clone() - clones a Vector3', () => {
		const vector1 = new Vector3(5.4, 0.5, 3.4);
		const vector2 = vector1.clone();
		expect(vector2.x).to.equal(5.4);
		expect(vector2.y).to.equal(0.5);
		expect(vector2.z).to.equal(3.4);
		// Make sure it is a deep copy.
		vector1.add(new Vector3(1, 1, 1));
		expect(vector1.x).to.equal(6.4);
		expect(vector1.y).to.equal(1.5);
		expect(vector1.z).to.equal(4.4);
		expect(vector2.x).to.equal(5.4);
		expect(vector2.y).to.equal(0.5);
		expect(vector2.z).to.equal(3.4);
	});
	it('toArray() - returns an array of components', () => {
		const vector = new Vector3(5.4, 0.5, 3.4);
		const array = vector.toArray();
		expect(array).to.deep.equal([5.4, 0.5, 3.4]);
	});
});