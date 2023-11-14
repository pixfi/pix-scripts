import {
	AccountBalanceQuery,
	AccountId,
	Client,
	PrivateKey,
} from "@hashgraph/sdk";
import * as config from "../config.js";

async function main() {
	const operatorId = AccountId.fromString(config.OPERATOR_ACCOUNT_ID);
	const operatorKey = PrivateKey.fromString(config.OPERATOR_PRIVATE_KEY);

	if (operatorId == null || operatorKey == null) {
		throw new Error('Env vars must be present!');
	}

	const client = Client.forTestnet();
	client.setOperator(operatorId, operatorKey);
	console.log("CONNECTION SUCCESS!");
	const query = new AccountBalanceQuery().setAccountId(operatorId);
	const accountBalance = await query.execute(client);
	console.log("The hbar account balance for this account is " + accountBalance.hbars);
}

main();
