export function formatDate(value: string | Date): string {
  const date = new Date(value);

  if (isNaN(date.getTime())) return ""; // Invalid ISO string or date

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
