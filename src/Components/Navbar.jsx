import { Link } from "react-router-dom";
import { useState } from "react";
import { convertDriveLink } from "../Data/SheetData";

export default function Navbar({ profile }) {
  const [open, setOpen] = useState(false);
  const logoUrl = convertDriveLink(profile?.logo);

  return (
    <header
      className="sticky top-0 z-50 bg-bg border-b border-sub/20"
      style={{
        "--color-add": profile?.brandColor
          ?.replace("#", "")
          ?.match(/.{2}/g)
          ?.map((x) => parseInt(x, 16))
          ?.join(", "),
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={profile?.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <span className="font-bold text-lg text-main">{profile?.name}</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-sub">
          <Link to="/" className="hover:text-main transition">
            Home
          </Link>
          <Link to="/profile" className="hover:text-main transition">
            Tentang
          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-main hover:bg-main/5 transition"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-sub/20 bg-bg">
          <nav className="px-4 py-4 flex flex-col gap-4 text-sm font-medium text-sub">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="hover:text-main transition"
            >
              Home
            </Link>
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="hover:text-main transition"
            >
              Tentang
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
