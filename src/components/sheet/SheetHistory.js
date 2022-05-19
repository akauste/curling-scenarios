import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stonesActions } from "../../store/stones-slice";
import Overlay from "../UI/Overlay";
import classes from './SheetHistory.module.css';
import StoneSetup from "./StoneSetup";

const SheetHistory = () => {
  const hasHistoryBack    = useSelector(state => state.stones.historyBack.length);
  const hasHistoryForward = useSelector(state => state.stones.historyForward.length);

  const dispatch = useDispatch();

  const [overlay, setOverlay] = useState(null);
    const closeOverlay = event => {
      event.preventDefault();
      setOverlay(null);
  }

  const setInitialSheet = () => {
    setOverlay(<Overlay title={'Initialize tactic board'} closeHandler={closeOverlay}>
        <StoneSetup onClose={closeOverlay} />
    </Overlay>);
  };

  return <div>
    { overlay || null }
    <button className={classes.smallBtn} onClick={setInitialSheet}>New...</button>
    <button className={classes.smallBtn} onClick={() => {dispatch(stonesActions.swapDirection())}}>Swap &#8693;</button>
    <span style={{ float: "right" }}>
    { hasHistoryBack ? <button className={classes.smallBtn} onClick={()=>{dispatch(stonesActions.back())}}>Back</button> : null }
    { hasHistoryForward ? <button className={`${classes.smallBtn} ${classes.pullRight}`} onClick={()=>{dispatch(stonesActions.forward())}}>Forward</button> : null }
    </span>
  </div>;
};
export default SheetHistory;