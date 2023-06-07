import { Matrix3 } from '../src/Matrix3';
import { expect, use } from 'chai';
const chaiAlmost = require('chai-almost');
import { Vector2 } from '../src/Vector2';
import { checkWarnings } from './test-utils/utils';
import { Vector2 as THREE_Vector2 } from 'three';

use(chaiAlmost());

type NumberArrayLength6 = [number, number, number, number, number, number];

const identity: NumberArrayLength6 = [
	1, 0, 0,
	0, 1, 0,
];

describe('Matrix3', () => {
	afterEach(() => {
		checkWarnings();
	});
	it('constructor inits a Matrix3', () => {
		// No params defaults to identity matrix.
		const matrix1 = new Matrix3();
		expect(matrix1.elements).to.deep.equal(identity);
		expect(matrix1.elements.length).to.equal(6);
		// Init with constructor params.
		const elements = [0, 1, 2, 3, 4, 5] as NumberArrayLength6;
		const matrix2 = new Matrix3(...elements);
		expect(matrix2.elements).to.deep.equal(elements);
		// Shallow copy.
		expect(matrix2.elements).to.not.equal(elements);
		expect(matrix1.elements.length).to.equal(6);
	});
	it('throws setter errors', () => {
		expect(() => {(new Matrix3()).elements = identity}).to.throw(Error, 'No elements setter on Matrix3.');
		expect(() => {(new Matrix3()).isIdentity = true}).to.throw(Error, 'No isIdentity setter on Matrix3.');
	});
	it('isIdentity - keeps track of whether it equals identity', () => {
		// Matrix starts with isIdentity = true is no constructor args.
		expect(new Matrix3().isIdentity).to.equal(true);
		// Constructor args sets isIdentity = false, unless args are identity values.
		const elements = [
			3, 5.6, -7,
			42, 0, 6.5,
		] as NumberArrayLength6;
		expect(new Matrix3(...elements).isIdentity).to.equal(false);
		expect(new Matrix3(...identity).isIdentity).to.equal(true);
		// setIdentity() sets isIdentity = true.
		expect(new Matrix3(...elements).setIdentity().isIdentity).to.equal(true);
		// // premultiplyMatrix() may change isIdentity.
		// expect(new Matrix3().premultiplyMatrix4(new Matrix3()).isIdentity).to.equal(true);
		// expect(new Matrix3().premultiplyMatrix4(new Matrix3(...elements)).isIdentity).to.equal(false);
		// expect(new Matrix3(...elements).premultiplyMatrix4(new Matrix3()).isIdentity).to.equal(false);
		// expect(new Matrix3(...elements).premultiplyMatrix4(new Matrix3(...elements)).isIdentity).to.equal(false);
		// // setRotationAxisAngleAtOffset() with non-zero angle sets isIdentity = false.
		// expect(new Matrix3().setRotationAxisAngleAtOffset(new Vector3(1, 4.5, 2).normalize(), 0.5, new Vector3(4.5, -3, 2)).isIdentity).to.equal(false);
		// // setRotationAxisAngleAtOffset() with zero angle sets isIdentity = true.
		// expect(new Matrix3().setRotationAxisAngleAtOffset(new Vector3(1, 4.5, 2).normalize(), 0, new Vector3(4.5, -3, 2)).isIdentity).to.equal(true);
		// expect(new Matrix3(...elements).setRotationAxisAngleAtOffset(new Vector3(1, 4.5, 2).normalize(), 0, new Vector3(4.5, -3, 2)).isIdentity).to.equal(true);
		// // invertTransform() maintains original isIdentity.
		// expect(new Matrix3().invertTransform().isIdentity).to.equal(true);
		// expect(new Matrix3(...elements).invertTransform().isIdentity).to.equal(false);
		// Copy/clone transfers isIdentity.
		expect(new Matrix3().copy(new Matrix3(...elements)).isIdentity).to.equal(false);
		expect(new Matrix3(...elements).clone().isIdentity).to.equal(false);
		expect(new Matrix3(...elements).copy(new Matrix3()).isIdentity).to.equal(true);
		expect(new Matrix3().clone().isIdentity).to.equal(true);
	});
	it('setIdentity() - sets Matrix3 to identity matrix', () => {
		const elements = [
			3, 5.6, -7,
			42, 0, 6.5,
		] as NumberArrayLength6;
		const matrix = new Matrix3(...elements);
		expect(matrix.elements).to.deep.equal(elements);
		const returnValue = matrix.setIdentity();
		expect(matrix.elements).to.deep.equal(identity);
		expect(matrix.isIdentity).to.deep.equal(true);
		// Check that it returns this.
		expect(returnValue).to.equal(matrix);
	});
	it('setFromRotationTranslation() - sets Matrix3 based on rotation and translation', () => {
		const elements = [
			3, 5.6, -7,
			42, 0, 6.5,
		] as NumberArrayLength6;
		// Returns identity matrix is axis is already aligned with x axis.
		const matrix = new Matrix3(...elements);
		matrix.setFromRotationTranslation(0, new Vector2());
		expect(matrix.elements).to.deep.equal(identity);
		expect(matrix.isIdentity).to.deep.equal(true);
		// Calcs correct value for non-zero angle.
		const returnValue = matrix.setFromRotationTranslation(-1.5191182423124665, new Vector2(-5.6, -0.2));
		const solution = [
			0.05165508542804021, 0.9986649849421085, -0.4890014753854469,
			-0.9986649849421085, 0.05165508542804021, 5.582192898590199,
		];
		expect(matrix.elements).to.deep.equal(solution);
		// Check that transform translates position correctly.
		expect(new Vector2(5.6, 0.2).applyMatrix3(matrix)).to.deep.almost(new Vector2(), 1e-9);
		// Check that transform translates and rotates unit vectors.
		const orientation = new Vector2(0.05165508542804009, 0.9986649849421085);
		expect(new Vector2(5.6, 0.2).add(orientation).applyMatrix3(matrix)).to.deep.almost(new Vector2(1, 0), 1e-9);
		expect(new Vector2(5.6, 0.2).add(new Vector2(-orientation.y, orientation.x)).applyMatrix3(matrix)).to.deep.almost(new Vector2(0, 1), 1e-9);
		expect(new Vector2(5.6, 0.2).sub(orientation).applyMatrix3(matrix)).to.deep.almost(new Vector2(-1, 0), 1e-9);
		// Check that it returns this.
		expect(returnValue).to.equal(matrix);
		// works with threejs.
		const threeMatrix = new Matrix3().setFromRotationTranslation(-1.5191182423124665, new THREE_Vector2(-5.6, -0.2));
		expect(threeMatrix.elements).to.deep.equal(solution);
	});
	it('equals() - tests equality with Matrix4', () => {
		const matrix1 = new Matrix3().setFromRotationTranslation(-1.5191182423124665, new Vector2(-5.6, -0.2));
		const matrix2 = new Matrix3().setFromRotationTranslation(-1.5191182423124665, new Vector2(-5.6, -0.2));
		expect(matrix1 === matrix2).to.equal(false);
		expect(matrix1.equals(matrix2)).to.equal(true);
		expect(matrix1.equals(new Matrix3())).to.equal(false);
		expect(matrix1.setIdentity().equals(new Matrix3())).to.equal(true);
	});
	it('copy() - copied the input Matrix3', () => {
		const elements = [
			3, 5.6, -7,
			42, 0, 6.5,
		] as NumberArrayLength6;
		const matrix1 = new Matrix3(...elements);
		const matrix2 = new Matrix3();
		const returnValue = matrix2.copy(matrix1);
		expect(matrix1.elements).to.deep.equal(elements);
		// Make sure this is a deep copy.
		matrix2.setIdentity();
		expect(matrix2.elements[0]).to.equal(1);
		expect(elements[0]).to.equal(3);
		// Check that it returns this.
		expect(returnValue).to.equal(matrix2);
	});
	it('clone() - clones the Matrix3', () => {
		const elements = [
			3, 5.6, -7,
			42, 0, 6.5,
		] as NumberArrayLength6;
		const matrix1 = new Matrix3(...elements);
		const matrix2 = matrix1.clone();
		expect(matrix2.elements).to.deep.equal(elements);
		// Make sure this is a deep copy.
		matrix2.setIdentity();
		expect(matrix2.elements[0]).to.equal(1);
		expect(elements[0]).to.equal(3);
	});
});