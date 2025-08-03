// import { decodeJwt, JWTPayload } from 'jose';

// export const getTokenData = <T = any>(token: string) => {
//   if (!token) return null;

//   try {
//     const decoded: JWTPayload & T = decodeJwt(token);
//     return decoded;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

/**
 * function that takes a key string like 'name' or 'name.first' and returns a function that takes an object and returns the value of the key in the object
 * @param obj - the object to get the value from
 * @param key - the key to get the value of you cane dots for nesting values
 */
export const getObjValue = <T = any>(obj: any, key: string | number) => {
  const keys = key.toString().split('.');
  let result = obj;
  for (const key of keys) {
    if (result && Object.hasOwn(result, key)) {
      result = result[key];
    } else {
      return undefined;
    }
  }
  return result as T;
};

/**
 * Convert Like HEADER_NAME to header name
 * @param enumValue - the enum value to convert
 * @returns the converted value
 */
export const enumToString = (enumValue: string) => {
  return enumValue.charAt(0).toUpperCase() + enumValue.slice(1).toLowerCase().replace(/_/g, ' ');
};

export const generateId = (prefix: string) => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Compares two objects and returns an object containing only the changed fields
 * @param oldValue - The original object
 * @param newValue - The new object to compare against
 * @param options - Optional configuration object
 * @returns Object containing only the changed fields
 */
export const getChangedFields = <T extends Record<string, any>>(
  oldValue: T,
  newValue: T,
  options?: {
    ignoredKeys?: Array<keyof T>;
    deepCompare?: boolean;
  },
): Partial<T> => {
  const result: Partial<T> = {};
  const ignoredKeys = new Set(options?.ignoredKeys || []);

  // Helper function to compare values
  const isEqual = (val1: any, val2: any): boolean => {
    if (options?.deepCompare) {
      return JSON.stringify(val1) === JSON.stringify(val2);
    }
    return val1 === val2;
  };

  // Iterate through all keys in the new value
  for (const key in newValue) {
    // Skip ignored keys
    if (ignoredKeys.has(key as keyof T)) continue;

    const oldVal = oldValue[key];
    const newVal = newValue[key];

    // Check if the value has changed
    if (!isEqual(oldVal, newVal)) {
      result[key] = newVal;
    }
  }

  return result;
};

export const getPhoneNumber = (phone: string) => {
  const clean = phone?.replace(/\D/g, '');
  return clean?.startsWith('250') ? clean : `250${clean?.replace(/^0/, '')}`;
};

// Example usage:
// const oldData = { name: 'John', age: 30, email: 'john@example.com' };
// const newData = { name: 'John', age: 31, email: 'john@example.com' };
// const changes = getChangedFields(oldData, newData, { ignoredKeys: ['email'] });
// Result: { age: 31 }
