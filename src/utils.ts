export function getStackTraceAsString(): string {
    try {
        throw new Error('');
    } catch (error: any) {
        /* c8 ignore next 1 */
        const stackString: string = error.stack || '';
        const stack = stackString.split('\n').map((line) => line.trim());
        stack.splice(0, 2); // Remove first two elements (just points to this function).
        return stack.join('\n');
    }
}
