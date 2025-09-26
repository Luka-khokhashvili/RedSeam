import type { Product } from "../../interfaces/product";

type ImagesSectionProps = {
  product: Product | undefined;
  setCurrColor: React.Dispatch<React.SetStateAction<string>>;
  mainImage: string;
};

function ImagesSection({
  product,
  setCurrColor,
  mainImage,
}: ImagesSectionProps) {
  return (
    <div className="flex gap-[24px]">
      <div className="flex flex-col gap-[9px]">
        {product?.images.map((link, index) => (
          <img
            onClick={() => {
              const color = product.available_colors[index] || "Default";
              setCurrColor(color);
            }}
            key={index}
            className="w-[121px] h-[161.33px]"
            src={link}
            alt="product image"
          />
        ))}
      </div>
      {/* main image */}
      <img
        className="w-[603px] lg:w-[703px] h-[937px] rounded-[10px]"
        src={mainImage || product?.cover_image}
        alt={product?.name}
      />
    </div>
  );
}

export default ImagesSection;
