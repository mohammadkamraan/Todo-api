export function PreCheck(preCheckers: string[]) {
  return function PreCheckDecorator(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: unknown[]) {
      for (const preChecker of preCheckers) {
        if (!target[preChecker]) {
          throw new Error(`PreChecker not found ${preChecker}`);
        }
        await target[preChecker].call(this, ...args);
      }
      await originalMethod.call(this, ...args);
    };
  };
}
