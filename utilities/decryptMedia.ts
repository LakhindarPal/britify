import Crypto from "crypto-es";

export function decryptMedia(encryptedUrl: string) {
  const key = Crypto.enc.Utf8.parse("38346591");

  const decrypted = Crypto.DES.decrypt(
    {
      ciphertext: Crypto.enc.Base64.parse(encryptedUrl),
    },
    key,
    {
      mode: Crypto.mode.ECB,
      padding: Crypto.pad.Pkcs7,
    }
  );

  return decrypted.toString(Crypto.enc.Utf8);
}
