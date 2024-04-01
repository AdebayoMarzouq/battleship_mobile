import { AppContext } from "@/contexts/app_context";
import { CellData, Events } from "@/types/reducer";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import Cell from "./Cell";
import GridContainer from "./GridContainer";
import RowContainer from "./RowContainer";

type GridProps = {
	type?: "friendly" | "enemy";
};

const colors = {
	hasShip: "",
	errorCell: "bg-red-300",
	default: "bg-[#152023]",
};

const shipData = [
	{ name: "carrier", length: 5 },
	{ name: "battleship", length: 4 },
	{ name: "destroyer", length: 3 },
	{ name: "submarine", length: 3 },
	{ name: "patrol boat", length: 2 },
];

const Grid = ({ type }: GridProps) => {
	const router = useRouter();
	let board: CellData[][];
	const {
		state: { user, opponent, room },
		sendMessage,
	} = useContext(AppContext);

	if (type === "friendly") {
		if (!user || !user.board) {
			return null;
		}
		board = user.board;
	} else if (type === "enemy") {
		if (!opponent || !opponent.board) {
			return null;
		}
		board = opponent.board;
	} else {
		return null;
	}

	const handleClick = (row: number, col: number) => {
		if (type === "friendly") return;
		if (!user || !user.userId || !room || !room.roomId) return;
		sendMessage(Events.FIRE_SHOT, user.userId, room.roomId, {
			coordinates: { rowIndex: row, columnIndex: col },
		});
	};

	return (
		<GridContainer>
			{board.map((row, rowIndex) => (
				<RowContainer key={`i${rowIndex}`} rowNumber={rowIndex + 1}>
					{row.map((cell, cellIndex) => {
						const style = cell.hasShip ? colors.hasShip : colors.default;
						return (
							<Cell
								renderShipOverride={type === "friendly"}
								key={cellIndex}
								cellData={{ ...cell, row: rowIndex, col: cellIndex }}
								className={style}
								fn={() => {
									handleClick(rowIndex, cellIndex);
								}}
								disabled={cell.isHit || !!cell.hasShip}
							></Cell>
						);
					})}
				</RowContainer>
			))}
		</GridContainer>
	);
};

export default Grid;
