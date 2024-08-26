import { Matrix4 } from '../src/Matrix4';
import { expect, use } from 'chai';
import chaiAlmost from 'chai-almost';
import { Vector3 } from '../src/Vector3';
import { checkWarnings } from './test-utils/utils';
import { Vector3 as THREE_Vector3 } from 'three';

use(chaiAlmost());

type NumberArrayLength12 = [number, number, number, number, number, number, number, number, number, number, number, number];

const identity: NumberArrayLength12 = [
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
];

describe('Matrix4', () => {
	afterEach(() => {
		checkWarnings();
	});
	it('constructor inits a Matrix4', () => {
		// No params defaults to identity matrix.
		const matrix1 = new Matrix4();
		expect(matrix1.elements).to.deep.equal(identity);
		expect(matrix1.elements.length).to.equal(12);
		// Init with constructor params.
		const elements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as NumberArrayLength12;
		const matrix2 = new Matrix4(...elements);
		expect(matrix2.elements).to.deep.equal(elements);
		// Shallow copy.
		expect(matrix2.elements).to.not.equal(elements);
		expect(matrix1.elements.length).to.equal(12);
	});
	it('throws setter errors', () => {
		expect(() => {(new Matrix4()).elements = identity}).to.throw(Error, 'No elements setter on Matrix4.');
		expect(() => {(new Matrix4()).isIdentity = true}).to.throw(Error, 'No isIdentity setter on Matrix4.');
	});
	it('isIdentity - keeps track of whether it equals identity', () => {
		// Matrix starts with isIdentity = true is no constructor args.
		expect(new Matrix4().isIdentity).to.equal(true);
		// Constructor args sets isIdentity = false, unless args are identity values.
		const elements = [
			0.06917595575246746,
			-0.22509591459618652,
			0.9718778299651859,
			1.5696647953949647,
			0.5705563846261986,
			0.8080775166499933,
			0.1465473952244158,
			-3.4363659713167456,
			-0.8183398432851806,
			0.5443735448356084,
			0.18432944576247148,
			6.946991037765195
		] as NumberArrayLength12;
		expect(new Matrix4(...elements).isIdentity).to.equal(false);
		expect(new Matrix4(...identity).isIdentity).to.equal(true);
		// setIdentity() sets isIdentity = true.
		expect(new Matrix4(...elements).setIdentity().isIdentity).to.equal(true);
		// multiplyMatrix4() may change isIdentity.
		expect(new Matrix4().multiplyMatrix4(new Matrix4()).isIdentity).to.equal(true);
		expect(new Matrix4().multiplyMatrix4(new Matrix4(...elements)).isIdentity).to.equal(false);
		expect(new Matrix4(...elements).multiplyMatrix4(new Matrix4()).isIdentity).to.equal(false);
		expect(new Matrix4(...elements).multiplyMatrix4(new Matrix4(...elements)).isIdentity).to.equal(false);
		expect(new Matrix4(...elements).multiplyMatrix4(new Matrix4(...elements).invertTransform()).isIdentity).to.equal(true);
		// premultiplyMatrix4() may change isIdentity.
		expect(new Matrix4().premultiplyMatrix4(new Matrix4()).isIdentity).to.equal(true);
		expect(new Matrix4().premultiplyMatrix4(new Matrix4(...elements)).isIdentity).to.equal(false);
		expect(new Matrix4(...elements).premultiplyMatrix4(new Matrix4()).isIdentity).to.equal(false);
		expect(new Matrix4(...elements).premultiplyMatrix4(new Matrix4(...elements)).isIdentity).to.equal(false);
		expect(new Matrix4(...elements).premultiplyMatrix4(new Matrix4(...elements).invertTransform()).isIdentity).to.equal(true);
		// setRotationAxisAngleAtOffset() with non-zero angle sets isIdentity = false.
		expect(new Matrix4().setRotationAxisAngleAtOffset(new Vector3(1, 4.5, 2).normalize(), 0.5, new Vector3(4.5, -3, 2)).isIdentity).to.equal(false);
		// setRotationAxisAngleAtOffset() with zero angle sets isIdentity = true.
		expect(new Matrix4().setRotationAxisAngleAtOffset(new Vector3(1, 4.5, 2).normalize(), 0, new Vector3(4.5, -3, 2)).isIdentity).to.equal(true);
		expect(new Matrix4(...elements).setRotationAxisAngleAtOffset(new Vector3(1, 4.5, 2).normalize(), 0, new Vector3(4.5, -3, 2)).isIdentity).to.equal(true);
		// invertTransform() maintains original isIdentity.
		expect(new Matrix4().invertTransform().isIdentity).to.equal(true);
		expect(new Matrix4(...elements).invertTransform().isIdentity).to.equal(false);
		// Copy/clone transfers isIdentity.
		expect(new Matrix4().copy(new Matrix4(...elements)).isIdentity).to.equal(false);
		expect(new Matrix4(...elements).clone().isIdentity).to.equal(false);
		expect(new Matrix4(...elements).copy(new Matrix4()).isIdentity).to.equal(true);
		expect(new Matrix4().clone().isIdentity).to.equal(true);
	});
	it('setIdentity() - sets Matrix4 to identity matrix', () => {
		const elements = [
			3, 5.6, -7, 13,
			42, 0, 6.5, 23,
			7, 64, -234.1, 0,
		] as NumberArrayLength12;
		const matrix = new Matrix4(...elements);
		expect(matrix.elements).to.deep.equal(elements);
		const returnValue = matrix.setIdentity();
		expect(matrix.elements).to.deep.equal(identity);
		expect(matrix.isIdentity).to.deep.equal(true);
		// Check that it returns this.
		expect(returnValue).to.equal(matrix);
	});
	it('multiplyMatrix4() - multiplies a matrix', () => {
		const elements1 = [
			3, 5.6, -7, 13,
			42, 0, 6.5, 23,
			7, 64, -234.1, 0,
		] as NumberArrayLength12;
		const elements2 = [
			56, 394.5, 0, 24.3,
			54, -26, -46.67, 0.02,
			34, 728, 90.75, -56,
		] as NumberArrayLength12;
		const solution = [
			232.39999999999998, -4058.1, -896.602, 478.012,
			2573, 21301, 589.875, 679.6,
			-4111.4, -169327.3, -24231.455, 13280.98,
		];
		const matrix1 = new Matrix4(...elements1);
		expect(matrix1.elements).to.deep.equal(elements1);
		const matrix2 = new Matrix4(...elements2);
		expect(matrix2.elements).to.deep.equal(elements2);
		const returnValue = matrix1.multiplyMatrix4(matrix2);
		expect(matrix1.elements).to.deep.equal(solution);
		// Check that it returns this.
		expect(returnValue).to.equal(matrix1);

		// Pass isIdentity forward.
		const matrix3 = new Matrix4().setIdentity();
		const matrix4 = new Matrix4().setIdentity();
		matrix3.multiplyMatrix4(matrix4);
		expect(matrix3.isIdentity).to.equal(true);
		matrix3.multiplyMatrix4(matrix1);
		expect(matrix3.isIdentity).to.equal(false);
		matrix3.multiplyMatrix4(matrix4);
		expect(matrix3.isIdentity).to.equal(false);
	});
	it('premultiplyMatrix4() - multiplies a matrix in front', () => {
		const elements1 = [
			3, 5.6, -7, 13,
			42, 0, 6.5, 23,
			7, 64, -234.1, 0,
		] as NumberArrayLength12;
		const elements2 = [
			56, 394.5, 0, 24.3,
			54, -26, -46.67, 0.02,
			34, 728, 90.75, -56,
		] as NumberArrayLength12;
		const solution = [
			16737, 313.59999999999997, 2172.25, 9825.8,
			-1256.69, -2684.48, 10378.447, 104.02,
			31313.25, 5998.4, -16750.575, 17130,
		];
		const matrix1 = new Matrix4(...elements1);
		expect(matrix1.elements).to.deep.equal(elements1);
		const matrix2 = new Matrix4(...elements2);
		expect(matrix2.elements).to.deep.equal(elements2);
		const returnValue = matrix1.premultiplyMatrix4(matrix2);
		expect(matrix1.elements).to.deep.equal(solution);
		// Check that it returns this.
		expect(returnValue).to.equal(matrix1);

		// Pass isIdentity forward.
		const matrix3 = new Matrix4().setIdentity();
		const matrix4 = new Matrix4().setIdentity();
		matrix3.premultiplyMatrix4(matrix4);
		expect(matrix3.isIdentity).to.equal(true);
		matrix3.premultiplyMatrix4(matrix1);
		expect(matrix3.isIdentity).to.equal(false);
		matrix3.premultiplyMatrix4(matrix4);
		expect(matrix3.isIdentity).to.equal(false);
	});
	it('setTranslation() - sets the Matrix4 for translation', () => {
		const elements = [
			3, 5.6, -7, 13,
			42, 0, 6.5, 23,
			7, 64, -234.1, 0,
		] as NumberArrayLength12;
		// Returns identity matrix for zero translation.
		const matrix1 = new Matrix4(...elements);
		matrix1.setTranslation(new Vector3(0, 0, 0));
		expect(matrix1.elements).to.deep.equal(identity);
		expect(matrix1.isIdentity).to.deep.equal(true);
		// Calcs correct value for non-zero angle.
		const returnValue = matrix1.setTranslation(new Vector3(1, 4.5, 2));
		const solution1 = [
			1, 0, 0, 1,
			0, 1, 0, 4.5,
			0, 0, 1, 2,
		];
		expect(matrix1.elements).to.deep.equal(solution1);
		// Check that it returns this.
		expect(returnValue).to.equal(matrix1);
		// Works with threejs.
		const threeMatrix = new Matrix4().setTranslation(new THREE_Vector3(1, 4.5, 2));
		expect(threeMatrix.elements).to.deep.equal(solution1);
	});
	it('setRotationAxisAngleAtOffset() - sets Matrix4 for rotation at offset', () => {
		const elements = [
			3, 5.6, -7, 13,
			42, 0, 6.5, 23,
			7, 64, -234.1, 0,
		] as NumberArrayLength12;
		// Returns identity matrix for zero angle.
		const matrix1 = new Matrix4(...elements);
		matrix1.setRotationAxisAngleAtOffset(new Vector3(1, 4.5, 2).normalize(), 0, new Vector3(4.5, -3, 2));
		expect(matrix1.elements).to.deep.equal(identity);
		expect(matrix1.isIdentity).to.deep.equal(true);
		// Calcs correct value for non-zero angle.
		matrix1.setRotationAxisAngleAtOffset(new Vector3(1, 4.5, 2).normalize(), 1.43, new Vector3(4.5, -3, 2));
		const solution1 = [
			0.17437787888250955, -0.24086811523182325, 0.9547643198303474, 1.0831665596725426,
			0.5472845725537784, 0.8297686348211359, 0.1093782853755548, -3.1922312427797044,
			-0.8185792276872562, 0.5034546292683556, 0.2765166979898279, 6.640937016418064,
		];
		expect(matrix1.elements).to.deep.equal(solution1);
		// Calcs correct value for non-zero angle.
		matrix1.setRotationAxisAngleAtOffset(new Vector3(1, 4.5, 2).normalize(), 1.43);
		const solution2 = [
			0.17437787888250955, -0.24086811523182325, 0.9547643198303474, 0,
			0.5472845725537784, 0.8297686348211359, 0.1093782853755548, 0,
			-0.8185792276872562, 0.5034546292683556, 0.2765166979898279, 0,
		];
		expect(matrix1.elements).to.deep.equal(solution2);
		// Rotation of 2PI gives ~ the identity matrix.
		const returnValue = matrix1.setRotationAxisAngleAtOffset(new Vector3(1, 4.5, 2).normalize(), Math.PI * 2, new Vector3(4.5, -3, 2));
		expect(matrix1.elements).to.deep.almost(identity, 1e-9);
		// Check that it returns this.
		expect(returnValue).to.equal(matrix1);
		// Should not introduce scaling.
		const zAxis = new Vector3(0, 0, 1);
		matrix1.setRotationAxisAngleAtOffset(
			new Vector3(0.9045940380215871, 0.26562212486081765, -0.333398430050627),
			1.7568580638288094,
			new Vector3(-4.312631894903541, -2.1348983796428866, -1.4201651557182073),
		);
		zAxis.applyMatrix4RotationComponent(matrix1);
		expect(zAxis.length()).to.almost.equal(1);
		// Works with threejs.
		const threeMatrix = new Matrix4().setRotationAxisAngleAtOffset(new THREE_Vector3(1, 4.5, 2).normalize(), 1.43, new THREE_Vector3(4.5, -3, 2));
		expect(threeMatrix.elements).to.deep.equal(solution1);
	});
	it('setRotationFromVectorToVector() - sets Matrix4 for rotation from unit vector to unit vector', () => {
		const elements = [
			3, 5.6, -7, 13,
			42, 0, 6.5, 23,
			7, 64, -234.1, 0,
		] as NumberArrayLength12;
		// Returns identity matrix for zero angle.
		const matrix1 = new Matrix4(...elements);
		matrix1.setRotationFromVectorToVector(new Vector3(1, 4.5, 2).normalize(), new Vector3(1, 4.5, 2).normalize());
		expect(matrix1.elements).to.deep.equal(identity);
		expect(matrix1.isIdentity).to.deep.equal(true);
        // Returns 180 degree rotation from opposite vectors.
        matrix1.setRotationFromVectorToVector(new Vector3(1, 4.5, 2).normalize(), new Vector3(-1, -4.5, -2).normalize());
        expect(matrix1.elements).to.deep.almost.equal([
            0.9058823529411764, -0.4235294117647059, 0, 0,
            -0.4235294117647059, -0.9058823529411765, 0, 0,
            0, 0, -1, 0,
        ]);
        expect(new Vector3(1, 4.5, 2).normalize().applyMatrix4(matrix1)).to.deep.almost.equal(new Vector3(-1, -4.5, -2).normalize());
		// Calcs correct value for non-zero angle.
		matrix1.setRotationFromVectorToVector(new Vector3(1, 4.5, 2).normalize(), new Vector3(4.5, -3, 2));
		const solution1 = [
			-0.44396423043434574, 4.884090315705083, 0.5388889786417378, 0,
			-4.369755553247816, -0.8750257456366265, -3.383721011534349, 0,
			-2.2472151539462315, 2.5865021297255852, 0.32891559565099415, 0,
		];
		// expect(matrix1.elements).to.deep.equal(solution1);
		// Calcs correct value for non-zero angle.
		const returnValue = matrix1.setRotationFromVectorToVector(new Vector3(1, 4.5, 2).normalize(), new Vector3(3, -2, 0).normalize(), new Vector3(20, 0, -4));
		const solution2 = [
			-0.25829005667251026, 0.9648358604103944, 0.048764834565956594, 25.360860471714034,
			-0.7462008460383383, -0.16719213401748687, -0.6443842702102113, 12.34647983992592,
			-0.6135719550271014, -0.202826410481506, 0.7631454010969387, 11.324020704929783,
		];
		expect(matrix1.elements).to.deep.equal(solution2);
		// Check that it returns this.
		expect(returnValue).to.equal(matrix1);
		// Should not introduce scaling.
		const zAxis = new Vector3(0, 0, 1);
		matrix1.setRotationFromVectorToVector(
			new Vector3(1, 4.5, 2).normalize(),
			new Vector3(4.5, -3, 2).normalize(),
		);
		zAxis.applyMatrix4RotationComponent(matrix1);
		expect(zAxis.length()).to.almost.equal(1);
		// Works with threejs.
		const threeMatrix = new Matrix4().setRotationFromVectorToVector(new THREE_Vector3(1, 4.5, 2).normalize(), new THREE_Vector3(4.5, -3, 2));
		expect(threeMatrix.elements).to.deep.equal(solution1);
	});
	it('setReflectionNormalAtOffset() - sets Matrix4 for reflection at offset', () => {
		const elements = [
			3, 5.6, -7, 13,
			42, 0, 6.5, 23,
			7, 64, -234.1, 0,
		] as NumberArrayLength12;
		const matrix1 = new Matrix4(...elements);
		matrix1.setReflectionNormalAtOffset(new Vector3(1, 4.5, 2).normalize(), new Vector3(4.5, -3, 2));
		const solution = [
			0.9207920792079208, -0.3564356435643564, -0.15841584158415842, -0.3960396039603962,
			-0.3564356435643564, -0.6039603960396038, -0.7128712871287128, -1.7821782178217824,
			-0.15841584158415842, -0.7128712871287128, 0.6831683168316831, -0.7920792079207921,
		];
		expect(matrix1.elements).to.deep.equal(solution);
		// Reflection on z axis ~ the identity matrix with negative z component.
		const returnValue = matrix1.setReflectionNormalAtOffset(new Vector3(0, 0, 1));
		expect(matrix1.elements).to.deep.almost([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, -1, 0,
		], 1e-9);
		// Check that it returns this.
		expect(returnValue).to.equal(matrix1);
		// Should not introduce scaling.
		const zAxis = new Vector3(0, 0, 1);
		matrix1.setReflectionNormalAtOffset(
			new Vector3(0.9045940380215871, 0.26562212486081765, -0.333398430050627),
			new Vector3(-4.312631894903541, -2.1348983796428866, -1.4201651557182073),
		);
		zAxis.applyMatrix4RotationComponent(matrix1);
		expect(zAxis.length()).to.almost.equal(1);
		// Works with threejs.
		const threeMatrix = new Matrix4().setReflectionNormalAtOffset(new THREE_Vector3(1, 4.5, 2).normalize(), new THREE_Vector3(4.5, -3, 2));
		expect(threeMatrix.elements).to.deep.equal(solution);
	});
	it('invertTransform() - inverts a Matrix4 transform', () => {
		const matrix = new Matrix4().setRotationAxisAngleAtOffset(new Vector3(3, 5.6, -1).normalize(), -3.5, new Vector3(4.5, -34, 0.0));
		const matrixElements = [
			-0.5150807156849653, 0.8411126776308662, 0.16498884767795308, 35.41569426003179,
			0.732024283030903, 0.5318044759935215, -0.42582208534357285, -19.21275708985933,
			-0.4459061620818404, -0.09855690154368352, -0.8896371348901484, -1.3443569231169579,
		];
		expect(matrix.elements).to.deep.equal(matrixElements);
		const inverseMatrix = matrix.clone().invertTransform();
		const inverseMatrixElements = [
			-0.5150807156849653, 0.732024283030903, -0.4459061620818404, 31.70668884363303,
			0.8411126776308662, 0.5318044759935215, -0.09855690154368352, -19.703654865559187,
			0.16498884767795308, -0.42582208534357285, -0.8896371348901484, -15.220400716232264,
		];
		expect(inverseMatrix.elements).to.deep.equal(inverseMatrixElements);
		// Check that matrix times inverse is identity.
		expect(matrix.clone().premultiplyMatrix4(inverseMatrix).elements).to.deep.almost(identity, 1e-9);
		// Check that transforming vector by matrix and inverse returns the same vector.
		const vector3 = new Vector3(5, 7.3, 0.2);
		const vector3Transformed = vector3.clone().applyMatrix4(matrix).applyMatrix4(inverseMatrix);
		expect(vector3).to.deep.almost(vector3Transformed, 1e-9);
		// Check that it returns this.
		const returnValue = matrix.invertTransform();
		expect(returnValue).to.equal(matrix);
	});
	it('equals() - tests equality with Matrix4', () => {
		const matrix1 = new Matrix4().setRotationAxisAngleAtOffset(new Vector3(3, 5.6, -1).normalize(), -3.5, new Vector3(4.5, -34, 0.0));
		const matrix2 = new Matrix4().setRotationAxisAngleAtOffset(new Vector3(3, 5.6, -1).normalize(), -3.5, new Vector3(4.5, -34, 0.0));
		expect(matrix1 === matrix2).to.equal(false);
		expect(matrix1.equals(matrix2)).to.equal(true);
		expect(matrix1.equals(new Matrix4())).to.equal(false);
		expect(matrix1.setIdentity().equals(new Matrix4())).to.equal(true);
	});
	it('copy() - copied the input Matrix4', () => {
		const elements = [
			3, 5.6, -7, 13,
			42, 0, 6.5, 23,
			7, 64, -234.1, 0,
		] as NumberArrayLength12;
		const matrix1 = new Matrix4(...elements);
		const matrix2 = new Matrix4();
		const returnValue = matrix2.copy(matrix1);
		expect(matrix1.elements).to.deep.equal(elements);
		// Make sure this is a deep copy.
		matrix2.setIdentity();
		expect(matrix2.elements[0]).to.equal(1);
		expect(elements[0]).to.equal(3);
		// Check that it returns this.
		expect(returnValue).to.equal(matrix2);
	});
	it('clone() - clones the Matrix4', () => {
		const elements = [
			3, 5.6, -7, 13,
			42, 0, 6.5, 23,
			7, 64, -234.1, 0,
		] as NumberArrayLength12;
		const matrix1 = new Matrix4(...elements);
		const matrix2 = matrix1.clone();
		expect(matrix2.elements).to.deep.equal(elements);
		// Make sure this is a deep copy.
		matrix2.setIdentity();
		expect(matrix2.elements[0]).to.equal(1);
		expect(elements[0]).to.equal(3);
	});
});