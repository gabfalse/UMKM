import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Profile from "./pages/Profile";
import Maintenance from "./pages/Maintenance";
import Product from "./Pages/Product";

import { useProfile } from "./Data/SheetData";

export default function App() {
  const { profile, loading } = useProfile();

  useEffect(() => {
    if (!profile) return;

    // ===== Title =====
    document.title = profile.name || "UMKM";

    // ===== Favicon =====
    let icon = document.querySelector("link[rel='icon']");
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    icon.href = profile.logo || "/vite.svg";

    // ===== Theme Color (mobile browser) =====
    let meta = document.querySelector("meta[name='theme-color']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = profile.brandColor || "#111827";

    // ===== Global CSS Variable =====
    document.documentElement.style.setProperty(
      "--brand-color",
      profile.brandColor || "#111827",
    );
  }, [profile]);

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
