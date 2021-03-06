import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sheet from "../components/sheet/Sheet";
import classes from './Board.module.css';
import ConfigureSheet from "../components/sheet/ConfigureSheet";

import { stonesActions } from "../store/stones-slice";
import LocalStorageManager from "../components/scenario/LocalStorageManager";
import Situation from "../components/scenario/Situation";
import SheetHistory from "../components/sheet/SheetHistory";

const Board = () => {
    let params = useParams();
    const sheet  = useSelector(state => state.sheet);
    const dispatch = useDispatch();
    const [tab, setTab] = useState('comment');
    const [id, setId] = useState(params.id);
    const [scene, setScene] = useState({
        hammer: 'red',
        weAre: 'red',
    });
    const [status, setStatus] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useEffect(BOARD)', params.id);
        setId(params.id);
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

    /*const moveStoneHandler = useCallback((id, x, y) => {
        console.log('Moving: '+ id + ' to : ', x ,y);
        dispatch(stonesActions.moveStone({id, x, y}));
    }, [dispatch]);*/

    const switchTab = (event, tab) => {
        event.preventDefault();
        setTab(tab);
    }

    if(status === 'loading')
        return <p>Loading...</p>;

    return (<>
        <div className={classes.sheet} style={{marginRight: '2rem'}}>
            <SheetHistory onInitStones={(newScene) => {setScene(newScene); navigate('/board') }} />
            <Sheet />
        </div>
        <div className={classes.config}>
            <ul className={classes.tabs}>
                <li><button onClick={event => switchTab(event, 'comment')} className={ tab === 'comment' ? classes.active : '' }>Comments</button></li>
                <li><button onClick={event => switchTab(event, 'conf')} className={ tab === 'conf' ? classes.active : '' }>Configure sheet</button></li>
            </ul>
            { tab === 'conf' && <ConfigureSheet /> }
            { tab === 'comment' && (
                <Situation id={id} init={scene} team1={sheet.team1color} team2={sheet.team2color} />
                
            )}
            <LocalStorageManager />
        </div>
    </>);
}
export default Board;