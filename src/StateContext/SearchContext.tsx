import { ReactNode, createContext, useCallback, useContext, useReducer } from 'react';
import { MTGModel } from '../api/api';

type ActionsModel = {
  setText: (text: string) => void;
  setResult: (data: MTGModel[] | never[]) => void;
};
interface StoreModel {
  text: string;
  result: MTGModel[] | never[];
}
interface StateModel extends StoreModel {
  actions: ActionsModel;
}

export const DEFAULT_STATE: StateModel = {
  text: '',
  result: [],
  actions: {
    setText: () => {},
    setResult: () => {},
  },
};

export const StateContext = createContext(DEFAULT_STATE);

export function StateReducer(
  state: StoreModel,
  action: { type: string; data: string | MTGModel[] | never[] },
) {
  const updatedState = { ...state };
  switch (action.type) {
    case 'SET_TEXT': {
      if (typeof action.data === 'string') updatedState.text = action.data;
      break;
    }
    case 'SET_RESULT': {
      if (Array.isArray(action.data)) updatedState.result = action.data;
      break;
    }
    default:
      console.log(`Error: ${action.type} not caught by State reducer`);
  }
  return updatedState;
}

export const useCustomState = (defaultState = DEFAULT_STATE) => {
  const [state, dispatch] = useReducer(StateReducer, defaultState);
  const setText = useCallback(
    (data: string) => dispatch({ type: 'SET_TEXT', data }),
    [dispatch],
  );
  const setResult = useCallback(
    (data: MTGModel[] | never[]) => dispatch({ type: 'SET_RESULT', data }),
    [dispatch],
  );
  return {
    ...state,
    actions: {
      setText: setText,
      setResult: setResult,
    },
  };
};

export const StateProvider = ({ children, defaultState=DEFAULT_STATE }: { children: ReactNode, defaultState?: StateModel }) => {
  const state = useCustomState(defaultState);

  return <StateContext.Provider value={state}>{children}</StateContext.Provider>;
};

export const useStateStore = () => useContext(StateContext);
