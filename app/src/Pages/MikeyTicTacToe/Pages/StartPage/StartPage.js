import React, {useContext, useEffect, useState} from 'react';
import AppContext from '../../../../Context/app-context';
import OpenSocket from "socket.io-client";


export default props => {
  const context = useContext(AppContext);
    return (
    <div>
      <h2>Lil Mikeys Tic Tac Toe</h2>
      { props.multiplayer ? null : <button id="multiplayer-button" onClick={() => props.joinMultiplayerGame()}>Join multiplayer game</button> }
      { props.multiplayer && props.playersReady ? <button onClick={() => context.mikeySetStartGame(false)}>Start Multiplayer Game</button> : null }
      { props.multiplayer && props.playersReady === false ? <h2>Waiting for another Player</h2> : null }
      { props.multiplayer === false ? <button onClick={() => context.mikeySetStartGame(false)}>Start Solo Game</button> : null }
    </div>
  );
};