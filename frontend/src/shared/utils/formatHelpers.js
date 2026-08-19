
export const formatNumber = (value = 0) =>
  new Intl.NumberFormat("en-IN").format(value);

export const formatYear = (year) => String(year ?? "");

export const formatStatSuffix = (value, suffix = "+") => `${formatNumber(value)}${suffix}`;

export default { formatNumber, formatYear, formatStatSuffix };
