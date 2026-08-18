// Display ke liye phone number ko readable format mein todta hai
// e.g. +919876543210 -> +91 98765 43210
export const formatPhone = (raw) => {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  const countryCode = digits.length > 10 ? digits.slice(0, digits.length - 10) : "";
  const main = digits.slice(-10);
  const formatted = `${main.slice(0, 5)} ${main.slice(5)}`;
  return countryCode ? `+${countryCode} ${formatted}` : formatted;
};
