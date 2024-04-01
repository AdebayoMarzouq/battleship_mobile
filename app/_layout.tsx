import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { AppProvider } from "@/contexts/app_context";
import "../global.css";
import { StatusBar } from "expo-status-bar";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<AppProvider>
			<StatusBar style='light' />
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: "#152023",
					},
					headerTintColor: "white",
					headerTitleStyle: {
						fontWeight: "bold",
						color: "#ffffff",
					},
				}}
			>
				<Stack.Screen name='index' options={{ headerShown: false }} />
				<Stack.Screen
					name='mainMenu'
					options={{
						title: "MAIN MENU",
					}}
				/>
				<Stack.Screen
					name='setupScreen'
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen name='gameScreen' options={{ headerShown: false }} />
			</Stack>
		</AppProvider>
	);
}
