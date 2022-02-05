import sdk from "./1-initialize-sdk.js";

// our token contract
const tokenModule = sdk.getTokenModule(
  "0x628F6b456d8A9fF1F31323587353F8C6E4Db0041",
);

(async () => {
  try {
    //log current roles
    console.log(
      "roles that exist right now:",
      await tokenModule.getAllRoleMembers()
    );

    //revoke all superpowers from personal wallet on token contract
    await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
    console.log(
      "Roles after revoking ourselves",
      await tokenModule.getAllRoleMembers()
    );
    console.log("✅ successfully revoked our superpowers from the token contract")
  } catch (error) {
    console.error("Failed to revoke ourselves from the DAO treasury", error);
  }
})();