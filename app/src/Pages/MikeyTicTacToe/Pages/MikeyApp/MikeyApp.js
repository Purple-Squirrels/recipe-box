import React, {useContext, useEffect, useState} from 'react';

import './MikeyApp.css';

import '../../../../App.css';
import GamePage from '../GamePage/GamePage';
import StartPage from '../StartPage/StartPage';
import AppContext from '../../../../Context/app-context';
import { createStyles, makeStyles } from "@material-ui/core/styles/index";
import OpenSocket from "socket.io-client";

const useStyles = makeStyles(() =>
    createStyles({
        mikeyApp: {
            'margin-top': '75px',
            'text-align': 'center',
        },
    }),
);

let playerSocket = null;
let messageSocket = null;

export default () => {
    const [playerNumber, setPlayerNumber] = useState(1);
    const [multiplayer, setMultiplayer] = useState(false);
    const [playersReady, setPlayersReady] = useState(false);
    const [playerLocked, setPlayerLocked] = useState(false);

    const joinMultiplayerGame = () => {
        playerSocket = OpenSocket('http://localhost:8082');
        messageSocket = OpenSocket('http://localhost:8082/playerMessage');

        playerSocket.on("incomingData", newData => {
            const blocks = document.getElementsByClassName("mikey-box");
            const data = JSON.parse(newData);
            if (document.getElementsByClassName("tic-tac-toe-player-number")[0].innerText === "You are Player: 1") {
                if (data.mikeyPlayer1 === false) {
                    setPlayerLocked(false);
                    blocks[data.keyIndex].click();
                };
            } else {
                if (data.mikeyPlayer1) {
                    setPlayerLocked(false);
                    blocks[data.keyIndex].click();
                };
            };
        });
        playerSocket.on("playerNumber", number => {
            setPlayerNumber(number);
            setMultiplayer(true);
        });
        playerSocket.on("playersReady", number => {
            setPlayersReady(true);
        });
    };

    useEffect(() => {
        if (playerNumber === 2) {
            setPlayerLocked(true);
        };
    }, [multiplayer]);

  const context = useContext(AppContext);
  const classes = useStyles();

  return (
    <div className={classes.mikeyApp} >
        { multiplayer ? <h2 className="tic-tac-toe-player-number">You are Player: { playerNumber }</h2> : null }
        { context.mikeyGameStart ? <StartPage joinMultiplayerGame={ joinMultiplayerGame } multiplayer={ multiplayer } playersReady={ playersReady } /> : <GamePage multiplayer={ multiplayer } playerLocked={ playerLocked } setPlayerLocked={ setPlayerLocked } playerNumber={ playerNumber } setPlayerNumber={ setPlayerNumber} playerSocket={ playerSocket } messageSocket={ messageSocket } /> }
    </div>
  );
};