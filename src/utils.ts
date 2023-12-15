export function getStackTraceAsStringArray(): string[] {
    try {
        throw new Error('');
    } catch (error: any) {
        /* c8 ignore next 1 */
        const stackString: string = error.stack || '';
        const stack = stackString.split('\n').map((line) => line.trim());
        stack.unshift(); // Remove first element (just points to this function).
        return stack;
    }
}