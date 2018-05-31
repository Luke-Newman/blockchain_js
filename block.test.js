const Block = require('./block');

/* jest; unit test framework */
/* jest-specific function, params: description, callback*/
describe('Block', () => {
    /* declaring vars at this level as the are hidden in beforeEach */
    let data, lastBlock, block;

    beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(Block.genesis());
    });

    it('sets the `data` to match the input', () => {
        /* data type you expect as input */
        expect(block.data).toEqual(data);

    });

    it('sets the `lasthash` to match the hash of the last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });
})