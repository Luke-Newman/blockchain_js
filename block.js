const SHA256 = require('crypto-js/SHA256');
/*
    A block consists of:
        - timestamp in ms (when created)
        - lastHash; hash block that came before it
        - new hash, generate from unique data
        - the data to store
*/

class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = ''
    }

    // note only substr of hash is printed
    toString() {
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substring(0, 10)}
            Hash     : ${this.hash.substring(0, 10)}
            Data     : ${this.data}`;
    }

    /* static enables us to call funct without creating new instance
       same instance alsways referenced 
    */
    static genesis() {
        return new this('Genesis time', '-----', 'f1r57-h45h', []);
    }

    /*
        again, static means we do not necessarily need to create a new 
        block instance in orde to use this function
    */
    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}{data}`).toString();
    }

    static blockHash(block) {
        /*
            recalculates the existing an existing block's hash
        */
        const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp, lastHash, data);
    }
}

class Blockchain {
    constructor(block) {
        this.chain = [];
        this.chain.append(block);
    }
}

module.exports = Block;