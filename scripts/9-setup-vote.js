import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

//governanace contract
const voteModule = sdk.getVoteModule(
  "0xC2A185e5bff0b8408F4c6B05aD9f9C983f4fCD72"
);

//token contract
const tokenModule = sdk.getTokenModule(
  "0x628F6b456d8A9fF1F31323587353F8C6E4Db0041"
);

(async () => {
  try {
    //treasury power to print tokens
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permisions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module", error
    );
    process.exit(1)
  }

  try {
    //grab our wallet's token balance
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    //multipy by 90%
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    //transfer 90% to voting contract
    await tokenModule.transfer(
      voteModule.address,
      percent90
    );

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();