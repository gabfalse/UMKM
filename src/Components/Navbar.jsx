import { Link } from "react-router-dom";
import { convertDriveLink } from "../Data/SheetData";

export default function Navbar({ profile }) {
  const logoUrl = convertDriveLink(profile?.logo);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Name */}
        <Link to="/" className="flex items-center gap-3">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={profile?.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <span className="font-bold text-lg text-gray-900">
            {profile?.name}
          </span>
        </Link>

        {/* Menu */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <Link to="/profile" className="hover:text-gray-900 transition">
            Tentang
          </Link>
        </nav>
      </div>
    </header>
  );
}
