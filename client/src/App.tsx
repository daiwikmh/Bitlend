import { toHex } from "viem";
import client from "@story-protocol/core-sdk"

const response = await client.ipAsset.register({
  nftContract: "0x041B4F29183317Fd352AE57e331154b73F8a1D73",
  tokenId: "12",
  ipMetadata: {
    ipMetadataURI: "test-uri",
    ipMetadataHash: toHex("test-metadata-hash", { size: 32 }),
    nftMetadataHash: toHex("test-nft-metadata-hash", { size: 32 }),
    nftMetadataURI: "test-nft-uri",
  },
});

console.log(
  `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`
)