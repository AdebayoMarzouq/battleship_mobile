import { PrintToScreen } from "@/components";
import {
	Btn,
	FadeInView,
	Grid,
	PageContainer,
	Text,
} from "@/components/shared";
import { AppContext } from "@/contexts/app_context";
import { ENDPOINT } from "@/shared";
import { Events } from "@/types/reducer";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

const GameScreen = () => {
	const router = useRouter();
	const {
		dispatch,
		state: { room, user, opponent, hitData },
	} = useContext(AppContext);

	const handleReset = async () => {
		try {
			console.log("before fetch");
			const response = await fetch(`http://${ENDPOINT}/reset_user_data`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: {
						userId: user?.userId ?? "",
						roomId: room?.roomId ?? "",
					},
				}),
			});
			console.log("after fetch")
			if (!response.ok) {
				console.error("HTTP error! Status:", response.status);
				const errorText = await response.text();
				console.error("Error content:", errorText);
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			dispatch({ type: Events.RESET_DATA, payload: null });
			console.log("dispatched");
			router.replace("/mainMenu");
		} catch (error) {
			console.log(error);
		}
	};

	if (!opponent) {
		return (
			<PageContainer>
				<ActivityIndicator size='large' color='#ffffff' />
				<Text variant={Text.variant.xl}>Waiting for opponent</Text>
			</PageContainer>
		);
	}

	return (
		<PageContainer>
			{hitData && hitData.report === 3 && room?.winner ? (
				<FadeInView
					isVisible={hitData.report === 3}
					className='absolute inset-0 h-1/3 w-4/6 opacity-90 rounded-lg flex justify-center items-center gap-12'
				>
					<Text variant={Text.variant.xl4}>
						{room?.winner === user?.userId ? "You Win!!!" : "You lose"}
					</Text>
					<Btn onPress={handleReset} variant='lg' title='Go to main menu' />
				</FadeInView>
			) : (
				<>
					{user?.userId !== room?.turn ? (
						<FadeInView
							isVisible={user?.userId !== room?.turn}
							className='flex gap-4 items-stretch w-full'
						>
							<Text className='text-center text-3xl'>
								{"Friendly Waters".toUpperCase()}
							</Text>
							<View className='min-h-[72px] py-4 px-4 rounded bg-[#d0d2d3]'>
								<PrintToScreen type='reciever' />
							</View>
							<Grid type='friendly' />
							<View className='min-h-[72px] py-4 px-4 rounded bg-[#d0d2d3]'>
								<Text variant={Text.variant.md} color={Text.color.secondary}>
									Sunk ships:{" "}
								</Text>
								{user?.ships?.map((ship, shipIndex) => (
									<Text
										key={`${ship.name}-${shipIndex}`}
										color={Text.color.secondary}
									>
										{ship.name}
									</Text>
								))}
							</View>
						</FadeInView>
					) : (
						<FadeInView
							isVisible={user?.userId === room?.turn}
							className='flex gap-4 items-stretch w-full'
						>
							<Text className='text-center text-3xl'>
								{"Enemy Waters".toUpperCase()}
							</Text>
							<View className='min-h-[72px] py-4 px-4 rounded bg-[#d0d2d3]'>
								<PrintToScreen type='attacker' />
							</View>
							<Grid type='enemy' />
							<View className='min-h-[72px] py-4 px-4 rounded bg-[#d0d2d3]'>
								<Text variant={Text.variant.md} color={Text.color.secondary}>
									Sunk ships:{" "}
								</Text>
								{opponent?.ships?.map((ship, shipIndex) => (
									<Text
										key={`${ship.name}-${shipIndex}`}
										color={Text.color.secondary}
									>
										{ship.name}
									</Text>
								))}
							</View>
						</FadeInView>
					)}
				</>
			)}
		</PageContainer>
	);
};

export default GameScreen;
