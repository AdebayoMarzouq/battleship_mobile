import React, { useRef, useEffect } from "react";
import { Animated, View, StyleSheet } from "react-native";

const RadarPulse = () => {
	const pulseAnimation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(pulseAnimation, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.timing(pulseAnimation, {
					toValue: 0,
					duration: 1000,
					useNativeDriver: true,
				}),
			])
		).start();
	}, [pulseAnimation]);

	return (
		<View style={styles.background}>
			<Animated.View
				style={[
					styles.pulse,
					{
						opacity: pulseAnimation,
						transform: [
							{
								scale: pulseAnimation.interpolate({
									inputRange: [0, 1],
									outputRange: [1, 1.5],
								}),
							},
						],
					},
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		...StyleSheet.absoluteFillObject, // Fill the entire parent container
		backgroundColor: "#011f4b", // Dark blue background color
	},
	pulse: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "rgba(255,255,255,0.7)",
		position: "absolute", // Position the pulse absolutely within the background
		zIndex: -999,
		alignSelf: "center", // Center the pulse horizontally
		top: "50%", // Position the pulse at the vertical center of the screen
		transform: [{ translateY: -50 }], // Adjust the position to center the pulse vertically
	},
});

export default RadarPulse;
