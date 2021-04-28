export default class StackError extends Error {
  constructor(message = '') {
    const words = message.split(/\s+/);
    const previousLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = words.length;
    try {
      const funcs = words.reverse().map((word) => {
        const func = new Function(
          'funcs',
          `
        if (funcs.length > 0) {
          const func = funcs[0];
          func(funcs.slice(1));
        } else {
          throw new Error("↓");
        }
      `,
        );
        Object.defineProperty(func, 'name', { value: word });
        return func;
      });

      if (funcs.length > 0) {
        const func = funcs[0];
        func(funcs.slice(1));
      } else {
        capture();
      }
    } catch (error) {
      Object.setPrototypeOf(error, StackError.prototype);
      return error;
    } finally {
      Error.stackTraceLimit = previousLimit;
    }
  }
}
