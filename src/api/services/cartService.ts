import type {
  Cart,
  CartDeleteBody,
  CartPatchBody,
  CartPostBody,
  CheckoutRequestBody,
  CheckoutResponseBody,
} from "../../interfaces/cart";
import api from "../api";

export const getCart = async (): Promise<Cart[]> => {
  const response = await api.get("/cart");

  return response.data;
};

export const postCartProduct = async (
  id: number | undefined,
  body: CartPostBody
): Promise<Cart> => {
  const response = await api.post(`/cart/products/${id}`, body);

  return response.data;
};

export const patchCartProduct = async (
  id: number,
  body: CartPatchBody
): Promise<Cart> => {
  const response = await api.patch(`/cart/products/${id}`, body);

  return response.data;
};

export const deleteCartProduct = async (id: number, body: CartDeleteBody) => {
  const response = await api.delete(`/cart/products/${id}`, { data: body });

  return response.data;
};

export const checkout = async (
  body: CheckoutRequestBody
): Promise<CheckoutResponseBody> => {
  const response = await api.post("/cart/checkout", body);

  return response.data;
};
