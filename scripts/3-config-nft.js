import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0xB5c8235F0F86e1E865e4077CE8C1CcC0399DA067",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Tiny Biscuit",
        description: "This NFT will give you access to FrenchieDAO!",
        image: readFileSync("scripts/assets/biscuit.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()