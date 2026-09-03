import clsx from "clsx";

export const cn = (...inputs) => clsx(...inputs);

export const generateId = (prefix = "id") =>
  `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export const safeArray = (value) => (Array.isArray(value) ? value : []);

export const chunkArray = (arr, size) => {
  const safe = safeArray(arr);
  const result = [];
  for (let i = 0; i < safe.length; i += size) {
    result.push(safe.slice(i, i + size));
  }
  return result;
};

export default { cn, generateId, safeArray, chunkArray };
