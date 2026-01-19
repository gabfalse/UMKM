import { useEffect, useState } from "react";

/* =======================
   CONFIG URL GOOGLE SHEET
======================= */
const PROFILE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0FFmLHlOlJdTBESjVj1qHzt3qRDlpJ4j8EI04ut5Nts_-jqH_mtED9ywljoS97Az-RVRDx3DZt5uE/pub?gid=499327753&single=true&output=csv";

const PRODUCTS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0FFmLHlOlJdTBESjVj1qHzt3qRDlpJ4j8EI04ut5Nts_-jqH_mtED9ywljoS97Az-RVRDx3DZt5uE/pub?gid=0&single=true&output=csv";

/* =======================
   HELPER
======================= */
const fetchCSV = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal fetch sheet");
  return res.text();
};

export const convertDriveLink = (url) => {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
};

/* =======================
   PROFILE HOOK
======================= */
export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCSV(PROFILE_SHEET_URL)
      .then((csv) => {
        const rows = csv.trim().split("\n");
        const row = rows[1]?.split(",");

        if (!row) return;

        setProfile({
          name: row[0],
          logo: convertDriveLink(row[1]),
          description: row[2],
          phone: row[3],
          status: row[4], // 0 aktif | 1 maintenance
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading };
};

/* =======================
   PRODUCTS HOOK
======================= */
export const useProducts = (limit = 8) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCSV(PRODUCTS_SHEET_URL)
      .then((csv) => {
        const rows = csv.trim().split("\n").slice(1);

        const data = rows
          .map((row) => {
            const parts = row.split(",");
            if (parts.length < 5) return null;

            return {
              name: parts[0],
              price: parts[1],
              description: parts.slice(2, parts.length - 2).join(","),
              image: convertDriveLink(parts[parts.length - 2]),
              wa: parts[parts.length - 1],
            };
          })
          .filter(Boolean);

        setProducts(limit ? data.slice(0, limit) : data);
      })
      .finally(() => setLoading(false));
  }, [limit]);

  return { products, loading };
};
