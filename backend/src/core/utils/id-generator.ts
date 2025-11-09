export function generateCustomId(prefix: string): string {
  const now = new Date();
  const dateTimeString = `${now.getFullYear()}${String(
    now.getMonth() + 1
  ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(
    now.getHours()
  ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(
    now.getSeconds()
  ).padStart(2, "0")}`;
  const randomNumber = String(Math.floor(Math.random() * 1000)).padStart(
    3,
    "0"
  );
  return `${prefix}_${dateTimeString}_${randomNumber}`;
}
