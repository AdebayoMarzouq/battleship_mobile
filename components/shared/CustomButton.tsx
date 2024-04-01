import {
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	StyleSheet,
} from "react-native";
import React from "react";

type BtnProps = TouchableOpacityProps & {
	title: string;
	textStyle?: string;
	variant?: "xl" | "lg" | "sm" | "base" | "xs";
};

const Btn = ({ onPress, title, textStyle, variant, ...props }: BtnProps) => {
	textStyle = textStyle ?? "";
	variant = variant ?? "base";
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.button, styles[`${variant}`]]}
			{...props}
		>
			<Text className={`text-white font-bold text-xl ${textStyle}`}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#ffffff",
	},
	xs: {
		borderRadius: 4,
		paddingVertical: 4,
		paddingHorizontal: 6,
	},
	sm: {
		borderRadius: 4,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	base: {
		borderRadius: 4,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	lg: {
		borderRadius: 6,
		paddingVertical: 12,
		paddingHorizontal: 20,
	},
	xl: {
		borderRadius: 8,
		paddingVertical: 15,
		paddingHorizontal: 24,
	},
});

export default Btn;
