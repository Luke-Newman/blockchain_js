const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    /*
        adds the new block to the chain
    */
    const lastBlock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);
  }

  isValidChain(chain) {
    /*
        checks the validity of an incoming chain
    */
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];
      /*
          current block's lasthash data member must match
          lastBlock's hash data member AND
          current block's hash must match the generated hash of the
          current block
      */
      if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block))
        return false;
    }
    return true;
  }

  replaceChain(newChain) {
    /*
        replaces current chain with the incoming blockchain i it is valid
    */
    if (newChain.length <= this.chain.length) {
      /*
        chains of the same length are likely to be the same chain anyway,
        this also resolves forking issues involved with chain validation
      */
      console.log('chain received is not longer than the current chain');
      return;
    }
    
    if (!this.isValidChain(newChain)) {
      console.log('the received chain is not valid');
      return;
    }

    console.log('Replacing blockchain with the new chain');
    this.chain = newChain;
  }
}

module.exports = Blockchain;
