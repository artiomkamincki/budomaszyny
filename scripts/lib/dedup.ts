/**
 * Normalize a Polish phone number for deduplication.
 * Strips spaces, dashes, country code (+48/0048), leading 0.
 * Returns 9-digit string or null.
 */
export function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  // Remove Polish country code
  const stripped = digits.replace(/^(48|0048)/, "").replace(/^0/, "");
  if (stripped.length === 9) return stripped;
  return null;
}

/**
 * Build a dedup_key from available data.
 * Priority: phone > NIP > email
 */
export function buildDedupKey(data: {
  phone?: string | null;
  nip?: string | null;
  email?: string | null;
}): string | null {
  if (data.phone) {
    const norm = normalizePhone(data.phone);
    if (norm) return `phone:${norm}`;
  }
  if (data.nip) {
    const digits = data.nip.replace(/\D/g, "");
    if (digits.length === 10) return `nip:${digits}`;
  }
  if (data.email) {
    return `email:${data.email.toLowerCase().trim()}`;
  }
  return null;
}

/**
 * Sleep for ms milliseconds (for rate limiting).
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Random delay between min and max milliseconds.
 */
export function randomDelay(min: number, max: number): Promise<void> {
  return sleep(min + Math.random() * (max - min));
}
