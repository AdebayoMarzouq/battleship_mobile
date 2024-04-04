import React, { useContext, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { CellData, Events } from "@/types/reducer";
import { AppContext } from "@/contexts/app_context";
import { useRouter } from "expo-router";
import { ENDPOINT } from "@/shared";
import Cell from "./Cell";
import GridContainer from "./GridContainer";
import RowContainer from "./RowContainer";

type GridProps = {
	type?: "friendly" | "enemy";
	axis: "x" | "y";
	setStart: React.Dispatch<React.SetStateAction<boolean>>;
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

const SetupGrid = ({ axis, setStart }: GridProps) => {
	const router = useRouter();
	let board: CellData[][];
	const {
		dispatch,
		state: { room, user },
	} = useContext(AppContext);
	const [currentShip, setCurrentShip] = useState(0);
	const [errorCell, setErrorCell] = useState<{
		row: number;
		column: number;
	} | null>(null);

	useEffect(() => {
		if (!user || !room || (!userId && !roomId)) {
			router.replace("/mainMenu");
		}
	}, []);

	if (!user || !user.userId) return null;
	if (!room) return null;
	const { userId } = user;
	const { roomId } = room;

	const debounceHandleClick = debounce(
		async (row: number, column: number) => {
			setErrorCell(null);
			if (currentShip > 4) {
				return;
			}
			try {
				const response = await fetch(`http://${ENDPOINT}/place_ships`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						data: {
							userId,
							roomId,
							coordinates: {
								axis,
								row,
								col: column,
							},
							ship: shipData[currentShip],
						},
					}),
				});
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const dt = await response.json();
				if (dt.valid) {
					dispatch({ type: Events.VALID_PLACEMENT, payload: dt });
					setCurrentShip((prev) => prev + 1);
					if (currentShip === 4) setStart(true);
				} else {
					setErrorCell({ row, column });
				}
			} catch (error) {
				// TODO Handle error response here
				console.error("Error:", error);
			}
		},
		300,
		{
			leading: true,
			trailing: false,
		}
	);

	if (!user || !user.board) {
		board = Array.from({ length: 10 }, () =>
			Array.from({ length: 10 }, () => {
				return { isHit: false, hasShip: null };
			})
		);
	} else {
		board = user.board;
	}

	return (
		<GridContainer>
			{board.map((row, rowIndex) => (
				<RowContainer key={`i${rowIndex}`} rowNumber={rowIndex + 1}>
					{row.map((cell, cellIndex) => {
						const hasError =
							errorCell &&
							errorCell.row === rowIndex &&
							errorCell.column === cellIndex
								? colors.errorCell
								: "";
						const style = hasError
							? hasError
							: cell.hasShip
							? colors.hasShip
							: colors.default;
						return (
							<Cell
								renderShipOverride={true}
								key={cellIndex}
								cellData={{ ...cell, row: rowIndex, col: cellIndex }}
								className={style}
								fn={() => debounceHandleClick(rowIndex, cellIndex)}
								disabled={cell.isHit || !!cell.hasShip}
							></Cell>
						);
					})}
				</RowContainer>
			))}
		</GridContainer>
	);
};

export default SetupGrid;
