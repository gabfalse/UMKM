import { useProducts } from "../Data/SheetData";

export default function Product() {
  const { products, loading } = useProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-main mb-2">
          Semua Produk
        </h1>
        <p className="text-sub max-w-2xl">
          Berikut daftar produk pilihan kami. Klik tombol "Pesan" untuk memesan
          via WhatsApp.
        </p>
      </div>

      {/* Produk List */}
      {loading ? (
        <div className="text-center text-sub">Memuat produk...</div>
      ) : products.length === 0 ? (
        <p className="text-sub text-center">Belum ada produk.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-sub overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
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
                      href={`https://wa.me/${p.wa}?text=Halo%20saya%20mau%20pesan%20${p.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full px-4 py-1.5 text-xs font-medium text-white transition bg-add"
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
  );
}
