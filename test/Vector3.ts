import { Vector3 } from '../src/Vector3';
import { expect } from 'chai';
import { checkWarnings, popLastWarning } from './test-utils/utils';
import { Matrix4 } from '../src/Matrix4';
import { Quaternion } from '../src/Quaternion';
import {
	Vector3 as THREE_Vector3,
	Quaternion as THREE_Quaternion,
} from 'three';
import { DEFAULT_NUMERICAL_TOLERANCE } from '../src/constants';

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
	it('setFromArray() - sets the components of this Vector3 from an array', () => {
		const vector = new Vector3(5.4, 0.5, 3.4);
		expect(vector.x).to.equal(5.4);
		expect(vector.y).to.equal(0.5);
		expect(vector.z).to.equal(3.4);
		const returnValue = vector.setFromArray([1, 2, 0]);
		expect(vector.x).to.equal(1);
		expect(vector.y).to.equal(2);
		expect(vector.z).to.equal(0);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
    it('fill() - fills all components of this Vector3 with the same value', () => {
        const vector = new Vector3(5.4, 0.5, 3.4);
        expect(vector.x).to.equal(5.4);
        expect(vector.y).to.equal(0.5);
        expect(vector.z).to.equal(3.4);
        const returnValue = vector.fill(3.2);
        expect(vector.x).to.equal(3.2);
        expect(vector.y).to.equal(3.2);
        expect(vector.z).to.equal(3.2);
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
		// Works with threejs.
		vector.add(new THREE_Vector3(-55.3, 45, 35.1));
		expect(vector.x).to.equal(-105.6);
		expect(vector.y).to.equal(96);
		expect(vector.z).to.equal(68.2);
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
		// Works with threejs.
		vector.sub(new THREE_Vector3(-55.3, 45, 35));
		expect(vector.x).to.equal(105.6);
		expect(vector.y).to.equal(-96);
		expect(vector.z).to.equal(-73.2);
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
		expect(popLastWarning()).to.contain('Dividing by zero in Vector3.divideScalar()');
        // Should respect numerical tolerance.
        vector.divideScalar(DEFAULT_NUMERICAL_TOLERANCE);
        // Dividing by zero should throw a warning.
		expect(popLastWarning()).to.contain('Dividing by zero in Vector3.divideScalar()');
		expect(vector.x).to.equal(-Infinity);
		expect(vector.y).to.equal(-Infinity);
		expect(vector.z).to.equal(Infinity);
	});
	it('dot() - calculate the dot product with another Vector3', () => {
		expect(new Vector3(1, 0.3, 5.6).dot(new Vector3(1, 0.3, 5.6))).to.equal(32.449999999999996);
		expect(new Vector3(1, 0.3, 5.6).dot(new Vector3(-1, -0.3, -5.6))).to.equal(-32.449999999999996);
		expect(new Vector3(0, 1, 0).dot(new Vector3(1, 0, 0))).to.equal(0);
		// Works with threejs.
		expect(new Vector3(1, 0.3, 5.6).dot(new THREE_Vector3(-1, -0.3, -5.6))).to.equal(-32.449999999999996);
	});
    it('static dot() - calculate the dot product between two Vector3s', () => {
        expect(Vector3.dot(new Vector3(1, 0.3, 5.6), new Vector3(1, 0.3, 5.6))).to.equal(32.449999999999996);
        expect(Vector3.dot(new Vector3(1, 0.3, 5.6), new Vector3(-1, -0.3, -5.6))).to.equal(-32.449999999999996);
        expect(Vector3.dot(new Vector3(0, 1, 0), new Vector3(1, 0, 0))).to.equal(0);
        // Works with threejs.
        expect(Vector3.dot(new THREE_Vector3(1, 0.3, 5.6), new THREE_Vector3(-1, -0.3, -5.6))).to.equal(-32.449999999999996);
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
		// Works with threejs.
		expect(new Vector3(1, 0.3, 5.6).cross(new THREE_Vector3(-6, 2.45, 0.1))).to.deep.equal(new Vector3(-13.690000000000001, -33.699999999999996, 4.25));

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
    it('distanceToSquared() - calculates the squared distance to another Vector3', () => {
        expect(new Vector3(1, 0, 0).distanceToSquared(new Vector3(1, 0, 0))).to.equal(0);
        expect(new Vector3(1, 0, 0).distanceToSquared(new Vector3(-1, 0, 0))).to.equal(4);
        expect(new Vector3(0, 1, 0).distanceToSquared(new Vector3(1, 0, 0))).to.equal(2);
        expect(new Vector3(4, 2, 6.8).distanceToSquared(new Vector3(-3, 5, 0.3))).to.equal(100.25);
    });
    it('distanceTo() - calculates the distance to another Vector3', () => {
        expect(new Vector3(1, 0, 0).distanceTo(new Vector3(1, 0, 0))).to.equal(0);
        expect(new Vector3(1, 0, 0).distanceTo(new Vector3(-1, 0, 0))).to.equal(2);
        expect(new Vector3(0, 1, 0).distanceTo(new Vector3(1, 0, 0))).to.almost.equal(1.4142135623730951);
        expect(new Vector3(4, 2, 6.8).distanceTo(new Vector3(-3, 5, 0.3))).to.almost.equal(10.0124921973);
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
		expect(popLastWarning()).to.contain('Attempting to normalize zero length Vector3');
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
		const quaternion = new Quaternion();
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
		// Works with threejs.
		const threeQuaternion = new THREE_Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
		expect(new Vector3(5.4, 0.5, 3.4).applyQuaternion(threeQuaternion)).to.deep.equal(new Vector3(4.783017443503779, 1.9984829357006233, 3.7548382243249856));
	});
	it('lerp() - linearly interpolates between two Vector3s', () => {
		const vector1 = new Vector3(5.4, 0.5, 3.4);
		vector1.lerp(new Vector3(4.6, 2, -4.5), 0.25);
		expect(vector1.x).to.almost.equal(5.2);
		expect(vector1.y).to.almost.equal(0.875);
		expect(vector1.z).to.almost.equal(1.425);
		vector1.lerp(new Vector3(4.6, 2, -4.5), 1);
		expect(vector1.x).to.almost.equal(4.6);
		expect(vector1.y).to.almost.equal(2);
		expect(vector1.z).to.almost.equal(-4.5);
		const returnValue = vector1.lerp(new Vector3(30, 5.3, 2), 0);
		expect(vector1.x).to.almost.equal(4.6);
		expect(vector1.y).to.almost.equal(2);
		expect(vector1.z).to.almost.equal(-4.5);
		// Check that it returns this.
		expect(returnValue).to.equal(vector1);
		// Works with threejs.
		expect(new Vector3(5.4, 0.5, 3.4).lerp(new THREE_Vector3(1, 1, 1), 0.5)).to.deep.equal(new Vector3(3.2, 0.75, 2.2));
	});
	it('average() - calculates the average of two Vector3s', () => {
		const vector1 = new Vector3(5.4, 0.5, 3.4);
		vector1.average(new Vector3(4.6, 2, -4.5));
		expect(vector1.x).to.almost.equal(5);
		expect(vector1.y).to.almost.equal(1.25);
		expect(vector1.z).to.almost.equal(-0.55);
		const returnValue = vector1.average(new Vector3(30, 5.3, 2));
		expect(vector1.x).to.almost.equal(17.5);
		expect(vector1.y).to.almost.equal(3.275);
		expect(vector1.z).to.almost.equal(0.725);
		// Check that it returns this.
		expect(returnValue).to.equal(vector1);
		// Works with threejs.
		expect(new Vector3(5.4, 0.5, 3.4).average(new THREE_Vector3(1, 1, 1))).to.deep.equal(new Vector3(3.2, 0.75, 2.2));
	});
    it('min() - calculates the min of two Vector3s', () => {
        const vector1 = new Vector3(5.4, 0.5, 3.4);
        vector1.min(new Vector3(4.6, 2, -4.5));
        expect(vector1.x).to.almost.equal(4.6);
        expect(vector1.y).to.almost.equal(0.5);
        expect(vector1.z).to.almost.equal(-4.5);
        const returnValue = vector1.min(new Vector3(30, 5.3, 2));
        expect(vector1.x).to.almost.equal(4.6);
        expect(vector1.y).to.almost.equal(0.5);
        expect(vector1.z).to.almost.equal(-4.5);
        // Check that it returns this.
        expect(returnValue).to.equal(vector1);
        // Works with threejs.
        expect(new Vector3(5.4, 0.5, 3.4).min(new THREE_Vector3(1, 1, 1))).to.deep.equal(new Vector3(1, 0.5, 1));
    });
    it('max() - calculates the max of two Vector3s', () => {
        const vector1 = new Vector3(5.4, 0.5, 3.4);
        vector1.max(new Vector3(4.6, 2, -4.5));
        expect(vector1.x).to.almost.equal(5.4);
        expect(vector1.y).to.almost.equal(2);
        expect(vector1.z).to.almost.equal(3.4);
        const returnValue = vector1.max(new Vector3(30, 5.3, 2));
        expect(vector1.x).to.almost.equal(30);
        expect(vector1.y).to.almost.equal(5.3);
        expect(vector1.z).to.almost.equal(3.4);
        // Check that it returns this.
        expect(returnValue).to.equal(vector1);
        // Works with threejs.
        expect(new Vector3(5.4, 0.5, 3.4).max(new THREE_Vector3(1, 1, 1))).to.deep.equal(new Vector3(5.4, 1, 3.4));
    });
	it ('invert() - inverts a Vector3', () => {
		const vector = new Vector3(5.4, 0.5, 3.4);
		const returnValue = vector.invert();
		expect(vector.x).to.equal(-5.4);
		expect(vector.y).to.equal(-0.5);
		expect(vector.z).to.equal(-3.4);
		// Check that it returns this.
		expect(returnValue).to.equal(vector);
	});
	it('angleTo() - calculates the angle between two Vector3s', () => {
		expect(new Vector3(1, 0, 0).angleTo(new Vector3(1, 0, 0))).to.almost.equal(0);
		expect(new Vector3(1, 0, 0).angleTo(new Vector3(-1, 0, 0))).to.almost.equal(Math.PI);
		expect(new Vector3(0, 1, 0).angleTo(new Vector3(1, 0, 0))).to.almost.equal(Math.PI / 2);
		expect(new Vector3(4, 2, 6.8).angleTo(new Vector3(-3, 5, 0.3))).to.almost.equal(1.5699545704859283);
	});
    it('angleToNormalized() - calculates the angle between two normalized Vector3s', () => {
		expect(new Vector3(1, 0, 0).angleToNormalized(new Vector3(1, 0, 0))).to.almost.equal(0);
		expect(new Vector3(1, 0, 0).angleToNormalized(new Vector3(-1, 0, 0))).to.almost.equal(Math.PI);
		expect(new Vector3(0, 1, 0).angleToNormalized(new Vector3(1, 0, 0))).to.almost.equal(Math.PI / 2);
		expect(new Vector3(4, 2, 6.8).normalize().angleToNormalized(new Vector3(-3, 5, 0.3).normalize())).to.almost.equal(1.5699545704859283);
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
		// Works with threejs.
		vector2.copy(new THREE_Vector3(-45.6, 25, 0.56));
		expect(vector2.x).to.equal(-45.6);
		expect(vector2.y).to.equal(25);
		expect(vector2.z).to.equal(0.56);
	});
	it('equals() - tests equality with Vector3', () => {
		const vector1 = new Vector3(5.4, 0.5, -4.5);
		const vector2 = new Vector3(5.4, 0.5, -4.5);
		expect(vector1 === vector2).to.equal(false);
		expect(vector1.equals(vector2)).to.equal(true);
		expect(vector1.equals(new Vector3(5.5, 0.5, -4.5))).to.equal(false);
		expect(vector1.equals(new Vector3(5.4, 0.6, -4.5))).to.equal(false);
		expect(vector1.equals(new Vector3(5.4, 0.5, -4.4))).to.equal(false);
		// Works with threejs.
		expect(vector1.equals(new THREE_Vector3(5.4, 0.5, -4.5))).to.equal(true);
		expect(vector1.equals(new THREE_Vector3(5.5, 0.5, -4.5))).to.equal(false);
		expect(vector1.equals(new THREE_Vector3(5.4, 0.6, -4.5))).to.equal(false);
		expect(vector1.equals(new THREE_Vector3(5.4, 0.5, -4.4))).to.equal(false);
	});
    it('static equals() - tests equality between two Vector3s', () => {
        const vector1 = new Vector3(5.4, 0.5, -4.5);
        const vector2 = new Vector3(5.4, 0.5, -4.5);
        expect(Vector3.equals(vector1, vector2)).to.equal(true);
        expect(Vector3.equals(vector1, new Vector3(5.5, 0.5, -4.5))).to.equal(false);
        expect(Vector3.equals(vector1, new Vector3(5.4, 0.6, -4.5))).to.equal(false);
        expect(Vector3.equals(vector1, new Vector3(5.4, 0.5, -4.4))).to.equal(false);
        // Works with threejs.
        expect(Vector3.equals(new THREE_Vector3(5.4, 0.5, -4.5), new THREE_Vector3(5.4, 0.5, -4.5))).to.equal(true);
        expect(Vector3.equals(new THREE_Vector3(5.4, 0.5, -4.5), new THREE_Vector3(5.5, 0.5, -4.5))).to.equal(false);
        expect(Vector3.equals(new THREE_Vector3(5.4, 0.5, -4.5), new THREE_Vector3(5.4, 0.6, -4.5))).to.equal(false);
        expect(Vector3.equals(new THREE_Vector3(5.4, 0.5, -4.5), new THREE_Vector3(5.4, 0.5, -4.4))).to.equal(false);
    });new THREE_Vector3(5.4, 0.5, -4.5)
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