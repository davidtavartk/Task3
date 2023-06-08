const crypto = require('crypto');

class KeyGenerator {
  constructor(moves) {
    this.moves = moves;
    this.key = this.generateKey(256);
  }

  generateKey(lengthInBits) {
    const byteLength = Math.ceil(lengthInBits / 8);
    const randomBytes = crypto.randomBytes(byteLength);
    return randomBytes.toString('hex');
  }

  calculateHmac(index, moves) {
    const move = this.moves[index];
    const hmac = crypto.createHmac('sha256', this.key);
    hmac.update(move);
    return hmac.digest('hex');
  }

  getKey() {
    return this.key;
  }
}

module.exports = KeyGenerator;
