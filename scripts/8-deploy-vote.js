import sdk from "./1-initialize-sdk.js";

// grab module address
const appModule = sdk.getAppModule(
  "0x007523E58a5Ab06Bad14e30CBdCeb0E2951B14e8"
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "FrenchieDAO's Sandbox",
      votingTokenAddress: "0x628F6b456d8A9fF1F31323587353F8C6E4Db0041",
      proposalStartWaitTimeInSeconds: 0,
      proposalVotingTimeInSeconds: 24 * 60 * 60,
      votingQuorumFraction: 0,
      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log(
      "✅ Successfully deployed vote module, address:", voteModule.address,
    );
  } catch (err) {
    console.error("Failed to deploy vote module", err);
  }
})();

