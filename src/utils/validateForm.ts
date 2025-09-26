import type { ValidationSchema } from "../interfaces/validation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateForm<T extends Record<string, any>>(
  formBody: T,
  schema: ValidationSchema<T>
) {
  const validationErrors: Partial<Record<keyof T, string>> = {};

  for (const field in schema) {
    const rules = schema[field];
    if (!rules) continue;

    for (const rule of rules) {
      const value = formBody[field];

      if (rule.required && !value) {
        validationErrors[field] = rule.message ?? `${field} is required`;
        break;
      }

      if (rule.minLength && value && value.length < rule.minLength) {
        validationErrors[field] =
          rule.message ??
          `${field} must be at least ${rule.minLength} characters`;
        break;
      }

      if (rule.pattern && value && !rule.pattern.test(value)) {
        validationErrors[field] = rule.message ?? `${field} format is invalid`;
        break;
      }

      if (rule.matchField && value !== formBody[rule.matchField]) {
        validationErrors[field] =
          rule.message ?? `${field} must match ${rule.matchField}`;
        break;
      }
    }
  }

  return {
    isValid: Object.keys(validationErrors).length === 0,
    validationErrors,
  };
}
