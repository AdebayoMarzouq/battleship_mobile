import { PageContainer, Btn, Text } from "@/components/shared";
import { AppContext } from "@/contexts/app_context";
import { ENDPOINT } from "@/shared";
import { Events } from "@/types/reducer";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { TextInput, View } from "react-native";

const MainMenu = () => {
	const router = useRouter();
	const {
		dispatch,
		state: { user },
	} = useContext(AppContext);
	const [name, setName] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (type: "human" | "computer") => {
		if (!user?.userId) return null;
		const { userId } = user;
		setError("");
		if (!name) {
			setError("Name required");
			return;
		} else if (name.length > 20) {
			setError("Name too long, must be < 20");
			return;
		} else {
			setError("");
		}
		try {
			const response = await fetch(`http://${ENDPOINT}/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type: Events.USER_PREF,
					data: {
						userId,
						roomId: "",
						playerName: name,
						opponentType: type,
					},
				}),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const dt = await response.json();
			dispatch({ type: Events.ROOM_DATA, payload: dt });
			router.push("/setupScreen");
		} catch (error) {
			// TODO Handle error response here
			console.error("Error:", error);
		}
	};

	return (
		<PageContainer>
			<View className='w-[90%] p-3 flex items-center justify-center gap-16'>
				<Text className='text-red-400 text-xl'>{error && error}</Text>
				<TextInput
					className='bg-[#f3f4f6] p-3 rounded w-full text-2xl'
					placeholder='Your Name'
					onChangeText={(text) => setName(text)}
					value={name}
				/>
				<View className='w-full flex items-center justify-center gap-4'>
					<Btn
						title='Play against human'
						onPress={() => handleSubmit("human")}
					/>
					<Btn
						title='Play against computer'
						onPress={() => handleSubmit("computer")}
					/>
				</View>
			</View>
		</PageContainer>
	);
};

export default MainMenu;
