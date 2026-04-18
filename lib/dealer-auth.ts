import { createHmac, timingSafeEqual } from "crypto";

export const dealerSessionCookieName = "carvoo_dealer_session";

type DealerSessionPayload = {
  username: string;
  exp: number;
};

function getSecret() {
  return (
    process.env.DEALER_AUTH_SECRET ||
    process.env.PROJEKTZENTRALE_PASS ||
    "change-me-in-production"
  );
}

function toBase64Url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(input: string) {
  const base64 = input.replaceAll("-", "+").replaceAll("_", "/");
  const padded = `${base64}${"=".repeat((4 - (base64.length % 4)) % 4)}`;
  return Buffer.from(padded, "base64");
}

function sign(value: string) {
  const mac = createHmac("sha256", getSecret()).update(value).digest();
  return toBase64Url(mac);
}

export function createDealerSessionToken(username: string) {
  const payload: DealerSessionPayload = {
    username,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  };

  const payloadEncoded = toBase64Url(JSON.stringify(payload));
  const signature = sign(payloadEncoded);
  return `${payloadEncoded}.${signature}`;
}

export function verifyDealerSessionToken(token: string) {
  if (!token || !token.includes(".")) return null;
  const [payloadEncoded, signature] = token.split(".");
  if (!payloadEncoded || !signature) return null;

  const expectedSignature = sign(payloadEncoded);
  const signatureBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (signatureBuf.length !== expectedBuf.length) return null;

  if (!timingSafeEqual(signatureBuf, expectedBuf)) {
    return null;
  }

  try {
    const decoded = fromBase64Url(payloadEncoded).toString("utf8");
    const payload = JSON.parse(decoded) as Partial<DealerSessionPayload>;
    if (!payload.username || typeof payload.exp !== "number") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return { username: payload.username };
  } catch {
    return null;
  }
}
