import { convertDriveLink } from "../Data/SheetData";

export default function Footer({ profile }) {
  if (!profile) return null;

  const logoUrl = convertDriveLink(profile.logo);

  return (
    <footer
      className="mt-16"
      style={{
        "--color-add": profile.brandColor
          ?.replace("#", "")
          ?.match(/.{2}/g)
          ?.map((x) => parseInt(x, 16))
          ?.join(", "),
      }}
    >
      <div className="bg-bg border-t border-sub/20">
        <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-2">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt={profile.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <span className="font-semibold text-main">{profile.name}</span>
            </div>

            {profile.description && (
              <p className="text-sm text-sub max-w-md leading-relaxed">
                {profile.description}
              </p>
            )}
          </div>

          {/* Right */}
          <div className="flex md:justify-end items-start">
            <a
              href={`https://wa.me/${profile.phone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-add px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-sub/20 py-4 text-center text-xs text-sub">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </footer>
  );
}
