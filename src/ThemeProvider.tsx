import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { Theme } from "@radix-ui/themes";

export type ThemeMode = "light" | "dark";
const STORAGE_KEY = "appearance";

interface ThemeContextValue {
	theme: ThemeMode;
	toggle: () => void;
	setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<ThemeMode>("dark");

	// Resolve the initial theme: explicit user choice in localStorage wins,
	// otherwise fall back to the OS/browser color-scheme preference.
	useEffect(() => {
		let initial: ThemeMode = "dark";
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored === "light" || stored === "dark") {
				initial = stored;
			} else {
				initial = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			}
		} catch {
			initial = "dark";
		}
		setTheme(initial);
	}, []);

	// Keep the <html> class, the persisted preference and the Radix <Theme>
	// in lock-step whenever the theme changes.
	useEffect(() => {
		const root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(theme);
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch {}
	}, [theme]);

	// When there is no explicit user preference, keep following the OS setting.
	useEffect(() => {
		if (localStorage.getItem(STORAGE_KEY)) return;

		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = (e: MediaQueryListEvent) => {
			const next = e.matches ? "dark" : "light";
			setTheme(next);
			document.documentElement.classList.remove("light", "dark");
			document.documentElement.classList.add(next);
		};
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	const toggle = useCallback(() => {
		setTheme((t) => (t === "dark" ? "light" : "dark"));
	}, []);

	return (
		<Theme appearance={theme} hasBackground>
			<ThemeContext.Provider value={{ theme, toggle, setTheme }}>{children}</ThemeContext.Provider>
		</Theme>
	);
}

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useTheme must be used within <ThemeProvider>");
	}
	return ctx;
}
