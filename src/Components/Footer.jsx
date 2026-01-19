import { convertDriveLink } from "../Data/SheetData";

export default function Footer({ profile }) {
  const logoUrl = convertDriveLink(profile?.logo);

  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-2">
        {/* Left */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            {logoUrl && (
              <img
                src={logoUrl}
                alt={profile?.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
            <span className="font-semibold text-gray-900">{profile?.name}</span>
          </div>

          <p className="text-sm text-gray-600 max-w-md">
            {profile?.description}
          </p>
        </div>

        {/* Right */}
        <div className="flex md:justify-end items-start">
          <a
            href={`https://wa.me/${profile?.phone}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-green-500 px-5 py-2 text-sm font-medium text-white hover:bg-green-600 transition"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {profile?.name}. All rights reserved.
      </div>
    </footer>
  );
}
