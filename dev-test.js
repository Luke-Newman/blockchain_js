const Block = require('./block'); // ./ executes script

const fooBlock = Block.mineBlock(Block.genesis(), "some data", );

console.log(fooBlock.toString());