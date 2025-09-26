import { postCartProduct } from "../api/services/cartService";
import type { CartPostBody } from "../interfaces/cart";
import type { Product } from "../interfaces/product";

type handleAddCartType = {
  product: Product | undefined;
  currQuantity: number;
  currColor: string;
  currSize: string;
};

const handleAddCart = async ({
  product,
  currQuantity,
  currColor,
  currSize,
}: handleAddCartType) => {
  try {
    const productDetails: CartPostBody = {
      quantity: currQuantity,
      color: currColor,
      size: currSize,
    };

    await postCartProduct(product?.id, productDetails);
  } catch (error) {
    console.error(error);
  }
};

export default handleAddCart;
