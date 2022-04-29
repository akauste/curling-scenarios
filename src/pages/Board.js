import { useCallback, useRef, useState } from "react";
import Sheet from "../components/sheet/Sheet";
import classes from './Board.module.css';
import ConfigureSheet from "../components/sheet/ConfigureSheet";
import StoneSetup from "../components/sheet/StoneSetup";
import { useDispatch, useSelector } from "react-redux";
import { stonesActions } from "../store/stones-slice";
import LocalStorageManager from "../components/scenario/LocalStorageManager";

const Board = () => {
    const stones = useSelector(state => state.stones);
    const hasHistoryBack    = useSelector(state => state.stones.historyBack.length);
    const hasHistoryForward = useSelector(state => state.stones.historyForward.length);
    const dispatch = useDispatch();
    const [tab, setTab] = useState('init');
    const titleRef = useRef();
    const commentRef = useRef();

    const moveStoneHandler = useCallback((id, x, y) => {
        console.log('Moving: '+ id + ' to : ', x ,y);
        dispatch(stonesActions.moveStone({id, x, y}));
    }, [dispatch]);

    const switchTab = (event, tab) => {
        event.preventDefault();
        setTab(tab);
    }

    const localSaveHandler = () => {
        const maxId = +(localStorage.getItem('maxScenarioId') || 1);
        localStorage.setItem('scenario-'+ maxId, JSON.stringify({
            scenarioId: maxId,
            direction: stones.direction,
            stones: stones.stones,
            title: titleRef.current.value,
            comment: commentRef.current.value,
        }));
        localStorage.setItem('maxScenarioId', maxId+1);
    };

    return (<>
        <div className={classes.sheet}>
            { hasHistoryBack ? <button className={classes.smallBtn} onClick={()=>{dispatch(stonesActions.back())}}>Back</button> : null }
            { hasHistoryForward ? <button className={`${classes.smallBtn} ${classes.pullRight}`} onClick={()=>{dispatch(stonesActions.forward())}}>Forward</button> : null }
            <Sheet />
        </div>
        <div className={classes.config}>
            <p>Tactic board: [Menu] [Conf...]</p>
            <ul className={classes.tabs}>
                <li><button onClick={event => switchTab(event, 'init')} className={ tab === 'init' ? classes.active : '' }>Initial setup</button></li>
                <li><button onClick={event => switchTab(event, 'comment')} className={ tab === 'comment' ? classes.active : '' }>Comments</button></li>
                <li><button onClick={event => switchTab(event, 'conf')} className={ tab === 'conf' ? classes.active : '' }>Configure sheet</button></li>
            </ul>
            { tab === 'conf' && <ConfigureSheet /> }
            { tab === 'init' && <StoneSetup stones={stones} updateStones="{updateStones}" moveStoneHandler={moveStoneHandler} /> }
            { tab === 'comment' && (
            <form>
                <div className="field">
                    <label>Title</label>
                    <input type="text" placeholder="Give a title for the situation" ref={titleRef} required />
                </div>
                <div className="field">
                    <label>Comments</label>
                    <textarea rows={5} ref={commentRef} />
                </div>
                <div className="field">
                    <label>Add photo</label>
                    <input type="file" />
                </div>
                <button type="button" onClick={localSaveHandler}>Save locally</button>
            </form>
            )}
            <LocalStorageManager />
        </div>
    </>);
}
export default Board;