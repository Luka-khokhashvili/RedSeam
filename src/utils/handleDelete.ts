import { deleteCartProduct } from "../api/services/cartService";
import type { Cart, CartDeleteBody } from "../interfaces/cart";

const handleDelete = async (
  product: Cart,
  setter: React.Dispatch<React.SetStateAction<Cart[]>>
) => {
  try {
    const deleteBody: CartDeleteBody = {
      color: product.color,
      size: product.size,
    };

    await deleteCartProduct(product.id, deleteBody);

    setter((prev) =>
      prev.filter(
        (p) =>
          !(
            p.id === product.id &&
            p.color === product.color &&
            p.size === product.size
          )
      )
    );
  } catch (error) {
    console.error("Failed to remove product:", error);
  }
};

export default handleDelete;
