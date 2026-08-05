import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button, Text } from "@radix-ui/themes";
import { useTheme } from "./ThemeProvider.tsx";

export function ThemeToggle() {
	const { theme, toggle } = useTheme();
	return (
		<Button variant="soft" size="2" onClick={toggle} aria-label="Toggle theme">
			{theme === "dark" ? <SunIcon /> : <MoonIcon />}
			<Text size="2" weight="medium">
				{theme === "dark" ? "Light" : "Dark"}
			</Text>
		</Button>
	);
}
