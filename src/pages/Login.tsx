import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/services/loginUser";
import { useAuth } from "../context/AuthContext";
import { validateForm } from "../utils/validateForm";
import { loginSchema } from "../schemas/authSchema";
import LoginForm from "../components/LoginComponents/LoginForm";

type loginFormBody = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const [formBody, setFormBody] = useState<loginFormBody>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, validationErrors } = validateForm(formBody, loginSchema);
    setErrors(validationErrors);

    if (!isValid) return;

    try {
      const data = await loginUser({ ...formBody });
      console.log("User Login was successfully", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.user.email);

      setErrors({});

      login(data.token, {
        username: data.user.name,
        avatar: data.user.profile_photo,
      });

      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const formattedErrors: typeof errors = {};

        if (backendErrors.email) formattedErrors.email = backendErrors.email[0];
        if (backendErrors.password)
          formattedErrors.password = backendErrors.password[0];

        setErrors(formattedErrors);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      <img src="./Banner.png" alt="Auth Banner" className="w-[948px]" />
      <div className="flex w-[972px] justify-center items-center">
        <div className="flex w-[554px] flex-col">
          <h1 className="text-[42px] text-[#10151F] font-semibold pb-[48px]">
            Log in
          </h1>
          {/* Form */}
          <LoginForm
            formBody={formBody}
            setFormBody={setFormBody}
            errors={errors}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <div className="flex w-fll pt-[24px] justify-center items-center">
            <p className="text-[14px] text-[#3E424A]">
              Not a member?{" "}
              <a href="/register" className="text-[#FF4000]">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
