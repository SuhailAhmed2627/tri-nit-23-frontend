import React from "react";
import Router from "./routes";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import "./App.css";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import { BACKEND_URL } from "../config";
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

const protocol =
	window.location.protocol.slice(0, -1) === "http" ? "ws" : "wss";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.socket = new WebSocket(
	protocol + "://" + BACKEND_URL.replace("http://", "") + "/ws"
);

const appendCache = createEmotionCache({ key: "mantine", prepend: false });
const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<MantineProvider emotionCache={appendCache} theme={theme}>
						<NotificationsProvider>
							<Router />
						</NotificationsProvider>
					</MantineProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
