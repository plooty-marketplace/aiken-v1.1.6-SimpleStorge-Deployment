import { Transaction, BlockfrostProvider } from '@meshsdk/core';

const provider = new BlockfrostProvider('https://cardano-mainnet.blockfrost.io/api/v0', '<BLOCKFROST_API_KEY>');

const transaction = new Transaction({ initiator: provider });

const script = {
    type: 'PlutusV2',
    script: '<PATH_TO_COMPILED_PLUTUS_FILE>',
};

transaction.attachScript(script);

const tx = await transaction.build();
const txHash = await transaction.submit();
console.log('Transaction Hash:', txHash);
