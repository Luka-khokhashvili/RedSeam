import React, { useState } from "react";
import { registerUser } from "../api/services/registerUser";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../utils/validateForm";
import { registerSchema } from "../schemas/authSchema";
import type { RegisterBody } from "../interfaces/auth";
import RegistrationFrom from "../components/registrationComponents/RegistrationFrom";

function Register() {
  const navigate = useNavigate();
  const [formBody, setFormBody] = useState<RegisterBody>({} as RegisterBody);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, validationErrors } = validateForm(
      formBody,
      registerSchema
    );
    setErrors(validationErrors);

    if (!isValid) return;

    try {
      const data = await registerUser({
        ...formBody,
        avatar: avatarPreview || null,
      });
      console.log("User registered successfully", data);

      localStorage.setItem("token", data.token);

      setErrors({});

      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const formattedErrors: typeof errors = {};

        if (backendErrors.username)
          formattedErrors.username = backendErrors.username[0];
        if (backendErrors.email) formattedErrors.email = backendErrors.email[0];
        if (backendErrors.password)
          formattedErrors.password = backendErrors.password[0];
        if (backendErrors.password_confirmation)
          formattedErrors.password_confirmation =
            backendErrors.password_confirmation[0];

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
            Registration
          </h1>
          {/* Form */}
          <RegistrationFrom
            formBody={formBody}
            setFormBody={setFormBody}
            errors={errors}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showPasswordConfirm={showPasswordConfirm}
            setShowPasswordConfirm={setShowPasswordConfirm}
            avatar={avatar}
            setAvatar={setAvatar}
            avatarPreview={avatarPreview}
            setAvatarPreview={setAvatarPreview}
          />

          <div className="flex w-fll pt-[24px] justify-center items-center">
            <p className="text-[14px] text-[#3E424A]">
              Already member?{" "}
              <a href="/login" className="text-[#FF4000]">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
