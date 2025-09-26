export const loginSchema = {
  email: [
    { required: true },
    {
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: "Invalid email format",
    },
  ],
  password: [{ required: true }, { minLength: 3 }],
};

export const registerSchema = {
  username: [{ required: true }, { minLength: 3 }],
  email: [
    { required: true },
    {
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: "Invalid email format",
    },
  ],
  password: [{ required: true }, { minLength: 3 }],
  password_confirmation: [
    { required: true },
    { matchField: "password", message: "Passwords do not match" },
  ],
};
