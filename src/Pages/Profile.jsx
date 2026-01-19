export default function Profile({ profile }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        {profile?.logo && (
          <img
            src={profile.logo}
            alt={profile.name}
            className="h-24 w-24 rounded-full object-cover mb-5 shadow-sm"
          />
        )}

        <h1 className="text-2xl sm:text-3xl font-bold text-main">
          {profile?.name}
        </h1>

        {profile?.description && (
          <p className="mt-3 max-w-2xl text-sub">{profile.description}</p>
        )}
      </div>

      {/* Info */}
      <div className="bg-white rounded-2xl border border-sub shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <p className="text-sm mb-1 text-sub">Kontak</p>
          <p className="font-medium text-main">WhatsApp: {profile?.phone}</p>
        </div>

        <a
          href={`https://wa.me/${profile?.phone}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full px-7 py-2.5 text-sm font-medium text-white transition shadow-sm bg-add"
        >
          Hubungi via WhatsApp
        </a>
      </div>
    </section>
  );
}
