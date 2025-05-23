export enum GameStatus {
  WINNER_X, WINNER_O, DRAW, IN_PROCESS, INTERRUPTED
}

export interface GameHistoryModel {
  id: number;
  history: StepHistory[];
  daemonOpponent: boolean;
  start: Date;
  finished: Date | null;
  status: GameStatus;
}

export interface StepHistory {
  step: number;
  isX: boolean;
  position: [number, number];
}
