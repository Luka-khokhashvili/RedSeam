import { useEffect, useState } from "react";
import { checkout, getCart } from "../api/services/cartService";
import type { Cart } from "../interfaces/cart";
import CheckoutSuccess from "../components/CheckoutSuccess";
import { checkoutSchema } from "../schemas/checkoutSchema";
import { validateForm } from "../utils/validateForm";
import CheckoutForm from "../components/checkoutComponents/CheckoutForm";
import CartDetails from "../components/CartDetails";

type checkoutFormBody = {
  name: string;
  surname: string;
  email: string;
  address: string;
  zip_code: string;
};

function CheckoutPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState<Cart[]>([]);
  const email = localStorage.getItem("email");
  const [formBody, setFormBody] = useState<checkoutFormBody>({
    name: "",
    surname: "",
    email: "",
    address: "",
    zip_code: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    surname?: string;
    email?: string;
    address?: string;
    zip_code?: string;
  }>({});

  useEffect(() => {
    getCart().then((res) => setProducts(res));

    setFormBody((prev) => ({ ...prev, email: email ?? "" }));
  }, [email]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, validationErrors } = validateForm(
      formBody,
      checkoutSchema
    );
    setErrors(validationErrors);

    if (!isValid) return;

    try {
      const data = await checkout({ ...formBody });
      console.log("Checkout was successful!", data);

      setModalOpen(true);

      setErrors({});

      setProducts([]);
      setFormBody({
        name: "",
        surname: "",
        email: email ?? "",
        address: "",
        zip_code: "",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const formattedErrors: typeof errors = {};

        if (backendErrors.name) formattedErrors.name = backendErrors.name[0];
        if (backendErrors.surname)
          formattedErrors.surname = backendErrors.surname[0];
        if (backendErrors.email) formattedErrors.email = backendErrors.email[0];
        if (backendErrors.address)
          formattedErrors.address = backendErrors.address[0];
        if (backendErrors.zip_code)
          formattedErrors.zip_code = backendErrors.zip_code[0];

        setErrors(formattedErrors);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full mt-[72px] gap-[42px] px-[100px]">
      {modalOpen && <CheckoutSuccess setModalOpen={setModalOpen} />}
      <h1 className="text-[42px] text-[#10151F] font-semibold">Checkout</h1>
      <div className="flex flex-col lg:flex-row w-full gap-[131px] h-[635px]">
        {/* Form */}
        <CheckoutForm
          formBody={formBody}
          setFormBody={setFormBody}
          errors={errors}
          handleCheckout={handleCheckout}
        />
        {/* Details */}
        <CartDetails
          products={products}
          setProducts={setProducts}
          showPayButton={true}
        />
      </div>
    </div>
  );
}

export default CheckoutPage;
