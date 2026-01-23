import { useEffect, useState } from "react";

/* =======================
   CONFIG URL GOOGLE SHEET
======================= */
const PROFILE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0FFmLHlOlJdTBESjVj1qHzt3qRDlpJ4j8EI04ut5Nts_-jqH_mtED9ywljoS97Az-RVRDx3DZt5uE/pub?gid=499327753&single=true&output=csv";

const PRODUCTS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0FFmLHlOlJdTBESjVj1qHzt3qRDlpJ4j8EI04ut5Nts_-jqH_mtED9ywljoS97Az-RVRDx3DZt5uE/pub?gid=114472509&single=true&output=csv";

/* =======================
   HELPER
======================= */
const fetchCSV = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal fetch sheet");
  return res.text();
};

/* CSV SAFE PARSER */
const parseCSVRow = (row) => {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (char === '"' && row[i + 1] === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
};

export const convertDriveLink = (url) => {
  if (!url) return null;
  const clean = url.trim().replace(/"/g, "");
  const match = clean.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
};

/* =======================
   PROFILE HOOK (UPDATED)
======================= */
export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCSV(PROFILE_SHEET_URL)
      .then((csv) => {
        const rows = csv.trim().split("\n");
        const headers = parseCSVRow(rows[0]);
        const values = parseCSVRow(rows[1] || "");

        const idx = {
          name: headers.indexOf("name"),
          logo: headers.indexOf("logo"),
          description: headers.indexOf("description"),
          phone: headers.indexOf("phone"),
          status: headers.indexOf("status"),
          brand_color: headers.indexOf("brand_color"),
          about: headers.indexOf("about"), // ⬅️ NEW
        };

        setProfile({
          name: values[idx.name] || "",
          logo: convertDriveLink(values[idx.logo]),
          description: values[idx.description] || "",
          phone: values[idx.phone] || "",
          status: values[idx.status] || "0",
          brandColor:
            values[idx.brand_color] && values[idx.brand_color].startsWith("#")
              ? values[idx.brand_color]
              : "#111827",
          about: values[idx.about] || "", // ⬅️ NEW
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading };
};

/* =======================
   PRODUCTS HOOK (FIX REAL)
======================= */
export const useProducts = (limit = 8) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCSV(PRODUCTS_SHEET_URL)
      .then((csv) => {
        const rows = csv.trim().split("\n");
        const headers = parseCSVRow(rows[0]);

        const idx = {
          name: headers.indexOf("name"),
          price: headers.indexOf("price"),
          description: headers.indexOf("description"),
          image: headers.indexOf("image"),
          wa: headers.indexOf("wa"),
        };

        const data = rows
          .slice(1)
          .map((row) => {
            if (!row.trim()) return null;
            const parts = parseCSVRow(row);

            return {
              name: parts[idx.name],
              price: parts[idx.price],
              description: parts[idx.description],
              image: convertDriveLink(parts[idx.image]),
              wa: parts[idx.wa],
            };
          })
          .filter((p) => p && p.name);

        setProducts(limit ? data.slice(0, limit) : data);
      })
      .finally(() => setLoading(false));
  }, [limit]);

  return { products, loading };
};
