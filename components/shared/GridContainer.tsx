import React from "react";
import { View } from "react-native";
import Text from "./CustomText";

const GridContainer = ({ children }: { children: React.ReactNode }) => {
	const arr = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

	return (
		<View className='flex aspect-square border bg-none'>
			<View className='flex flex-row'>
				{arr.map((alpha, index) => (
					<View
						key={alpha}
						className='border border-[#444d4f] items-center justify-center flex-1 aspect-square bg-[#b9bcbd]'
					>
						<Text
							variant={Text.variant.md}
							key={index}
							className='text-center font-bold text-[#152023]'
							style={{
								color: "#152023",
								fontWeight: "bold",
							}}
						>
							{alpha}
						</Text>
					</View>
				))}
			</View>
			{children}
		</View>
	);
};

export default GridContainer;
