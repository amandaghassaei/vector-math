import { Quaternion } from '../src/Quaternion';
import { expect } from 'chai';
import { checkWarnings, popLastWarning } from './test-utils/utils';
import { Vector3 } from '../src/Vector3';
import { NUMERICAL_TOLERANCE } from '../src/constants';


describe('Quaternion', () => {
	afterEach(() => {
		checkWarnings();
	});
	it('constructor inits a Quaternion', () => {
		// No params defaults to identity quaternion.
		const quaternion1 = new Quaternion();
		expect(quaternion1.x).to.equal(0);
		expect(quaternion1.y).to.equal(0);
		expect(quaternion1.z).to.equal(0);
		expect(quaternion1.w).to.equal(1);

		const quaternion2 = new Quaternion(-4.3, 50, 2.4, 0);
		expect(quaternion2.x).to.equal(-4.3);
		expect(quaternion2.y).to.equal(50);
		expect(quaternion2.z).to.equal(2.4);
		expect(quaternion2.w).to.equal(0);
	});
	it('throws setter errors', () => {
		expect(() => {(new Quaternion()).x = 0.5}).to.throw(Error, 'No x setter on Quaternion.');
		expect(() => {(new Quaternion()).y = 0.5}).to.throw(Error, 'No y setter on Quaternion.');
		expect(() => {(new Quaternion()).z = 0.5}).to.throw(Error, 'No z setter on Quaternion.');
		expect(() => {(new Quaternion()).w = 0.5}).to.throw(Error, 'No w setter on Quaternion.');
	});
	it('setFromUnitVectors() - sets Quaternion rotation from two unit vectors', () => {
		const quaternion = new Quaternion();
		const returnValue = quaternion.setFromUnitVectors(new Vector3(2, 4.5, 3.4).normalize(), new Vector3(-2.3, 0, 4.5).normalize());
		expect(quaternion).to.deep.equal(new Quaternion(0.4069287969267423, -0.338002092064583, 0.20798582954033493, 0.8227426296856983));
		// Quaternion should be normalized.
		expect(quaternion.length()).to.almost(1, 1e-9);
		// Check case of 0 rotation.
		quaternion.setFromUnitVectors(new Vector3(2, 4.5, 3.4).normalize(), new Vector3(2, 4.5, 3.4).normalize());
		expect(quaternion).to.deep.equal(new Quaternion(0, 0, 0, 1));
		// Check case of 180 degree rotation.
		quaternion.setFromUnitVectors(new Vector3(-2, -4.5, -3.4).normalize(), new Vector3(2, 4.5, 3.4).normalize());
		expect(quaternion).to.deep.equal(new Quaternion(0, 0.6028330891856919, -0.7978673239222392, 0));
		quaternion.setFromUnitVectors(new Vector3(-2.5, 0.8, -3.4).normalize(), new Vector3(2.5, -0.8, 3.4).normalize());
		expect(quaternion).to.deep.equal(new Quaternion(0, 0.973417168333576, 0.22903933372554733, 0));
		quaternion.setFromUnitVectors(new Vector3(-2.5, 0.8, -0.4).normalize(), new Vector3(2.5, -0.8, 0.4).normalize());
		expect(quaternion).to.deep.equal(new Quaternion(-0.3047757271037838, -0.9524241471993242, 0, 0));
		// Check that it returns this.
		expect(returnValue).to.equal(quaternion);
	});
	it('lengthSq() - calculates the squared length of a Quaternion', () => {
		expect(new Quaternion(1, 0, 0, 0).lengthSq()).to.equal(1);
		expect(new Quaternion(3, 4, 2, 4.3).lengthSq()).to.equal(47.489999999999995);
		expect(new Quaternion(-43, 56, 24, 2.3).lengthSq()).to.equal(5566.29);
		expect(new Quaternion().lengthSq()).to.equal(1);
	});
	it('length() - calculates the length of a Quaternion', () => {
		expect(new Quaternion(1, 0, 0, 0).length()).to.equal(1);
		expect(new Quaternion(3, 4, 2, 5.4).length()).to.equal(7.626270385975047);
		expect(new Quaternion(-43, 56, 24, 2.3).length()).to.equal(74.60757334212124);
		expect(new Quaternion().length()).to.equal(1);
	});
	it('normalize() - normalizes the length of a Quaternion', () => {
		expect(new Quaternion(1, 0, 0, 0).length()).to.equal(1);
		expect(new Quaternion(1, 0, 0, 0).normalize().length()).to.equal(1);
		expect(new Quaternion(3, 4, 2, -3).length()).to.equal(6.164414002968976);
		expect(new Quaternion(3, 4, 2, -3).normalize().length()).to.equal(1);
		expect(new Quaternion(3, -4, 2, 2.3).normalize()).to.deep.equal(new Quaternion(0.51231551957856, -0.68308735943808, 0.34154367971904, 0.39277523167689593));
		// Handle zero case.
		expect(new Quaternion(0, 0, 0, 0).length()).to.equal(0);
		expect(new Quaternion(0, 0, 0, 0).normalize().length()).to.equal(1);
		// Normalizing zero quaternions should throw a warning.
		expect(popLastWarning()).to.equal('Attempting to normalize zero length Quaternion.');
		// Check that it returns this.
		const quaternion = new Quaternion(1, 1, 1, 2.4);
		const returnValue = quaternion.normalize();
		expect(returnValue).to.equal(quaternion);
	});
	it('multiply(), premultiply() - multiplies with another quaternion', () => {
		const xAxis = new Vector3(1, 0, 0);
		const yAxis = new Vector3(0, 1, 0);
		const zAxis = new Vector3(0, 0, 1);
		const q1 = new Quaternion().setFromUnitVectors(xAxis, yAxis);
		expect(xAxis.clone().applyQuaternion(q1).sub(yAxis).length()).to.almost(0, NUMERICAL_TOLERANCE);
		const q2 = new Quaternion().setFromUnitVectors(yAxis, zAxis);
		expect(xAxis.clone().applyQuaternion(q2).sub(xAxis).length()).to.almost(0, NUMERICAL_TOLERANCE);
		const q3 = new Quaternion().copy(q2).multiply(q1);
		expect(xAxis.clone().applyQuaternion(q3).sub(zAxis).length()).to.almost(0, NUMERICAL_TOLERANCE);
		const q4 = new Quaternion().copy(q1).premultiply(q2);
		expect(xAxis.clone().applyQuaternion(q4).sub(zAxis).length()).to.almost(0, NUMERICAL_TOLERANCE);
		// Expect multiplication with unit quaternion to do nothing.
		const quat1 = new Quaternion(-43, 56, 24, 2.3).normalize();
		expect(quat1.clone().multiply(new Quaternion())).to.deep.equal(quat1);
		expect(quat1.clone().premultiply(new Quaternion())).to.deep.equal(quat1);
		// Try some arbitrary values.
		const quat2 = new Quaternion(3, 4, 2, -3).normalize();
		const multiply = quat1.clone().multiply(quat2);
		const premultiply = quat1.clone().premultiply(quat2);
		expect(multiply).to.deep.equal(new Quaternion(
			0.3302805970751364,
			-0.0017394633157347683,
			-0.8858216935379235,
			-0.3259319387857995,
		));
		expect(premultiply).to.deep.equal(new Quaternion(
			0.2607020644457463,
			-0.6888274730309625,
			0.5927221248366173,
			-0.3259319387857995,
		));
		// Check that it returns this.
		const quaternion = new Quaternion(1, 1, 1, 2.4);
		const returnValue = quaternion.multiply(new Quaternion());
		expect(returnValue).to.equal(quaternion);
	});
	it('copy() - copies a Quaternion', () => {
		const quaternion1 = new Quaternion(5.4, 0.5, 3.4, 2.3);
		const quaternion2 = new Quaternion();
		const returnValue = quaternion2.copy(quaternion1);
		expect(quaternion2.x).to.equal(5.4);
		expect(quaternion2.y).to.equal(0.5);
		expect(quaternion2.z).to.equal(3.4);
		expect(quaternion2.w).to.equal(2.3);
		// Make sure it is a deep copy.
		quaternion1.normalize();
		expect(quaternion1.x).to.equal(0.7939459645042156);
		expect(quaternion1.y).to.equal(0.07351351523187181);
		expect(quaternion1.z).to.equal(0.4998919035767283);
		expect(quaternion1.w).to.equal(0.3381621700666103);
		expect(quaternion2.x).to.equal(5.4);
		expect(quaternion2.y).to.equal(0.5);
		expect(quaternion2.z).to.equal(3.4);
		expect(quaternion2.w).to.equal(2.3);
		// Check that it returns this.
		expect(returnValue).to.equal(quaternion2);
	});
	it('clone() - clones a Quaternion', () => {
		const quaternion1 = new Quaternion(5.4, 0.5, 3.4, 2.3);
		const quaternion2 = quaternion1.clone();
		expect(quaternion2.x).to.equal(5.4);
		expect(quaternion2.y).to.equal(0.5);
		expect(quaternion2.z).to.equal(3.4);
		expect(quaternion2.w).to.equal(2.3);
		// Make sure it is a deep copy.
		quaternion1.normalize();
		expect(quaternion1.x).to.equal(0.7939459645042156);
		expect(quaternion1.y).to.equal(0.07351351523187181);
		expect(quaternion1.z).to.equal(0.4998919035767283);
		expect(quaternion1.w).to.equal(0.3381621700666103);
		expect(quaternion2.x).to.equal(5.4);
		expect(quaternion2.y).to.equal(0.5);
		expect(quaternion2.z).to.equal(3.4);
		expect(quaternion2.w).to.equal(2.3);
	});
});