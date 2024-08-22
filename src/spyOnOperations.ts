import type { SpaceTradersSdk } from './sdk';

export function spyOnOperationCalls(
  instance: SpaceTradersSdk,
  onOperationStart?: (operation: SpaceTradersOperationStart) => void,
  onOperationResult?: (operation: SpaceTradersOperationResult) => void
) {
  for (const operationName of Object.getOwnPropertyNames(Object.getPrototypeOf(instance))) {
    if (operationName === 'constructor' || typeof instance[operationName] !== 'function') {
      // Little hacky, but should work, maybe static functions might become an issue at some point, maybe
      continue;
    }

    const originalFunction = instance[operationName];
    const wrappedFunction = async function (...args: any[]) {
      // Going to properly type all this inner shizzle at some point, not bothering right now
      if (onOperationStart) {
        onOperationStart({ operationName, arguments: args } as any);
      }

      try {
        const result = await originalFunction.apply(instance, args);

        if (onOperationResult) {
          onOperationResult({ operationName, arguments: args, result } as any);
        }
        return result;
      } catch (error) {
        throw error;
      }
    };

    // Try to make the wrapper look as much as the original function as possible
    Object.defineProperty(wrappedFunction, 'length', { value: originalFunction.length });
    Object.defineProperty(wrappedFunction, 'name', { value: originalFunction.name });

    // Replace
    instance[operationName] = wrappedFunction;
  }
}

interface GenericOperationStart<T extends keyof SpaceTradersSdk> {
  operationName: T;
  arguments: Parameters<SpaceTradersSdk[T]>;
}
interface GenericOperationResult<T extends keyof SpaceTradersSdk> extends GenericOperationStart<T> {
  result: Awaited<ReturnType<SpaceTradersSdk[T]>>;
}

// From a definition of a generic Start/Result type to a type containing all the possible values. This is the same as:
// type OperationStart = GenericOperationStart<'getStatus'> | GenericOperationStart<'register'> | ... for all of the operators
// type OperationResult = GenericOperationResult<'getStatus'> | GenericOperationResult<'register'> | ... for all of the operators
export type SpaceTradersOperationStart<T = keyof SpaceTradersSdk> = T extends keyof SpaceTradersSdk ? GenericOperationStart<T> : never;
export type SpaceTradersOperationResult<T = keyof SpaceTradersSdk> = T extends keyof SpaceTradersSdk ? GenericOperationResult<T> : never;
