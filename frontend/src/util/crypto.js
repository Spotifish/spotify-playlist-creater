function generateRandomString() {
  return Array.from(crypto.getRandomValues(new Uint8Array(64))).map(value => value.toString(16)).join('');
}

function hashSha256(s) {
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(s))
}

function base64UrlEncode(s) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(s)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export {
  generateRandomString,
  hashSha256,
  base64UrlEncode
}
