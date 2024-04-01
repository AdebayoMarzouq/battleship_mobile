import { Text as RNText, TextProps } from "react-native";
import React from "react";

enum Variant {
	xl4 = "text-4xl",
	xl = "text-xl",
	lg = "text-lg",
	md = "text-md",
	base = "text-base",
	sm = "text-sm",
}

const VariantMaps: Record<Variant, string> = {
	[Variant.xl4]: "text-4xl",
	[Variant.xl]: "text-xl",
	[Variant.lg]: "text-lg",
	[Variant.md]: "text-xl",
	[Variant.sm]: "text-sm",
	[Variant.base]: "text-base",
};

enum TextColor {
	primary = "text-white",
	secondary = "text-[#0b1012]",
}

type TxtProps = TextProps & {
	variant: Variant;
	color: string;
};

const Text = ({ variant, className, children, color, ...props }: TxtProps) => {
	return (
		<RNText
			className={`${VariantMaps[variant]} ${color} ${className} `}
			{...props}
		>
			{children}
		</RNText>
	);
};

Text.defaultProps = {
	variant: Variant.base,
	color: TextColor.primary,
};

Text.variant = Variant;
Text.color = TextColor;

export default Text;
