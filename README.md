# Curve UI Simulator

This project allows a user to simulate interactions with the Curve official UI to see how things work.

It uses Hardhat to fork the Ethereum mainnet and impersonate accounts to interact with the relevant contracts.

## Project Structure

-   `abis/`: ABIs for the required contracts.
-   `scripts/`: Hardhat scripts for various simulation tasks.
-   `lib/`: Reusable library functions for interacting with the blockchain.
-   `hardhat.config.js`: Hardhat configuration file.
-   `package.json`: Project dependencies and scripts.
-   `.env.example`: A default environment file

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/saint-rat/curve-ui-simulator
    cd curve-ui-simulator
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Create your `.env` file, and then edit `.env` with your `ETH_RPC`, `YOUR_WALLET_ADDRESS` etc.

    ```bash
    cp .env.example .env
    ```

## Usage

1.  Start a local Hardhat node, and then leave this running in another window:

    ```bash
    npm run start-node
    ```

2.  Connect your rabby/metamask wallet to the new forked RPC by adding a Custom Network (in rabby: Click More -> Add Custom Network):

    ```bash
    Chain ID: 31337
    Network Name: hardhat
    RPC URL: http://localhost:8545
    Currency Symbol: ETH
    ```

3.  Fund your wallet with ETH, CRV and crvUSD.  *Note: make sure you have changed the `YOUR_WALLET_ADDRESS` in the `.env` file*

    ```bash
    npm run fund-eth
    npm run fund-crv
    npm run fund-crvusd
    ```

    This will fund your wallet with 100 ETH, 100k crvUSD, 100k CRV.

4.  If you want to simulate scrvUSD use the [scrvUSD vault official UI here](https://www.curve.finance/crvusd/ethereum/scrvUSD/) to deposit.

    Then use the following command to simulate a week of scrvUSD rewards:

    ```bash
    npm run simulate-scrvusd
    ```

    The UI will reflect your earnings, for the week of time elapsed.

5.  If you want to simulate veCRV use the [official veCRV locking UI here](https://www.curve.finance/dao/ethereum/vecrv/create/) to lock.

    Then use the following command to simulate a week of veCRV rewards:

    ```bash
    npm run simulate-vecrv
    ```

    This command moves time forward a week and sends $200k crvUSD from the largest holder of crvUSD which isn't a contract, at the time of writing they only have $1M crvUSD, so you will get errors if their balance falls below this (4-5 weeks of rewards).

6.  If you just want to play around you can do swaps, deposits, etc.  You can also simulate earning CRV rewards by depositing and gauge to a pool then moving forward in time:

    ```bash
    npm run advance-time
    ```
    
    This moves forward 1 day.

## Notes

- Each time you restart the network it will reset your account on the forked network, but if your wallet is Rabby it won't know that, and will continue to think transactions have been sent.  So you may need to manually change the nonce of your account back to 0, or whatever the tx count of your address actually is.
- Hardhat sometimes freezes if your RPC isn't performant enough.  If things aren't working, this could be why.