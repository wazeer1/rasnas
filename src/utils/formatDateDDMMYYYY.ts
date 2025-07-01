// utils/formatDateDDMMYYYY.js

/**
 * Converts ISO date string to "DD-MM-YYYY" format
 * @param {string} isoDate - e.g., "2025-06-26T14:48:10.891283Z"
 * @returns {string}
 */
export function formatDate(isoDate) {
  if (!isoDate) return "";

  const date = new Date(isoDate);
  if (isNaN(date)) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
