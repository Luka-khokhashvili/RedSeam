export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  matchField?: string;
  message?: string;
};

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule[];
};
