import type { ProductsResponse } from "../../interfaces/product";
import api from "../api";

export interface GetProductsParams {
  page?: number;
  "filter[price_from]"?: number;
  "filter[price_to]"?: number;
  sort?: string;
}

export const getProducts = async (
  params: GetProductsParams = {}
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>("/products", { params });
  return response.data;
};
