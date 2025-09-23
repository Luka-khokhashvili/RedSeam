import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ListingPage from "./pages/ListingPage";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
