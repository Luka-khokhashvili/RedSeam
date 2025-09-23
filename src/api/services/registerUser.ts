import type { RegisterBody, RegisterResponseBody } from "../../interfaces/auth";
import api from "../api";

export const registerUser = async (
  body: RegisterBody
): Promise<RegisterResponseBody> => {
  const formData = new FormData();

  formData.append("username", body.username);
  formData.append("email", body.email);
  formData.append("password", body.password);
  formData.append("password_confirmation", body.password_confirmation);
  if (body.avatar) {
    formData.append("avatar", body.avatar);
  }

  const response = await api.post<RegisterResponseBody>("/register", formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
