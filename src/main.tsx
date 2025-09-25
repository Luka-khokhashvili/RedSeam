import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ListingProvider } from "./context/ListingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ListingProvider>
        <App />
      </ListingProvider>
    </AuthProvider>
  </StrictMode>
);
