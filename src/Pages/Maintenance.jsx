export default function Maintenance({ profile }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg">
      <div className="max-w-md w-full rounded-3xl border border-sub shadow-lg p-10 text-center bg-white">
        {/* Logo */}
        {profile?.logo && (
          <img
            src={profile.logo}
            alt={profile.name}
            className="h-24 w-24 rounded-full object-cover mx-auto mb-6 shadow-md border border-add"
          />
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-main">
          {profile?.name}
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base mb-8 leading-relaxed text-sub">
          Website sedang dalam perawatan.
          <br />
          Silakan hubungi kami untuk pemesanan atau info lebih lanjut.
        </p>

        {/* CTA */}
        {profile?.phone && (
          <a
            href={`https://wa.me/${profile.phone}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm sm:text-base font-medium text-white shadow-md hover:shadow-lg transition-all duration-300 bg-main"
          >
            Hubungi via WhatsApp
          </a>
        )}

        {/* Footer */}
        <p className="mt-10 text-xs sm:text-sm text-sub">
          © {new Date().getFullYear()} {profile?.name}
        </p>
      </div>
    </div>
  );
}
