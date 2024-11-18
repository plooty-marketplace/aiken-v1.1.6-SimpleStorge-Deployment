## create, write, and deploy a simple smart contract using Aiken v1.1.6. We’ll use a minimalistic example of a validator that allows spending only if the redeemer equals a specific value.

### 1. Write the Contract



```
module Example.Validator

validator {
    fn main(_datum: Data, redeemer: Data, _ctx: Data) -> Bool {
        case redeemer {
            Int(42) -> True
            _ -> False
        }
    }
}
```

### 2. Compile the Contract

1. Save the above code in a file, for example, `validator.ak`.
2. Compile the code using the Aiken CLI:

   ```bash
   aiken build
   ```

   This generates the Plutus script and UPLC files in the `build` directory.

### 3. Deploy the Contract

To deploy the smart contract on Cardano:

#### Using Mesh SDK:
1. Include the Plutus script generated (`validator.plutus`) in your project.
2. Add the following code snippet for deployment in your Mesh SDK-based Node.js project:

   ```javascript
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
   ```

#### Using Cardano-CLI:
1. Generate the script address:

   ```bash
   cardano-cli address build \
       --payment-script-file build/Example.Validator/validator.plutus \
       --out-file script.addr \
       --testnet-magic 2
   ```

2. Fund the address with ADA and interact with it by submitting transactions using `cardano-cli`.

### 4. Download the Code

Download the contract file below:

You can download the Aiken smart contract code using the link below:

[Download validator.ak](sandbox:/mnt/data/validator.ak)

Let me know if you need further assistance with this!