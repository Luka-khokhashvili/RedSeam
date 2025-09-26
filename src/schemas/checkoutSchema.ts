export const checkoutSchema = {
  name: [{ required: true }, { minLength: 3 }],
  surname: [{ required: true }, { minLength: 3 }],
  email: [
    { required: true },
    {
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: "Invalid email format",
    },
  ],
  address: [{ required: true }],
  zip_code: [{ required: true }],
};
