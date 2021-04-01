import { Asset } from "constants/assets";

interface ApprovalState {
  step: 0;
}

interface Approved {
  type: "approved";
}

interface WithdrawState {
  step: 1;
}

interface Withdrawn {
  type: "withdrawn";
  payload: {
    amount: string;
    asset: Asset;
  };
}

interface DoneState {
  step: 2;
  amount: string;
  asset: Asset;
}

interface Restarted {
  type: "restarted";
}

type State = ApprovalState | WithdrawState | DoneState;

type Action = Approved | Withdrawn | Restarted;

export const initialState: ApprovalState = {
  step: 0,
};

export function stepReducer(_: State, action: Action): State {
  switch (action.type) {
    case "approved":
      return {
        step: 1,
      };
    case "withdrawn":
      return {
        step: 2,
        amount: action.payload.amount,
        asset: action.payload.asset,
      };
    case "restarted":
      return {
        step: 0,
      };
  }
}
