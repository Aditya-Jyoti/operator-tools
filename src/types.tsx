export type NodeType = {
	name: string;
	nodeId: string;
	commissionReceiver: string;
	type: string;
	commission: number;
};

export type WalrusScanNode = {
	validatorHash: string;
	validatorName: string;
	commissionRate: number;
	stake: number;
	state: string;
	nodeCapacity: number;
	storagePrice: number;
	writePrice: number;
	poolShare: number;
	weight: number;
	operator: boolean;
};

export type ObjectChangeOverride = {
	digest: string;
	objectId: string;
	objectType?: string;
	sender?: string;
	type?: "published";
	version: string;
};

// A parsed Move value/struct. JSON-RPC and GraphQL represent Move structs differently
// (JSON-RPC wraps nested structs as `{ dataType, type, fields }`, GraphQL returns raw
// Move JSON), so field access goes through a normalization helper rather than these types.
export type MoveStruct = Record<string, unknown>;
