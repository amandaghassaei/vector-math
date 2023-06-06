export function clampValue(value: number, min: number, max: number) {
	return Math.max(Math.min(value, max), min);
}

export function radiansToDegrees(value: number) {
	return value * 180 / Math.PI;
}

export function degreesToRadians(value: number) {
	return value / 180 * Math.PI;
}

export function roundValueToIncrement(value: number, coarseStep: number) {
	if (coarseStep === 0) return value;
	if (coarseStep < 0) throw new Error(`Invalid coarse step: ${coarseStep}.`);
	const rounded = Math.round(value / coarseStep) * coarseStep;
	// Use a rounding trick to avoid results like 1.7999999999998 instead of 1.8.
	const decimals = coarseStep.toString().split('.')[1]?.length || 0;
	return parseFloat(rounded.toFixed(decimals));
}