/**
 * Clamp a value between a minimum and maximum value.
 * @param value - The value to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
export function clampValue(value, min, max) {
    return Math.max(Math.min(value, max), min);
}
/**
 * Convert a value in radians to degrees.
 * @param value - The value in radians.
 * @returns The value in degrees.
 */
export function radiansToDegrees(value) {
    return value * 180 / Math.PI;
}
/**
 * Convert a value in degrees to radians.
 * @param value - The value in degrees.
 * @returns The value in radians.
 */
export function degreesToRadians(value) {
    return value / 180 * Math.PI;
}
/**
 * Round value to increment, if increment is 0, return value.
 * @param value - The value to round.
 * @param coarseStep - The increment to round to.
 * @returns The rounded value.
 */
export function roundValueToIncrement(value, coarseStep) {
    var _a;
    if (coarseStep === 0)
        return value;
    if (coarseStep < 0)
        throw new Error(`Invalid coarse step: ${coarseStep}.`);
    const rounded = Math.round(value / coarseStep) * coarseStep;
    // Use a rounding trick to avoid results like 1.7999999999998 instead of 1.8.
    const decimals = ((_a = coarseStep.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
    return parseFloat(rounded.toFixed(decimals));
}
//# sourceMappingURL=Number.js.map