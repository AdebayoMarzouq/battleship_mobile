import React, { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";

interface FadeInViewProps extends ViewProps {
	isVisible: boolean;
}

const FadeInView = ({ children, isVisible, style, ...props }: FadeInViewProps) => {
	const opacity = useSharedValue(0);

	useEffect(() => {
		opacity.value = withSpring(isVisible ? 1 : 0);
	}, [isVisible]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	});

	return (
		<Animated.View style={[animatedStyle, style]} {...props}>
			{children}
		</Animated.View>
	);
};

export default FadeInView;
