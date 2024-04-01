import React from "react";
import { View, ScrollView, ViewProps, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const PageContainer = ({ children, className, ...props }: ViewProps) => {
	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}>
			<View
				className={`pt-16 px-4 flex-1 items-center justify-center bg-[#152023] gap-2 relative text-white border-0 m-0 ${className}`}
				{...props}
			>
				{children}
			</View>
		</ScrollView>
	);
};

export default PageContainer;
