import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Profile from "./pages/Profile";
import Maintenance from "./pages/Maintenance";

import { useProfile } from "./Data/SheetData";
import Product from "./Pages/Product";

export default function App() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (profile?.status === "1") {
    return <Maintenance profile={profile} />;
  }

  return (
    <BrowserRouter>
      <Navbar profile={profile} />

      <main className="min-h-[calc(100vh-160px)]">
        <Routes>
          <Route path="/" element={<Home profile={profile} />} />
          <Route path="/profile" element={<Profile profile={profile} />} />
          <Route path="/products" element={<Product profile={profile} />} />
        </Routes>
      </main>

      <Footer profile={profile} />
    </BrowserRouter>
  );
}
