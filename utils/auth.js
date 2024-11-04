const crypto = require('crypto');

const creaPass = (password) => {
  let salt = crypto.randomBytes(32).toString('hex');
  let genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return {
    salt: salt,
    hash: genHash,
  };
};

const validoPass = (password, hash, salt) => {
  let hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hashVerify === hash;
};

module.exports = {
  creaPass,
  validoPass,
};
