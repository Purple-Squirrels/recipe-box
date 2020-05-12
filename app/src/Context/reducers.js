export const DISPLAY_SIGNUP = 'DISPLAY_SIGNUP';
export const CURRENT_USERNAME = 'CURRENT_USERNAME';

export const MIKEYXCLICKED = "mikeyXClicked";
export const MIKEYBUILDSTATE = "mikeyState";
export const MIKEYRESETSTATE = "mikeyResetState";
export const MIKEYSTARTGAME = "mikeyStartGame";

export const CONNECTMESSENGER = 'connectMessenger';

const setDisplaySignUp = (action, state) => {
  return { ...state, displaySignUp: action.displaySignUpBoolean };
};

const setCurrentUserName = (action, state) => {
  return { ...state, currentUserName: action.currentUserNameValue };
};



const mikeyBuildStateFunc = (action, state) => {
  const State = { ...state };

  for (let i = 0; i < 9; i += 1) {
    State.mikeyBlankBlock.push(true);
    State.mikeyXBlock.push(false);
    State.mikeyOBlock.push(false);
  };

  return {
    ...state,
    mikeyBlankBlock: State.mikeyBlankBlock,
    mikeyXBlock: State.mikeyXBlock,
    mikeyOBlock: State.mikeyOBlock
  };
};

const mikeyResetState = (action, state) => {
  const State = { ...state };

  for (let i = 0; i < 9; i += 1) {
    State.mikeyBlankBlock[i] = true;
    State.mikeyXBlock[i] = false;
    State.mikeyOBlock[i] = false;
  };

  return {
    ...state,
    mikeyBlankBlock: State.mikeyBlankBlock,
    mikeyXBlock: State.mikeyXBlock,
    mikeyOBlock: State.mikeyOBlock,
    mikeyGameWin: false,
    mikeyPlayer1: true
  };
};

const mikeyCheckWinnerFunc = State => {
  if ((State.mikeyXBlock[0] && State.mikeyXBlock[1] && State.mikeyXBlock[2]) || (State.mikeyOBlock[0] && State.mikeyOBlock[1] && State.mikeyOBlock[2])) { return true; };
  if ((State.mikeyXBlock[3] && State.mikeyXBlock[4] && State.mikeyXBlock[5]) || (State.mikeyOBlock[3] && State.mikeyOBlock[4] && State.mikeyOBlock[5])) { return true; };
  if ((State.mikeyXBlock[6] && State.mikeyXBlock[7] && State.mikeyXBlock[8]) || (State.mikeyOBlock[6] && State.mikeyOBlock[7] && State.mikeyOBlock[8])) { return true; };
  if ((State.mikeyXBlock[0] && State.mikeyXBlock[3] && State.mikeyXBlock[6]) || (State.mikeyOBlock[0] && State.mikeyOBlock[3] && State.mikeyOBlock[6])) { return true; };
  if ((State.mikeyXBlock[1] && State.mikeyXBlock[4] && State.mikeyXBlock[7]) || (State.mikeyOBlock[1] && State.mikeyOBlock[4] && State.mikeyOBlock[7])) { return true; };
  if ((State.mikeyXBlock[2] && State.mikeyXBlock[5] && State.mikeyXBlock[8]) || (State.mikeyOBlock[2] && State.mikeyOBlock[5] && State.mikeyOBlock[8])) { return true; };
  if ((State.mikeyXBlock[0] && State.mikeyXBlock[4] && State.mikeyXBlock[8]) || (State.mikeyOBlock[0] && State.mikeyOBlock[4] && State.mikeyOBlock[8])) { return true; };
  if ((State.mikeyXBlock[2] && State.mikeyXBlock[4] && State.mikeyXBlock[6]) || (State.mikeyOBlock[2] && State.mikeyOBlock[4] && State.mikeyOBlock[6])) { return true; };

  return false;
};

const mikeyCheckForTieGameFunc = state => {
  let tieGame = true;
  state.mikeyBlankBlock.forEach(element => { if (element) { tieGame = false; }; });
  return tieGame;
}

const mikeyStartGameFunc = (action, state) => {
  return {
    ...state,
    mikeyGameStart: action.mikeyGameStartBool
  };
};

const mikeyXClickedFunc = (action, state) => {
  const State = { ...state };
  if (action.mikeyXClickedObj.xClicked) {
    State.mikeyXBlock[action.mikeyXClickedObj.index] = true;
    State.mikeyBlankBlock[action.mikeyXClickedObj.index] = false;
  } else {
    State.mikeyOBlock[action.mikeyXClickedObj.index] = true;
    State.mikeyBlankBlock[action.mikeyXClickedObj.index] = false;
  };

  State.mikeyPlayer1 ? State.mikeyPlayer1 = false : State.mikeyPlayer1 = true;

  return {
    ...State,
    mikeyXBlock: State.mikeyXBlock,
    mikeyOBlock: State.mikeyOBlock,
    mikeyBlankBlock: State.mikeyBlankBlock,
    mikeyPlayer1: State.mikeyPlayer1,
    mikeyGameWin: mikeyCheckWinnerFunc(State),
    mikeyTieGame: mikeyCheckForTieGameFunc(state)
  };
};

const connectMessengerFunc = (action, state) => {
  return { ...state, connectMessenger: action.connectMessengerBool };
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_SIGNUP:
      return setDisplaySignUp(action, state);
    case CURRENT_USERNAME:
      return setCurrentUserName(action, state);
    case MIKEYBUILDSTATE:
      return mikeyBuildStateFunc(action, state);
    case MIKEYSTARTGAME:
      return mikeyStartGameFunc(action, state);
    case MIKEYXCLICKED:
      return mikeyXClickedFunc(action, state);
    case MIKEYRESETSTATE:
      return mikeyResetState(action, state);
    case CONNECTMESSENGER:
      return connectMessengerFunc(action, state);
    default:
      return state;
  };
};
