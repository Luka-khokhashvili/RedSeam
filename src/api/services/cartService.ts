import api from "../api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCart = async (): Promise<any> => {
  const response = await api.get("/cart");

  return response.data;
};
