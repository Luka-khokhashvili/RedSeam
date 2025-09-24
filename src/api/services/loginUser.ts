import type { AuthResponseBody, LoginBody } from "../../interfaces/auth";
import api from "../api";

export const loginUser = async (body: LoginBody): Promise<AuthResponseBody> => {
  const formData = new FormData();

  formData.append("email", body.email);
  formData.append("password", body.password);

  const response = await api.post<AuthResponseBody>("/login", formData);

  return response.data;
};
