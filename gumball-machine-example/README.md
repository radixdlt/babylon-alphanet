# The Gumball Machine on Alphanet
This example is meant to guide you through building, deploying and using the [Gumball Machine Scrypto example](https://github.com/radixdlt/scrypto-examples/tree/main/core/gumball-machine) using the [Alphanet Javascript SDK](https://docs.radixdlt.com/main/scrypto/alphanet/javascript-sdk.html).

## Pre-requisites
1. Node >= 12.17.0
2. The Alphanet wallet installed. Instructions [here](https://docs.radixdlt.com/main/scrypto/alphanet/wallet-extension.html)
3. Scrypto v0.6.0. Instructions to install [here](https://docs.radixdlt.com/main/scrypto/getting-started/install-scrypto.html) and update [here](https://docs.radixdlt.com/main/scrypto/getting-started/updating-scrypto.html)

## Building the Scrypto code
1. Enter the scrypto directory in a terminal: `cd scrypto`
1. Build the code: `scrypto build`
1. Two important files (`gumball_machine.abi` and `gumball_machine.wasm`) will be generated in `scrypto/target/wasm32-unknown-unknown/release/`. You will need them for the next step.

## Deploy the package to Alphanet
1. Go to the [package deployer website](https://alphanet-deployer.radixdlt.com/)
2. Upload both `gumball_machine.abi` and `gumball_machine.wasm`
3. Click on "publish package"
4. The wallet should open up and ask you to submit the transaction
5. On the wallet click on "submit"
6. The deployed package address should get displayed. **You will need it for the next step**.

## Interacting with our package
1. In a terminal go back to the root of this project (alphanet-frontend-example)
2. Install the npm dependencies: `npm install`
3. Start the local server with `npm start`
4. Open up your browser at the provided url if it doesn't open automatically.
5. Make sure you created an account on the wallet extension.
6. Click on the button to fetch your wallet address. You should see your address appearing
7. Fill the package address you got in the previous section and click on "instantiate component"
8. Your wallet will again open up. Click on "submit". You should now see the instantiated component address on the page.
9. Buy a gumball by clicking on "Buy 1 GUM"
10. Your wallet will open up. Click on "submit". The transaction receipt will get displayed on the page.
11. Check the number of GUM token you have by clicking on the "check balance" button.