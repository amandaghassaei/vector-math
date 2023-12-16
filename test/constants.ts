import { expect, use } from 'chai';
import chaiAlmost from 'chai-almost';
import { checkWarnings } from './test-utils/utils';
import { DEFAULT_NUMERICAL_TOLERANCE, setNumericalTolerance } from '../src/constants';
import { Vector3 } from '../src/Vector3';

use(chaiAlmost());

describe('constants', () => {
	afterEach(() => {
		checkWarnings();
	});
    it('should return default numerical tolerance', () => {
        expect(DEFAULT_NUMERICAL_TOLERANCE).to.equal(1e-15);
    });
	it('should set numerical tolerance', () => {
        expect(new Vector3(0, 2, 3).equals(new Vector3(0, 2.1, 3))).to.equal(false);
        setNumericalTolerance(0.1);
        expect(new Vector3(0, 2, 3).equals(new Vector3(0, 2.1, 3))).to.equal(false);
		setNumericalTolerance(DEFAULT_NUMERICAL_TOLERANCE); // Put back for remaining tests.
	});
});