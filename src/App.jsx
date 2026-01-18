import { useEffect, useState } from "react";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0FFmLHlOlJdTBESjVj1qHzt3qRDlpJ4j8EI04ut5Nts_-jqH_mtED9ywljoS97Az-RVRDx3DZt5uE/pub?gid=0&single=true&output=csv";

export default function App() {
  const [products, setProducts] = useState([]);

  // Convert Google Drive link → direct image link
  const convertDriveLink = (url) => {
    if (!url) return null;

    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) return null;

    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  };

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csv) => {
        const rows = csv.trim().split("\n").slice(1);

        const data = rows
          .map((row) => {
            // LIMIT split → cegah rusak karena koma di deskripsi
            const parts = row.split(",");
            if (parts.length < 5) return null;

            const name = parts[0]?.trim();
            const price = parts[1]?.trim();
            const description = parts
              .slice(2, parts.length - 2)
              .join(",")
              .trim();
            const image = parts[parts.length - 2]?.trim();
            const wa = parts[parts.length - 1]?.trim();

            if (!name || !image) return null;

            return { name, price, description, image, wa };
          })
          .filter(Boolean);

        setProducts(data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Produk UMKM
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500">
          Produk pilihan dengan kualitas terbaik
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p, i) => {
          const imageUrl = convertDriveLink(p.image);

          return (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {/* Image */}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={p.name}
                  className="h-44 w-full object-cover"
                />
              )}

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">
                  {p.name}
                </h3>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {p.description}
                </p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-gray-900">Rp {p.price}</span>

                  <a
                    href={`https://wa.me/${p.wa}?text=Halo%20saya%20mau%20pesan%20${p.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition"
                  >
                    Pesan
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
