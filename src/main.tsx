import React from "react";
import ReactDOM from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./app.css";

import { DAppKitProvider } from "@mysten/dapp-kit-react";
import App from "./App.tsx";
import { dAppKit } from "./dapp-kit.ts";
import { ThemeProvider } from "./ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<DAppKitProvider dAppKit={dAppKit}>
				<App />
			</DAppKitProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
