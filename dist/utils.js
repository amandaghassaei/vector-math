export function getStackTraceAsString() {
    try {
        throw new Error('');
    }
    catch (error) {
        /* c8 ignore next 1 */
        const stackString = error.stack || '';
        const stack = stackString.split('\n').map((line) => line.trim());
        stack.splice(0, 2); // Remove first two elements (just points to this function).
        return stack.join('\n');
    }
}
//# sourceMappingURL=utils.js.map