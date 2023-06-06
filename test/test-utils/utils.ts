import { expect } from 'chai';

// Test if correct warnings are logged.
const warnings: string[] = [];
console.warn = (warning: string) => {
	warnings.push(warning);
}

export function checkWarnings() {
	// We should have handled all warnings, so warnings should be empty.
	expect(warnings.length).to.equal(0, `Uncaught console warning${ warnings.length > 1 ? 's' : '' }: ${JSON.stringify(warnings)}`);
	warnings.length = 0;
}

export function popLastWarning() {
	return warnings.pop();
}