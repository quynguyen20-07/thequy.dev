/** Split a newline/comma-separated string into a trimmed, non-empty array. */
export function parseList(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Join a string array back to a newline-separated string for textarea display. */
export function joinList(arr: string[]): string {
  return arr.join("\n");
}
