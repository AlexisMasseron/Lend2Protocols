import { Asset } from "constants/assets";

interface AuthorizeState {
  step: 0;
}

interface Authorized {
  type: "authorized";
  payload: {
    amount: string;
    asset: Asset;
  };
}

interface DelegateState {
  step: 1;
  amount?: string;
  asset?: Asset;
}

interface Delegated {
  type: "delegated";
  payload: {
    amount: string;
    asset: Asset;
  };
}

interface DepositState {
  step: 2;
  amount?: string;
  asset?: Asset;
}

interface Deposited {
  type: "deposited";
  payload: {
    amount: string;
    asset: Asset;
  };
}

interface DoneState {
  step: 3;
  amount: string;
  asset: Asset;
}

interface Restarted {
  type: "restarted";
}

type State = AuthorizeState | DelegateState | DepositState | DoneState;

type Action = Authorized | Delegated | Deposited | Restarted;

export const initialState: AuthorizeState = {
  step: 0,
};

export function stepReducer(_: State, action: Action): State {
  switch (action.type) {
    case "authorized":
      return {
        step: 1,
        amount: action.payload.amount,
        asset: action.payload.asset,
      };
    case "delegated":
      return {
        step: 2,
        amount: action.payload.amount,
        asset: action.payload.asset,
      };
    case "deposited":
      return {
        step: 3,
        amount: action.payload.amount,
        asset: action.payload.asset,
      };
    case "restarted":
      return {
        step: 0,
      };
  }
}
