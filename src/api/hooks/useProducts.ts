import { useEffect, useState } from "react";
import {
  getProducts,
  type GetProductsParams,
} from "../services/productService";
import type { ProductsResponse } from "../../interfaces/product";

export const useProducts = (params: GetProductsParams) => {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getProducts(params)
      .then((res) => {
        if (isMounted) setData(res);
      })
      .catch((res) => {
        if (isMounted) setError(res);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [params]);

  return { data, loading, error };
};
