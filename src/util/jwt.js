import * as crypto from "crypto";

const tokenBlacklist = new Set();

const base64url = (input) => {
  return Buffer.from(input).toString("base64url");
};

const createJWT = (payload, secret) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));

  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;
  return jwt;
};

const verify = (token, callback) => {
  const [header, payload, signature] = token.split(".");
  const decodedPayload = JSON.parse(new Buffer(payload, "base64url"));
  if (tokenBlacklist.has(token)) {
    return callback(new Error("Token is invalid"));
  }
  const currentTime = Math.floor(Date.now() / 1000);
  if (decodedPayload.exp && decodedPayload.exp <= currentTime) {
    return callback(new Error("Token has expired"));
  }
  callback(null, decodedPayload);
};

export { createJWT, verify, tokenBlacklist };
