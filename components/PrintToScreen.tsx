import React, { useContext, useEffect, useState } from "react";
import Text from "@/components/shared/CustomText";
import { AppContext } from "@/contexts/app_context";
import { HitData } from "@/types/reducer";

// Feedback when the user or opponent plays their turn
function turnFeedback(isUser: boolean, hitData: HitData): string {
	const { report, details } = hitData;

	switch (report) {
		case 0:
			return isUser
				? "Splash! The shot missed. Better luck next time."
				: "The enemy missed! Our fleet remains strong.";
		case 1:
			return isUser
				? hitFeedback(true, details?.ship)
				: opponentHitFeedback(true, details?.ship);
		case 2:
			return isUser
				? `Enemy ${details?.ship} sunk! Excellent work!`
				: `Alert! The enemy's ${details?.ship} has been destroyed!`;
		case 3:
			return isUser
				? "Congratulations! You've won the battle!"
				: "We've been defeated! The enemy has emerged victorious.";
		default:
			return "Invalid hit report.";
	}
}

// Feedback for user's hit
function hitFeedback(hit: boolean, shipName?: string): string {
	if (hit && shipName) {
		return `Direct hit! You've struck the enemy's ${shipName}. Keep firing!`;
	} else if (hit) {
		return `Hit confirmed! You've damaged an enemy vessel!`;
	} else {
		return `Splash! The shot missed. Better luck next time.`;
	}
}

// Feedback for opponent's hit
function opponentHitFeedback(hit: boolean, shipName?: string): string {
	if (hit && shipName) {
		return `Alert! Your ${shipName} is under attack! Man the battle stations!`;
	} else if (hit) {
		return `We've been hit! Damage reported on deck!`;
	} else {
		return `The enemy missed! Our fleet remains strong.`;
	}
}

const PrintToScreen = ({
	type,
	speed = 20,
}: {
	type: "attacker" | "reciever";
	speed?: number;
}) => {
	const [printedText, setPrintedText] = useState("");
	const {
		state: { hitData },
	} = useContext(AppContext);
	let text = "";
	if (hitData) {
		text =
			type === "attacker"
				? turnFeedback(true, hitData)
				: turnFeedback(false, hitData);
	}

	useEffect(() => {
		setPrintedText("");
		let index = 0;
		const timeoutId = setInterval(() => {
			setPrintedText((prev) => prev + text.charAt(index));
			index++;
			if (index === text.length) {
				clearInterval(timeoutId);
			}
		}, speed);

		return () => clearInterval(timeoutId);
	}, [hitData]);

	return (
		<Text color={Text.color.secondary} className='text-[#080d0e]'>
			{printedText}
		</Text>
	);
};

export default PrintToScreen;
