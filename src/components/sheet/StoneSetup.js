import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stonesActions } from "../../store/stones-slice";
import classes from './StoneSetup.module.css';

const StoneSetup = (props) => {
  const { moveStoneHandler } = props;
  const dispatch = useDispatch();

  const direction = useSelector(state => state.stones.direction);
  const [gameMode, setGameMode] = useState(4);
  const [hammer, setHammer] = useState('red');
  const [rockPosition, setRockPosition] = useState(2);
  const [powerPlay, setPowerPlay] = useState(0);

  const team1Color = useSelector(state => state.sheet.team1color);
  const team2Color = useSelector(state => state.sheet.team2color);

  const swapDirection = () => {
    console.log('Swap direction');
    dispatch(stonesActions.swapDirection());
  }

  const switchToDoubles = () => {
    console.log('Doubles');
    setGameMode(2);
    dispatch(stonesActions.showOnlyMdStones());
  };
  const switchToTeams = () => {
    console.log('Teams');
    setGameMode(4);
    dispatch(stonesActions.showAllStones());
  };

const houseRockX = useCallback(() => (122*powerPlay), [powerPlay]);
const guardRockX = useCallback(() => {
    switch(rockPosition) {
        case 1: 
        case 2:
            return powerPlay * 109;
        case 3:
        case 4:
            return powerPlay * 107;
        case 5:
        case 6:
        default:
            return powerPlay * 104;
    }
}, [powerPlay, rockPosition]);
const houseRockY = useCallback(() => powerPlay ? 15 : +15-61, [powerPlay]);
const guardRockY = useCallback(() => {
    switch(rockPosition) {
        case 1: return 183+228.6-91.4-15;
        case 2: return 183+228.6-91.4+15;
        case 3: return 183+228.6-15;
        case 4: return 183+228.6+15;
        case 5: return 183+228.6+91.4-15;
        default: return 183+228.6+91.4+15;
    }
}, [rockPosition]);

const presetStones = useCallback(() => {
    const [houseRock, guardRock] = hammer === 'red' ? ['r6', 'y6'] : ['y6', 'r6'];
    moveStoneHandler(houseRock, houseRockX(), direction*houseRockY());
    moveStoneHandler(guardRock, guardRockX(), direction*guardRockY());
}, [guardRockX, guardRockY, hammer, houseRockX, houseRockY, moveStoneHandler,direction]);

const initPowerPlayLeft = () => {
    setPowerPlay(-1);
    presetStones();
}
const initNoPowerPlay = () => {
    setPowerPlay(0);
    presetStones();
};
const initPowerPlayRight = () => {
    setPowerPlay(1);
    presetStones();
};

  useEffect(() => {
    if(gameMode === 2)
      presetStones();
  }, [gameMode, presetStones]);

  return (<>
    <h2>Initial stone setup</h2>
      <div className="field">
        <label>Direction:</label>
        <div className={classes['btn-group']}>
        { direction === 1 ? 'Away' : 'Home' }
        <button type="button" onClick={swapDirection}>Swap</button>
        </div>
      </div>
      <div className="field">
        <label>Game format:</label>
        <div className={classes['btn-group']}>
          <button type="button" onClick={switchToTeams} className={gameMode === 4 ? classes.activeBtn : classes.inactiveBtn}>4 person</button>
          <button type="button" onClick={switchToDoubles} className={gameMode === 2 ? classes.activeBtn : classes.inactiveBtn}>(Mixed) doubles</button>
        </div>
      </div>
      <div className="field">
          <label>Hammer:</label>
          <div className={classes['btn-group']}>
            <button type="button" onClick={() => {setHammer('red')}} className={hammer === 'red' ? classes.activeBtn : classes.inactiveBtn}>{ team1Color }</button>
            <button type="button" onClick={() => {setHammer('yellow')}} className={hammer === 'yellow' ? classes.activeBtn : classes.inactiveBtn}>{ team2Color }</button>
            </div>
      </div>
      { gameMode === 2 && (<div>
          <div className="field">
              <label>Position:</label>
              <div className={classes['btn-group']}>
                <button type="button" onClick={() => {setRockPosition(1)}} className={rockPosition === 1 ? classes.activeBtn : classes.inactiveBtn}>1</button>
                <button type="button" onClick={() => {setRockPosition(2)}} className={rockPosition === 2 ? classes.activeBtn : classes.inactiveBtn}>2</button>
                <button type="button" onClick={() => {setRockPosition(3)}} className={rockPosition === 3 ? classes.activeBtn : classes.inactiveBtn}>3</button>
                <button type="button" onClick={() => {setRockPosition(4)}} className={rockPosition === 4 ? classes.activeBtn : classes.inactiveBtn}>4</button>
                <button type="button" onClick={() => {setRockPosition(5)}} className={rockPosition === 5 ? classes.activeBtn : classes.inactiveBtn}>5</button>
                <button type="button" onClick={() => {setRockPosition(6)}} className={rockPosition === 6 ? classes.activeBtn : classes.inactiveBtn}>6</button>                
              </div>
          </div>
          <div className="field">
              <label>Powerplay:</label>
              <div className={classes['btn-group']}>
                <button type="button" onClick={initPowerPlayLeft} className={powerPlay === -1 ? classes.activeBtn : classes.inactiveBtn}>&larr; Left</button>
                <button type="button" onClick={initNoPowerPlay} className={powerPlay === 0 ? classes.activeBtn : classes.inactiveBtn}>Center</button>
                <button type="button" onClick={initPowerPlayRight} className={powerPlay === 1 ? classes.activeBtn : classes.inactiveBtn}>Right &rarr;</button>
              </div>
          </div>
      </div>)}
  </>);
}
export default StoneSetup;