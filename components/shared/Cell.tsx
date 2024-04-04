import { View, TouchableOpacity, LayoutChangeEvent } from "react-native";
import React, { FC, PropsWithChildren, useState } from "react";
import { CellData } from "@/types/reducer";

interface CellProps extends PropsWithChildren {
	renderShipOverride: boolean;
	fn?: () => void;
	cellData?: (CellData & { row: number; col: number }) | null;
	className?: string;
	disabled?: boolean;
}

const withShipRendered = <T extends object>(WrappedComponent: FC<T>) => {
	return (props: T) => <View></View>;
};

const Cell = ({
	renderShipOverride = false,
	fn,
	cellData,
	className,
	disabled,
}: CellProps) => {
	const [layout, setLayout] = useState({ width: 0, height: 0 });
	let sizeStyle = {};
	const cellSize = 40;

	if (cellData?.hasShip) {
		sizeStyle =
			cellData.hasShip.axis === "x"
				? {
						width: cellData.hasShip.length * layout.width - 2,
						height: layout.height - 2,
				  }
				: {
						height: cellData.hasShip.length * layout.height - 2,
						width: layout.width - 2,
				  };
	}

	const onLayout = (event: LayoutChangeEvent) => {
		const { width, height } = event.nativeEvent.layout;
		setLayout({ width, height });
	};

	return (
		<View
			className={`relative border border-[#444d4f] w-10 h-10 items-center justify-center flex-1 aspect-square z-0 ${className}`}
			onLayout={onLayout}
		>
			<TouchableOpacity
				onPress={() => {
					if (fn) {
						fn();
					}
				}}
				disabled={disabled}
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{cellData?.isHit && (
					<View
						className={`w-4 h-4 rounded-full ${
							cellData.hasShip ? "bg-red-800" : "bg-[#477984]"
						}`}
					></View>
				)}
			</TouchableOpacity>
			{cellData?.hasShip &&
				cellData.hasShip.idx === 0 &&
				(cellData.hasShip.isSunk || renderShipOverride) && (
					<View
						className={`absolute border-2 bg-[#060a0b] top-0 left-0 rounded-xl`}
						style={{ zIndex: -1, borderColor: "#477984", ...sizeStyle }}
					></View>
				)}
		</View>
	);
};

export default Cell;
