export default class StackError extends Error {
  constructor(message = '') {
    const words = message.split(/\s+/).filter((word) => word !== '');
    const previousLimit = Error.stackTraceLimit;

    Error.stackTraceLimit = words.length;
    try {
      if (words.length === 0) {
        throw new Error('❌');
      }

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

      const func = funcs[0];
      func(funcs.slice(1));
    } catch (error) {
      Object.setPrototypeOf(error, StackError.prototype);
      return error;
    } finally {
      Error.stackTraceLimit = previousLimit;
    }
  }
}
