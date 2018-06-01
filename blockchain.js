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

  /*
      In order to support multiple contributors to the blockchain, we need to
      add a function taht checks the validity of multiple chains.
  */
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
      if (block.lastHash !== lastBlock.hash ||
          block.hash !== Block.blockHash(block))
        return false;
    }

    return true;
  }
}

module.exports = Blockchain;
