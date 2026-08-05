import { ConnectButton } from "@mysten/dapp-kit-react/ui";
import { Container, Flex, Heading } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus.tsx";
import { ThemeToggle } from "./ThemeToggle.tsx";

function App() {
	return (
		<>
			<Flex
				position="sticky"
				top="0"
				px="4"
				py="3"
				justify="between"
				align="center"
				style={{
					borderBottom: "1px solid var(--gray-a2)",
					backdropFilter: "blur(4px)",
				}}
			>
				<Heading size="5" weight="medium">
					Walrus Operator Tools
				</Heading>
				<Flex align="center" gap="2">
					<ThemeToggle />
					<ConnectButton />
				</Flex>
			</Flex>

			<Container my="6" px="4">
				<WalletStatus />
			</Container>
		</>
	);
}

export default App;
