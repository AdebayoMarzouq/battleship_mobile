import gameReducer from '@/reducers/game_reducers';
import { ENDPOINT } from '@/shared';
import { Events, StateData } from '@/types/reducer';
import { useRouter } from 'expo-router';
import { useEffect, useReducer, useState } from 'react';

export const initialState: StateData = {
	room: null,
	user: null,
	opponent: null,
	hitData: null,
};

const createWebSocketConnection = () => new WebSocket(`ws://${ENDPOINT}`);

const useWebSocket = () => {
	const router = useRouter();
	const [state, dispatch] = useReducer(gameReducer, initialState);
	const [webSocketClient, setWebSocketClient] = useState<WebSocket | null>(null);

	useEffect(() => {
		const wsClient = createWebSocketConnection();
		let timeouts: NodeJS.Timeout[] = [];

		const handleOpen = () => {
			console.log('WebSocket client connected and open');
			setWebSocketClient(wsClient);
		};

		const handleMessage = (message: MessageEvent) => {
			const msg = JSON.parse(message.data);
			if (msg.type in Events) {
				if (msg.type === Events.START_GAME) {
					dispatch({ type: msg.type, payload: msg.data });
					router.replace("/gameScreen");
				} else if (msg.type === Events.FIRE_SHOT || msg.type === Events.RECEIVED_SHOT) {
					const { room, hitData } = msg.data;
					let delay1: NodeJS.Timeout;
					let delay2: NodeJS.Timeout;
					delay1 = setTimeout(() => {
						dispatch({ type: msg.type, payload: msg.data })
					}, 500)
					timeouts.push(delay1)
					if (hitData) {
						let time = 4000;
						if (hitData.report === 1 || hitData.report === 2) {
							time = 4000;
						}
						delay2 = setTimeout(() => {
							if (hitData.report === 3) {
								dispatch({ type: Events.UPDATE_TURN, payload: { room, hitData } });
							} else {
								dispatch({ type: Events.UPDATE_TURN, payload: { room, hitData: null } });
							}
						}, time)
						timeouts.push(delay2);
					}
				} else {
					dispatch({ type: msg.type, payload: msg.data });
				}
			}
		};

		wsClient.addEventListener('open', handleOpen);
		wsClient.addEventListener('message', handleMessage);
		wsClient.onerror = (error) => console.error('Connection Error:', error);
		wsClient.onclose = (e) => {
			console.warn('WebSocket Client Closed ', e.code, e.reason);
			setWebSocketClient(null);
		};

		return () => {
			console.log("Clean up on useWebSocket")
			timeouts.forEach(clearTimeout);
			wsClient.close();
		};
	}, []);

	const sendMessage = (type: string, userId: string, roomId: string, data?: { [key: string]: unknown }) => {
		if (webSocketClient?.readyState === WebSocket.OPEN) {
			const message = { type, data: { userId, roomId, ...data } };
			webSocketClient.send(JSON.stringify(message));
		} else {
			console.warn('WebSocket connection not open');
			// TODO implement a retry mechanism or display a user-friendly message
		}
	};

	return { state, dispatch, sendMessage };
}

export default useWebSocket;
