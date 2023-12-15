export function getStackTraceAsStringArray() {
    try {
        throw new Error('');
    }
    catch (error) {
        /* c8 ignore next 1 */
        const stackString = error.stack || '';
        const stack = stackString.split('\n').map((line) => line.trim());
        stack.unshift(); // Remove first element (just points to this function).
        return stack;
    }
}
//# sourceMappingURL=utils.js.map