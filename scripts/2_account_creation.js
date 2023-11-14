import {
  AccountCreateTransaction,
  AccountId,
  Client,
  PrivateKey,
  Hbar
} from "@hashgraph/sdk";
import * as config from "../config.js";

async function main() {
  const operatorId = AccountId.fromString(config.OPERATOR_ACCOUNT_ID);
  const operatorKey = PrivateKey.fromString(config.OPERATOR_PRIVATE_KEY);
  const client = Client.forTestnet();
  client.setOperator(operatorId, operatorKey);

  const newAccountPrivateKey = PrivateKey.generateED25519();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;

  const newAccount = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(new Hbar(10))
    .execute(client);
  const getReceipt = await newAccount.getReceipt(client);
  const newAccountId = getReceipt.accountId;
  console.log("The new account ID is: " + newAccountId);
  console.log("public key = " + newAccountPublicKey);
  console.log("private key = " + newAccountPrivateKey);
}

main();
