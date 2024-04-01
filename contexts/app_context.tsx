import useWebSocket, { initialState } from "@/hooks/useWebSocket";
import { DispatchAction, StateData } from "@/types/reducer";
import { Dispatch, PropsWithChildren, createContext, useCallback, useMemo } from "react";

type AppContextProps = PropsWithChildren;

const AppContext = createContext<{
	state: StateData;
	dispatch: Dispatch<DispatchAction>;
	sendMessage: (
		type: string,
		userId: string,
		roomId: string,
		data?: { [key: string]: unknown }
	) => void;
}>({
	state: initialState,
	dispatch: () => {},
	sendMessage: () => {},
});

const AppProvider = ({ children }: AppContextProps) => {
	const { state, dispatch, sendMessage } = useWebSocket();

	return (
		<AppContext.Provider value={{ state, dispatch, sendMessage }}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
