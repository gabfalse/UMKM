export default function Profile({ profile }) {
  if (!profile) return null;

  return (
    <section
      className="max-w-6xl mx-auto px-4 py-16"
      style={{
        "--color-add": profile.brandColor
          ?.replace("#", "")
          ?.match(/.{2}/g)
          ?.map((x) => parseInt(x, 16))
          ?.join(", "),
      }}
    >
      {/* HERO */}
      <div className="relative bg-bg border border-sub/20 rounded-3xl p-8 sm:p-12 mb-16 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {profile.logo && (
            <img
              src={profile.logo}
              alt={profile.name}
              className="h-28 w-28 rounded-2xl object-cover shadow-md bg-white"
            />
          )}

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-main">
              {profile.name}
            </h1>

            {profile.description && (
              <p className="mt-3 max-w-xl text-sub">{profile.description}</p>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <a
                href={`https://wa.me/${profile.phone}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white bg-add shadow-sm hover:opacity-90 transition"
              >
                Hubungi via WhatsApp
              </a>

              <span className="text-sm text-sub self-center">
                Fast response via chat
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      {profile.about && (
        <div className="grid sm:grid-cols-3 gap-8 mb-16">
          <div>
            <h2 className="text-xl font-semibold text-main">Tentang Brand</h2>
            <p className="mt-2 text-sm text-sub">
              Cerita singkat tentang visi, misi, dan value.
            </p>
          </div>

          <div className="sm:col-span-2 bg-white border border-sub/20 rounded-2xl p-6 sm:p-8 shadow-sm">
            <p className="text-sub leading-relaxed whitespace-pre-line">
              {profile.about}
            </p>
          </div>
        </div>
      )}

      {/* CONTACT CARD */}
      <div className="bg-white border border-sub/20 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-sm text-sub mb-1">Kontak Langsung</p>
          <p className="text-lg font-semibold text-main">
            WhatsApp +{profile.phone}
          </p>
        </div>

        <a
          href={`https://wa.me/${profile.phone}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-xl px-8 py-3 text-sm font-semibold text-white bg-add hover:opacity-90 transition"
        >
          Mulai Chat
        </a>
      </div>
    </section>
  );
}
