import React, { useReducer, useEffect } from 'react';
import AppContext from './app-context';
import { appReducer, DISPLAY_SIGNUP, CURRENT_USERNAME, MIKEYXCLICKED, MIKEYBUILDSTATE, MIKEYRESETSTATE, MIKEYSTARTGAME, CONNECTMESSENGER } from './reducers';

const GlobalState = props => {
  const [appState, dispatch] = useReducer(appReducer, {
    displaySignUp: false,
    currentUserName: '',
    mikeyBlankBlock: [],
    mikeyXBlock: [],
    mikeyOBlock: [],
    mikeyPlayer1: true,
    mikeyGameWin: false,
    mikeyGameStart: true,
    mikeyTieGame: false,
    connectMessenger: false,
  });

  const setDisplaySignUp = displaySignUpBoolean => {
    dispatch({ type: DISPLAY_SIGNUP, displaySignUpBoolean: displaySignUpBoolean })
  };

  const setCurrentUserName = currentUserNameValue => {
    dispatch({ type: CURRENT_USERNAME, currentUserNameValue: currentUserNameValue })
  }


  const mikeySetXBlock = mikeyXClickedObj => {
    dispatch({ type: MIKEYXCLICKED, mikeyXClickedObj: mikeyXClickedObj });
  };

  const mikeySetStartGame = mikeyGameStartBool => {
    dispatch({ type: MIKEYSTARTGAME, mikeyGameStartBool: mikeyGameStartBool });
  };

  const mikeyResetState = () => {
    dispatch({ type: MIKEYRESETSTATE });
  };

  useEffect((appState) => {
    dispatch({ type: MIKEYBUILDSTATE, state: appState });
  }, []);

  const setConnectMessenger = connectMessengerBool => {
    dispatch({ type: CONNECTMESSENGER, connectMessengerBool: connectMessengerBool });
  }


  const globalStateObject = {
    ...appState,
    setDisplaySignUp: setDisplaySignUp,
    setCurrentUserName: setCurrentUserName,
    mikeySetXBlock: mikeySetXBlock,
    mikeySetStartGame: mikeySetStartGame,
    mikeyResetState: mikeyResetState,
    setConnectMessenger: setConnectMessenger,
  };

  return (
    <AppContext.Provider value={ globalStateObject }>
      {props.children}
    </AppContext.Provider>
  );
};

export default GlobalState;
