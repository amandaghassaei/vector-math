"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundValueToIncrement = exports.degreesToRadians = exports.radiansToDegrees = exports.clampValue = void 0;
function clampValue(value, min, max) {
    return Math.max(Math.min(value, max), min);
}
exports.clampValue = clampValue;
function radiansToDegrees(value) {
    return value * 180 / Math.PI;
}
exports.radiansToDegrees = radiansToDegrees;
function degreesToRadians(value) {
    return value / 180 * Math.PI;
}
exports.degreesToRadians = degreesToRadians;
function roundValueToIncrement(value, coarseStep) {
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
exports.roundValueToIncrement = roundValueToIncrement;
//# sourceMappingURL=Number.js.map