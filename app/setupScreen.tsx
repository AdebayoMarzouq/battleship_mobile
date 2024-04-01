import {
	PageContainer,
	Btn,
	SetupGrid,
	Text,
	FadeInView,
} from "@/components/shared";
import { AppContext } from "@/contexts/app_context";
import { ENDPOINT } from "@/shared";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const shipData = [
	{ name: "carrier", length: 5 },
	{ name: "battleship", length: 4 },
	{ name: "destroyer", length: 3 },
	{ name: "submarine", length: 3 },
	{ name: "patrol boat", length: 2 },
];

const SetupScreen = () => {
	const [waiting, setWaiting] = useState(false);
	const {
		state: { room, user, opponent },
	} = useContext(AppContext);
	const [start, setStart] = useState(false);
	const [axis, setAxis] = useState<"x" | "y">("x");

	const handleGameStart = async () => {
		try {
			if (!room?.roomId || !user?.userId) return;
			const response = await fetch(`http://${ENDPOINT}/start_game`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: {
						userId: user.userId,
						roomId: room.roomId,
					},
				}),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
		} catch (error) {
			// TODO Handle error response here
			console.error("Error:", error);
			setWaiting(true);
		}
	};

	useEffect(() => {
		if (opponent) {
			setWaiting(false);
		}
	}, []);

	return (
		<PageContainer className='gap-4'>
			<Text variant={Text.variant.xl} className='font-bold'>
				Place your ships
			</Text>
			<View className='flex flex-row gap-4 items-center'>
				<Text variant={Text.variant.xl}>Axis: </Text>
				<Text
					className='px-4 pt-1 rounded bg-white text-[#152023] font-bold text-center'
					variant={Text.variant.xl4}
					style={{
						color: "#152023",
						fontWeight: "bold",
					}}
				>
					{axis.toUpperCase()}
				</Text>
				<Btn
					variant='xs'
					title='Change'
					activeOpacity={0.5}
					onPress={() => setAxis((prev) => (prev === "x" ? "y" : "x"))}
				/>
			</View>
			<SetupGrid axis={axis} setStart={setStart} />
			<Text>
				Select the ship, and click on square where you want to place it
			</Text>
			<View className='flex flex-wrap flex-row w-full justify-center gap-2'>
				{shipData.map((ship, shipIndex) => (
					<Text key={`${ship.name}-${shipIndex}`}>SHIP({ship.length})</Text>
				))}
			</View>
			<Btn title='Start game' onPress={handleGameStart} disabled={!start} />
			{waiting && (
				<FadeInView
					isVisible={waiting}
					className='absolute inset-0 h-1/3 w-4/6 rounded-lg flex justify-center items-center'
				>
					<ActivityIndicator size='large' color='#ffffff' />
					<Text variant={Text.variant.xl}>Waiting for opponent</Text>
				</FadeInView>
			)}
		</PageContainer>
	);
};

export default SetupScreen;
