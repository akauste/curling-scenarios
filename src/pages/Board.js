import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sheet from "../components/sheet/Sheet";
import classes from './Board.module.css';
import ConfigureSheet from "../components/sheet/ConfigureSheet";
import StoneSetup from "../components/sheet/StoneSetup";

import { stonesActions } from "../store/stones-slice";
import LocalStorageManager from "../components/scenario/LocalStorageManager";
import Overlay from "../components/UI/Overlay";
import Situation from "../components/scenario/Situation";

const Board = () => {
    let params = useParams();
    const stones = useSelector(state => state.stones);
    const hasHistoryBack    = useSelector(state => state.stones.historyBack.length);
    const hasHistoryForward = useSelector(state => state.stones.historyForward.length);
    const sheet             = useSelector(state => state.sheet);
    const dispatch = useDispatch();
    const [tab, setTab] = useState('comment');
    const [scene, setScene] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        const loadScenario = async (id) => {
            const res = await fetch('http://localhost:3001/scenario/'+id, {mode: 'cors'});
            const scenario = await res.json();
            setScene(scenario);
            console.log('Get scenario: ', scenario);
            dispatch(stonesActions.initialize({
                direction: scenario.data.direction,
                hammer: scenario.hammer,
                gameMode: scenario.format,
                stones: scenario.data.stones,
                powerPlay: scenario.powerPlay,
                rockPosition: scenario.rockPosition,
            }));
            // set the sheet as well... dispatch();
            setStatus('ready');
        };
        if(params.id) {
            setStatus('loading');
            try {
                loadScenario(params.id);
            }
            catch(err) {
                console.error(err);
            };
        }
    }, [dispatch, params]);

    const moveStoneHandler = useCallback((id, x, y) => {
        console.log('Moving: '+ id + ' to : ', x ,y);
        dispatch(stonesActions.moveStone({id, x, y}));
    }, [dispatch]);

    const switchTab = (event, tab) => {
        event.preventDefault();
        setTab(tab);
    }

    const [overlay, setOverlay] = useState(null);
    const closeOverlay = event => {
        event.preventDefault();
        setOverlay(null);
    }

    if(status === 'loading')
        return <p>Loading...</p>;

    const setInitialSheet = () => {
        setOverlay(<Overlay title={'Initialize tactic board'} closeHandler={closeOverlay}>
            <StoneSetup onClose={closeOverlay} stones={stones} updateStones="{updateStones}" moveStoneHandler={moveStoneHandler} />
        </Overlay>);
    }

    return (<>
        { overlay || null }
        <div className={classes.sheet} style={{marginRight: '2rem'}}>
            <div>
                <button className={classes.smallBtn} onClick={setInitialSheet}>New...</button>
                <button className={classes.smallBtn} onClick={() => {dispatch(stonesActions.swapDirection())}}>Swap &#8693;</button>
                <span style={{ float: "right" }}>
                { hasHistoryBack ? <button className={classes.smallBtn} onClick={()=>{dispatch(stonesActions.back())}}>Back</button> : null }
                { hasHistoryForward ? <button className={`${classes.smallBtn} ${classes.pullRight}`} onClick={()=>{dispatch(stonesActions.forward())}}>Forward</button> : null }
                </span>
            </div>
            <Sheet />
        </div>
        <div className={classes.config}>
            <ul className={classes.tabs}>
                <li><button onClick={event => switchTab(event, 'comment')} className={ tab === 'comment' ? classes.active : '' }>Comments</button></li>
                <li><button onClick={event => switchTab(event, 'conf')} className={ tab === 'conf' ? classes.active : '' }>Configure sheet</button></li>
            </ul>
            { tab === 'conf' && <ConfigureSheet /> }
            { tab === 'comment' && (
                <Situation init={scene} team1={sheet.team1color} team2={sheet.team2color} />
                
            )}
            <LocalStorageManager />
        </div>
    </>);
}
export default Board;