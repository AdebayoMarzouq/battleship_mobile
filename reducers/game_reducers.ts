import { DispatchAction, Events, StateData } from "@/types/reducer";

const gameReducer = (state: StateData, action: DispatchAction): StateData => {
	const { type, payload } = action;
	switch (type) {
		case Events.CONNECTED: {
			const { userId } = payload
			return {
				...state,
				user: {
					userId
				}
			}
		}
		case Events.ROOM_DATA: {
			const { room, user, opponent } = payload
			if (!opponent) {
				return {
					...state,
					room,
					user
				}
			}
			return {
				...state,
				room,
				user,
				opponent,
			}
		}
		case Events.VALID_PLACEMENT: {
			const { ships, board } = payload
			return {
				...state,
				user: {
					...state.user,
					ships,
					board
				}
			}
		}
		case Events.START_GAME: {
			const { opponent, room } = payload
			return {
				...state,
				room: {
					...state.room,
					...room
				},
				opponent
			}
		}
		case Events.FIRE_SHOT: {
			const { hitData, opponent } = payload
			return {
				...state,
				opponent: {
					...state.opponent,
					ships: opponent.ships,
					board: opponent.board
				},
				hitData
			}
		}
		case Events.RECEIVED_SHOT: {
			const { hitData, user } = payload
			return {
				...state,
				user: {
					...state.user,
					ships: user.ships,
					board: user.board,
				},
				hitData
			}
		}
		case Events.UPDATE_TURN: {
			const { room: { turn, winner, status }, hitData } = payload;
			return {
				...state,
				room: {
					...state.room,
					turn,
					winner,
					status
				},
				hitData
			}
		}
		case Events.RESET_HITDATA: {
			const { hitData } = payload;
			return {
				...state,
				hitData
			}
		}
		case Events.RESET_DATA: {
			return {
				user: {
					...state.user,
					ships: undefined,
					board: undefined
				},
				room: null,
				opponent: null,
				hitData: null,
			}
		}
		default:
			throw new Error("Event type doesn't exist")
	}
};

export default gameReducer
