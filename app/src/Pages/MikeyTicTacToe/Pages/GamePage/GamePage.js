import React, { useContext } from 'react';
import AppContext from '../../../../Context/app-context'
import BlankBlock from './Components/BlankBlock';
import BlockComponent from './Components/BlockComponent';
import WinComponent from './Components/WinComponent';
import TieGame from './Components/TieGame';

export default props => {
  const context = useContext(AppContext);

  return (
    <div className="mikey-home-box">
      { context.mikeyBlankBlock.map((element, index) => element ? <BlankBlock multiplayer={ props.multiplayer } playerLocked={ props.playerLocked } setPlayerLocked={ props.setPlayerLocked } keyIndex={index} messageSocket={ props.messageSocket }/> : <BlockComponent keyIndex={index} />) }
      { context.mikeyGameWin ? <WinComponent /> : null }
      { context.mikeyTieGame && context.mikeyGameWin === false ? <TieGame /> : null }
    </div>
  );
};