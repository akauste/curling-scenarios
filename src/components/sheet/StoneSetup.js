import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stonesActions } from "../../store/stones-slice";
import Field from "../UI/Field";
import DisplaySheet from "./DisplaySheet";
import DisplayStone from "./DisplayStone";
import classes from './StoneSetup.module.css';

const StoneSetup = (props) => {
  const dispatch = useDispatch();

  const [direction, setDirection] = useState(1);
  const [gameMode, setGameMode] = useState(4);
  const [hammer, setHammer] = useState('red');
  const [rockPosition, setRockPosition] = useState(2);
  const [powerPlay, setPowerPlay] = useState(0);

  const sheet = useSelector(state => state.sheet);

  const swapDirection = () => {
    setDirection(dir => -dir);
  }

  const initStones = event => {
    dispatch(stonesActions.initialize({
      direction,
      hammer,
      gameMode,
      rockPosition,
      powerPlay,
    }));
    props.onClose(event);
  }

  return (<>
    <h2>Initial stone setup</h2>
    <div style={{display: 'flex', minWidth: '30em'}}>
    <div style={{ maxWidth: '6em', maxHeight: '50vh', flexGrow: 0 }}>
      <DisplaySheet direction={direction} sheet={sheet} stones={[]} />
    </div>
    <form onSubmit={initStones} style={{flexGrow: 100}}>
      <Field label="Playing direction:" id="swap-btn">
        { direction === 1 ? <span style={{ paddingRight: '0.5rem' }}>&#8679;</span> : <span style={{ paddingRight: '0.5rem' }}>&#8659;</span> }
        <button id="swap-btn" type="button" onClick={swapDirection}>Swap</button>
      </Field>
      <Field label="Hammer:" id="hammer">
        <div className={classes['btn-group']}>
          <button type="button" name="red" onClick={() => {setHammer('red')}} className={hammer === 'red' ? classes.activeBtn : classes.inactiveBtn}>
            <svg viewBox="-15 -15 30 30" style={{width: '.9em', height: '.9em', marginRight: '0.3rem'}}><DisplayStone stone={{id: "x", x:0, y:0, color:sheet.team1color, visible: true}} /></svg>
            { sheet.team1color }
          </button>
          <button type="button" name="yellow" onClick={() => {setHammer('yellow')}} className={hammer === 'yellow' ? classes.activeBtn : classes.inactiveBtn}>
            <svg viewBox="-15 -15 30 30" style={{width: '.9em', height: '.9em', marginRight: '0.3rem'}}><DisplayStone stone={{id: "x", x:0, y:0, color:sheet.team2color, visible: true}} /></svg>
            { sheet.team2color }
          </button>
        </div>
      </Field>
      <Field label="Game format:" id="game-mode">
        <div className={classes['btn-group']}>
          <button type="button" onClick={event=>setGameMode(4)} className={gameMode === 4 ? classes.activeBtn : classes.inactiveBtn}>4 person</button>
          <button type="button" onClick={event=>setGameMode(2)} className={gameMode === 2 ? classes.activeBtn : classes.inactiveBtn}>(Mixed) doubles</button>
        </div>
      </Field>
      { gameMode === 2 && (<>
          <Field label="Position:" id="rock-position">
            <div className={classes['btn-group']}>
              <button type="button" onClick={() => {setRockPosition(1)}} className={rockPosition === 1 ? classes.activeBtn : classes.inactiveBtn}>1</button>
              <button type="button" onClick={() => {setRockPosition(2)}} className={rockPosition === 2 ? classes.activeBtn : classes.inactiveBtn}>2</button>
              <button type="button" onClick={() => {setRockPosition(3)}} className={rockPosition === 3 ? classes.activeBtn : classes.inactiveBtn}>3</button>
              <button type="button" onClick={() => {setRockPosition(4)}} className={rockPosition === 4 ? classes.activeBtn : classes.inactiveBtn}>4</button>
              <button type="button" onClick={() => {setRockPosition(5)}} className={rockPosition === 5 ? classes.activeBtn : classes.inactiveBtn}>5</button>
              <button type="button" onClick={() => {setRockPosition(6)}} className={rockPosition === 6 ? classes.activeBtn : classes.inactiveBtn}>6</button>                
            </div>
          </Field>
          <Field label="Powerplay:" id="power-play">
            <div className={classes['btn-group']}>
              <button type="button" onClick={event=>setPowerPlay(-1)} className={powerPlay === -1 ? classes.activeBtn : classes.inactiveBtn}>&larr; Left</button>
              <button type="button" onClick={event=>setPowerPlay(0)} className={powerPlay === 0 ? classes.activeBtn : classes.inactiveBtn}>Center</button>
              <button type="button" onClick={event=>setPowerPlay(1)} className={powerPlay === 1 ? classes.activeBtn : classes.inactiveBtn}>Right &rarr;</button>
            </div>
          </Field>
      </>)}
      <Field label="">
        <div className={classes['btn-group']}>
          <button type="submit" className={classes.btnPrimary}>Submit</button> 
          <button type="button" onClick={props.onClose} className={classes.btn}>Cancel</button>
        </div>
      </Field>
    </form>
    </div>
  </>);
}
export default StoneSetup;