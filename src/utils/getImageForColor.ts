import type { Cart } from "../interfaces/cart";

const getImageForColor = (product: Cart) => {
  if (!product.images || !product?.available_colors) return product.cover_image;

  const colorIndex = product.available_colors.indexOf(product.color);
  return product.images[colorIndex] || product.cover_image;
};

export default getImageForColor;
