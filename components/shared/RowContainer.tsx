import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "./CustomText";

const RowContainer = ({
	children,
	rowNumber,
}: {
	children: React.ReactNode;
	rowNumber: number;
}) => {
	return (
		<View className='flex flex-row'>
			<View className='border border-[#444d4f] items-center justify-center flex-1 aspect-square bg-[#b9bcbd]'>
				<Text
					variant={Text.variant.md}
					className='text-center font-bold text-[#152023]'
					style={{
						color: "#152023",
						fontWeight: "bold",
					}}
				>
					{rowNumber}
				</Text>
			</View>
			{children}
		</View>
	);
};

export default RowContainer;
