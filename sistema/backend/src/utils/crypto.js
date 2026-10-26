import crypto from "crypto";
import "dotenv/config";

const algorithm = "aes-256-cbc";
const secretKey = Buffer.from(
  process.env.CPF_SECRET_KEY || "12345678901234567890123456789012",
);
const initialIv = Buffer.from(process.env.CPF_IV || "1234567890123456");

function encrypt(text) {
  if (!text) return text;
  try {
    const cipher = crypto.createCipheriv(algorithm, secretKey, initialIv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error) {
    console.error("Erro ao criptografar", error);
    return text;
  }
}

function decrypt(encryptedText) {
  if (!encryptedText) return encryptedText;
  try {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, initialIv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Erro ao descriptografar", error);
    return encryptedText;
  }
}

export default { encrypt, decrypt };
