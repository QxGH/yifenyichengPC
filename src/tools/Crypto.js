import CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64';

const default_key = CryptoJS.enc.Utf8.parse(Base64.decode('RVpPQ25pM3B6RDNUMzcwNw==')); //十六位十六进制数作为秘钥
const default_iv = CryptoJS.enc.Utf8.parse(Base64.decode('ZFgwY21tQTVENzk3NTc3MA==')); //十六位十六进制数作为秘钥偏移量

// 敏感数据加密 key iv
const sensitive_key = CryptoJS.enc.Utf8.parse(Base64.decode('cTN3aTNUMTNJWm4zMzMxbw==')); //十六位十六进制数作为秘钥
const sensitive_iv = CryptoJS.enc.Utf8.parse(Base64.decode('WW0wWDc4OUtrbTBrdjg3QQ==')); //十六位十六进制数作为秘钥偏移量

//加密方法
const AesEncrypt = (word, sensitive = false) => {
  let key  = sensitive ? sensitive_key : default_key;
  let iv = sensitive ? sensitive_iv : default_iv
  
  let encrypted = CryptoJS.AES.encrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
};

//解密方法
const AesDecrypt = (word, sensitive = false) => {
  let key  = sensitive ? sensitive_key : default_key;
  let iv = sensitive ? sensitive_iv : default_iv;

  let decrypted = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC , padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

export {
  AesEncrypt,
  AesDecrypt
};