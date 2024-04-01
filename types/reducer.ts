export enum Events {
	CONNECTED = 'CONNECTED',
	USER_PREF = 'USER_PREF',
	ROOM_DATA = 'ROOM_DATA',
	START_GAME = 'START_GAME',
	VALID_PLACEMENT = 'VALID_PLACEMENT',
	FIRE_SHOT = 'FIRE_SHOT',
	RECEIVED_SHOT = 'RECEIVED_SHOT',
	UPDATE_TURN = 'UPDATE_TURN',
	INITIALIZE_PLAYERS = 'INITIALIZE_PLAYERS',
	RESET_HITDATA = 'RESET_HITDATA',
	RESET_DATA = 'RESET_DATA',
	OPPONENT_QUIT = 'OPPONENT_QUIT'
}

type Default = {
	userId: string;
	roomId: string;
}

export type CellData = {
	isHit: boolean;
	hasShip: {
		idx: number;
		isSunk: boolean;
		name: string;
		length: number;
		axis: 'x' | 'y';
	} | null;
};

export type RoomData = {
	turn: string;
	roomId?: string;
	isFull?: boolean;
	status?: "started" | "ended";
	winner?: string | null;
}

export type UserObject = {
	userName?: string;
	userId?: string;
	ships?: { name: string; length: number; }[];
	board?: CellData[][] | null;
}

export type StateData = {
	room: RoomData | null;
	user: UserObject | null;
	opponent: UserObject | null;
	hitData: { report: 0 | 1 | 2 | 3; details: { ship: string } | null } | null;
}

export type HitData = {
	report: 0 | 1 | 2 | 3;
	details: { ship: string } | null
};

export type DispatchAction =
	| { type: Events.CONNECTED, payload: { userId: string } }
	| { type: Events.ROOM_DATA, payload: Default & { room: RoomData; user: UserObject; opponent: UserObject } }
	| { type: Events.VALID_PLACEMENT, payload: { ships: { name: string; length: number; }[]; board: CellData[][] } }
	| { type: Events.START_GAME, payload: { room: RoomData; opponent: UserObject } }
	| { type: Events.FIRE_SHOT, payload: { hitData: HitData; room: RoomData; opponent: UserObject } }
	| { type: Events.RECEIVED_SHOT, payload: { hitData: HitData; room: RoomData; user: UserObject } }
	| { type: Events.UPDATE_TURN, payload: { room: RoomData; hitData: HitData | null } }
	| { type: Events.RESET_HITDATA, payload: { hitData: HitData | null } }
	| { type: Events.RESET_DATA, payload: null };
