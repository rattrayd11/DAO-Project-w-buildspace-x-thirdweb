import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

//our voting contract
const voteModule = sdk.getVoteModule(
  "0xC2A185e5bff0b8408F4c6B05aD9f9C983f4fCD72"
);
//token contract
const tokenModule = sdk.getTokenModule(
  "0x628F6b456d8A9fF1F31323587353F8C6E4Db0041"
);

(async () => {
  try {
    const amount = 42_000;
    //create proposal to mint 420k new token to treasury
    await voteModule.propose(
      "should the DAO mint an additional " + amount + " tokens into the treasury?",
      [
        {
          //our native token is ETH
          //to send this proposal we are sending 0 ETH
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "mint",
            [
              voteModule.address,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),
          toAddress: tokenModule.address,
        },
      ]
    );

    console.log("✅ successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const amount = 6_900;
    await voteModule.propose(
      "should the DAO transfer " + amount + "tokens from the treasury to " + process.env.WALLET_ADDRESS + " FOR BEING AWESOME?",
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),

          toAddress: tokenModule.address,
        },
      ]
    );

    console.log(
      "✅ successfully created proposal to reward ourselves from the treasury, let's hope people vote yes!"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();