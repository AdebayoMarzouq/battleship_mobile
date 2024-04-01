import { Btn, PageContainer } from "@/components/shared";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const index = () => {
	const router = useRouter();
	return (
		<PageContainer>
			<ImageBackground
				source={require("../assets/backgrounds/bg.png")}
				style={styles.image}
			>
				{/* <RadarPulse /> */}
				<View className='flex-1 gap-y-8 items-center justify-center'>
					<Btn
						title='P L A Y'
						variant='xl'
						textStyle='font-bold text-4xl'
						onPress={() => {
							router.replace("/mainMenu");
						}}
					/>
				</View>
			</ImageBackground>
		</PageContainer>
	);
};

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: "cover",
		width: "100%",
		height: "100%",
	},
});

export default index;
