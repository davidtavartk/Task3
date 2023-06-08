const crypto  = require('crypto');

class HmacCalculator {
    constructor() {
        this.key = crypto.randomBytes(32).toString('hex');
    }
    
    calculateHmac(move) {
    const hmac = crypto.createHmac('sha256');
    return hmac.update(move).digest('hex');
    }
}

