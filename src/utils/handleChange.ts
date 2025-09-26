// utils/handleChange.ts
import React from "react";

function handleChange<T extends object>(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  formBody: T,
  setter: React.Dispatch<React.SetStateAction<T>>
) {
  const { name, value } = e.target;

  setter({
    ...formBody,
    [name]: value,
  });
}

export default handleChange;
