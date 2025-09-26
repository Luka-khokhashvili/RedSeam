import { patchCartProduct } from "../api/services/cartService";
import type { Cart, CartPatchBody } from "../interfaces/cart";

const handleQuantityChange = async (
  product: Cart,
  newQuantity: number,
  setter: React.Dispatch<React.SetStateAction<Cart[]>>
) => {
  try {
    const patchBody: CartPatchBody = {
      quantity: newQuantity,
      color: product.color,
      size: product.size,
    };

    setter((prev) =>
      prev.map((p) =>
        p.id === product.id &&
        p.color === product.color &&
        p.size === product.size
          ? { ...p, quantity: newQuantity }
          : p
      )
    );

    await patchCartProduct(product.id, patchBody);
  } catch (error) {
    console.error("Failed to update quantity:", error);
    setter((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, quantity: product.quantity } : p
      )
    );
  }
};

export default handleQuantityChange;
