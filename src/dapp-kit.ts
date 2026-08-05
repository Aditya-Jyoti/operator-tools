import { createDAppKit } from "@mysten/dapp-kit-react";
import { SuiGraphQLClient } from "@mysten/sui/graphql";

// Sui GraphQL RPC endpoints (JSON-RPC is deprecated; GraphQL is the supported read API).
const GRAPHQL_URLS: Record<string, string> = {
	mainnet: "https://graphql.mainnet.sui.io/graphql",
	testnet: "https://graphql.testnet.sui.io/graphql",
	devnet: "https://graphql.devnet.sui.io/graphql",
};

export const dAppKit = createDAppKit({
	networks: ["mainnet", "testnet", "devnet"],
	createClient: (network) =>
		new SuiGraphQLClient({
			url: GRAPHQL_URLS[network],
			network,
		}),
	defaultNetwork: "mainnet",
});

// Register the dApp kit instance type globally so hooks like `useCurrentClient()`
// are typed to the concrete `SuiGraphQLClient` we configured above.
declare module "@mysten/dapp-kit-react" {
	interface Register {
		dAppKit: typeof dAppKit;
	}
}
