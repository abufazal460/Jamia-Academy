
export const formatNumber = (value = 0) =>
  new Intl.NumberFormat("en-IN").format(value);

export const formatYear = (year) => String(year ?? "");

export const formatStatSuffix = (value, suffix = "+") => `${formatNumber(value)}${suffix}`;

export default { formatNumber, formatYear, formatStatSuffix };


export const formatPhone = (raw) => {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  const countryCode = digits.length > 10 ? digits.slice(0, digits.length - 10) : "";
  const main = digits.slice(-10);
  const formatted = `${main.slice(0, 5)} ${main.slice(5)}`;

};
