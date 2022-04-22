import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stonesActions } from "../../store/stones-slice";
import classes from './StoneSetup.module.css';

const StoneSetup = (props) => {
  const { moveStoneHandler } = props;
  //const [stones, updateStones] = [props.stones, props.updateStones];
  const stones = useSelector(state => state.stones);
  const dispatch = useDispatch();

  const [gameMode, setGameMode] = useState(4);
  const [hammer, setHammer] = useState('red');
  const [rockPosition, setRockPosition] = useState(2);
  const [powerPlay, setPowerPlay] = useState(0);
  const backgap = useSelector(state => state.sheet.backgap);
  const sheetWidth = useSelector(state => state.sheet.width);

  const team1Color = useSelector(state => state.sheet.team1color);
  const team2Color = useSelector(state => state.sheet.team2color);

  const switchToDoubles = () => {
    console.log('Doubles');
    setGameMode(2);
    dispatch(stonesActions.showOnlyMdStones());
    /*updateStones(stones => {
        return Object.keys(stones).map(k => { 
            const visible = stones[k].num > 6 ? false : true;
            return { ...stones[k], visible }
        });
    });*/
  };
  const switchToTeams = () => {
    console.log('Teams');
    setGameMode(4);
    dispatch(stonesActions.showAllStones());
    /*updateStones(stones => {
      return Object.keys(stones).map(k => { 
        return { ...stones[k], visible: true }
      });
    });*/
  };

const houseRockX = useCallback(() => sheetWidth/2+(122*powerPlay), [sheetWidth, powerPlay]);
const guardRockX = useCallback(() => {
    switch(rockPosition) {
        case 1: 
        case 2:
            return sheetWidth/2 + powerPlay * 109;
        case 3:
        case 4:
            return sheetWidth/2 + powerPlay * 107;
        case 5:
        case 6:
        default:
            return sheetWidth/2 + powerPlay * 104;
    }
}, [powerPlay, rockPosition, sheetWidth]);
const houseRockY = useCallback(() => powerPlay ? backgap+183+15 : backgap+183+15-61, [powerPlay, backgap]);
const guardRockY = useCallback(() => {
    switch(rockPosition) {
        case 1: return backgap+183*2+228.6-91.4-15;
        case 2: return backgap+183*2+228.6-91.4+15;
        case 3: return backgap+183*2+228.6-15;
        case 4: return backgap+183*2+228.6+15;
        case 5: return backgap+183*2+228.6+91.4-15;
        default: return backgap+183*2+228.6+91.4+15;
    }
}, [rockPosition, backgap]);

const presetStones = useCallback(() => {
    const [houseRock, guardRock] = hammer === 'red' ? ['r6', 'y6'] : ['y6', 'r6'];
    moveStoneHandler(houseRock, houseRockX(), houseRockY());
    moveStoneHandler(guardRock, guardRockX(), guardRockY());
}, [guardRockX, guardRockY, hammer, houseRockX, houseRockY, moveStoneHandler]);

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