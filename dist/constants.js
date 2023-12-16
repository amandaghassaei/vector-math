export const DEFAULT_NUMERICAL_TOLERANCE = 1e-15;
let numericalTolerance = DEFAULT_NUMERICAL_TOLERANCE;
/**
 * Set global numerical tolerance for all mathematical operations and equality checks.
 * Default numerical tolerance is 1e-15.
 * @param tolerance - Numerical tolerance to set.
 */
export function setNumericalTolerance(tolerance) {
    numericalTolerance = tolerance;
}
export function NUMERICAL_TOLERANCE() {
    return numericalTolerance;
}
//# sourceMappingURL=constants.js.map