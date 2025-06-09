import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStringValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value))
    return value.map(getStringValue).join(", ");
  if (
    value &&
    typeof value === "object" &&
    "value" in value
  )
    return getStringValue(value.value);
  if (value !== null && value !== null)
    return String(value);
  return "";
}
