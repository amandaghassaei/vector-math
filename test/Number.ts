import { expect } from 'chai';
import { checkWarnings } from './test-utils/utils';
import {
	clampValue,
	degreesToRadians,
	radiansToDegrees,
	roundValueToIncrement,
} from '../src/Number';

describe('Vector2', () => {
	afterEach(() => {
		checkWarnings();
	});
	it('clampValue() - clamps a value in range [min, max]', () => {
		expect(clampValue(1.4, 0, 1)).to.equal(1);
		expect(clampValue(-1.4, 0, 1)).to.equal(0);
		expect(clampValue(0.5, 0, 1)).to.equal(0.5);
		expect(clampValue(-50, -180, 180)).to.equal(-50);
	});
	it('radiansToDegrees', () => {
		expect(radiansToDegrees(Math.PI / 2)).to.equal(90);
		expect(radiansToDegrees(-Math.PI / 2)).to.equal(-90);
		expect(radiansToDegrees(Math.PI)).to.equal(180);
		expect(radiansToDegrees(2 * Math.PI)).to.equal(360);
		expect(radiansToDegrees(0)).to.equal(0);
		expect(radiansToDegrees(3.5)).to.equal(200.53522829578813);
	});
	it('degreesToRadians', () => {
		expect(degreesToRadians(90)).to.equal(Math.PI / 2);
		expect(degreesToRadians(-90)).to.equal(-Math.PI / 2);
		expect(degreesToRadians(180)).to.equal(Math.PI);
		expect(degreesToRadians(360)).to.equal(2 * Math.PI);
		expect(degreesToRadians(0)).to.equal(0);
		expect(degreesToRadians(200.53522829578813)).to.equal(3.4999999999999996);
	});
	it('roundValueToIncrement - round number to nearest value according to supplied increment', () => {
		expect(roundValueToIncrement(3.4, 0)).to.equal(3.4);
		expect(roundValueToIncrement(3.4, -0)).to.equal(3.4);
		expect(roundValueToIncrement(3.4, 0.1)).to.equal(3.4);
		expect(roundValueToIncrement(3.4, 0.5)).to.equal(3.5);
		expect(roundValueToIncrement(3.4, 0.50)).to.equal(3.5);
		expect(roundValueToIncrement(3.4, 1)).to.equal(3);
		expect(roundValueToIncrement(3.4, 0.3)).to.equal(3.3);
		expect(roundValueToIncrement(3.4546456, 0.001)).to.equal(3.455);
		expect(() => {roundValueToIncrement(3.4, -0.5);}).to.throw(Error, 'Invalid coarse step: -0.5.');
	});
});