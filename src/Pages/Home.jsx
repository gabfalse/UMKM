import { Link } from "react-router-dom";
import { useProducts } from "../Data/SheetData";

export default function Home({ profile }) {
  const { products, loading } = useProducts(3);

  return (
    <>
      {/* HERO / LANDING */}
      <section
        className="bg-bg"
        style={{
          "--color-add": profile?.brandColor
            ?.replace("#", "")
            ?.match(/.{2}/g)
            ?.map((x) => parseInt(x, 16))
            ?.join(", "),
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          {profile?.logo && (
            <img
              src={profile.logo}
              alt={profile.name}
              loading="eager"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/160x160?text=Logo";
              }}
              className="h-24 w-24 rounded-full mx-auto mb-6 object-contain bg-bg p-2 shadow-sm"
            />
          )}

          <p className="text-sm font-medium mb-3 text-add">Selamat Datang 👋</p>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-main">
            {profile?.name}
          </h1>

          <p className="max-w-2xl mx-auto text-sub">
            {profile?.description ||
              "Kami menyediakan produk pilihan dengan kualitas terbaik untuk Anda."}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {profile?.phone && (
              <a
                href={`https://wa.me/${profile.phone}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-white shadow-sm transition bg-add hover:opacity-90"
              >
                Hubungi via WhatsApp
              </a>
            )}

            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full border px-8 py-3 text-sm font-medium transition border-sub text-main hover:bg-main/5"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* PREVIEW PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-main">
            Produk Terbaru
          </h2>

          <Link
            to="/products"
            className="text-sm font-medium text-add hover:underline"
          >
            Lihat Semua →
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-sub">Memuat produk...</div>
        ) : products.length === 0 ? (
          <p className="text-sub">Belum ada produk.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <div
                key={i}
                className="group bg-bg rounded-2xl border border-sub/20 overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* Image */}
                <div className="relative aspect-square bg-bg overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col">
                  <h3 className="font-semibold text-sm line-clamp-1 mb-1 text-main">
                    {p.name}
                  </h3>

                  {p.description && (
                    <p className="text-xs line-clamp-2 mb-3 text-sub">
                      {p.description}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-sm text-main">
                      Rp {p.price}
                    </span>

                    {p.wa && (
                      <a
                        href={`https://wa.me/${p.wa}?text=${encodeURIComponent(
                          `Halo saya mau pesan kerudung dengan kode ${p.name} seharga Rp ${p.price}`,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full px-4 py-1.5 text-xs font-medium text-white bg-add transition hover:opacity-90"
                      >
                        Pesan
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
