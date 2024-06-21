/**
 * Clamp a value between a minimum and maximum value.
 * @param value - The value to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
export declare function clampValue(value: number, min: number, max: number): number;
/**
 * Convert a value in radians to degrees.
 * @param value - The value in radians.
 * @returns The value in degrees.
 */
export declare function radiansToDegrees(value: number): number;
/**
 * Convert a value in degrees to radians.
 * @param value - The value in degrees.
 * @returns The value in radians.
 */
export declare function degreesToRadians(value: number): number;
/**
 * Round value to increment, if increment is 0, return value.
 * @param value - The value to round.
 * @param coarseStep - The increment to round to.
 * @returns The rounded value.
 */
export declare function roundValueToIncrement(value: number, coarseStep: number): number;
