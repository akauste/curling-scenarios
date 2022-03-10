import { useRef, useState } from "react";
import Sheet from "../components/sheet/Sheet";
import classes from './Board.module.css';
import ConfigureSheet from "../components/sheet/ConfigureSheet";
import StoneSetup from "../components/sheet/StoneSetup";

const DUMMY_STONES = {};
let posX = 1;
let posY = 1;
for(let i=1; i < 9; i++) {
    const sideDist = posX*30;
    const y = -15+30*posY;

    DUMMY_STONES['r'+i] = { x: 30+sideDist, y: y, id:'r'+i, type: 'stone', visible: true, num: i, team: 1 };
    DUMMY_STONES['y'+i] = { x: 445-sideDist, y: y, id:'y'+i, type: 'stone', visible: true, num: i, team: 2 };
    posX++;
    if(posX > 4) {
        posX = 1;
        posY++;
    }
};

const Board = () => {
    const sheetContainerRef = useRef();
    const [stones, updateStones] = useState(DUMMY_STONES);
    const [tab, setTab] = useState('init');

    const moveStoneHandler = (id, x, y) => {
        console.log('Moving: '+ id + ' to : ', x ,y);
        updateStones(stones => {
            return Object.keys(stones).map(k => {
                return stones[k].id === id ? { ...stones[k], x, y } : { ...stones[k] }
            });
        });
    };    

    const switchTab = (event, tab) => {
        event.preventDefault();
        setTab(tab);
    }

    return (<>
        <div className={classes.sheet}>
            <Sheet containerRef={sheetContainerRef} stones={stones} updateStones={updateStones} onMoveStone={moveStoneHandler} />
        </div>
        <div className={classes.config}>
            <p>Tactic board: [Menu] [Conf...]</p>
            <ul className={classes.tabs}>
                <li><button onClick={(event) => switchTab(event, 'init')} className={ tab === 'init' ? classes.active : '' }>Initial setup</button></li>
                <li><button onClick={(event) => switchTab(event, 'comment')} className={ tab === 'comment' ? classes.active : '' }>Comments</button></li>
                <li><button onClick={(event) => switchTab(event, 'conf')} className={ tab === 'conf' ? classes.active : '' }>Configure sheet</button></li>
            </ul>
            { tab === 'conf' && <ConfigureSheet /> }
            { tab === 'init' && <StoneSetup stones={stones} updateStones={updateStones} moveStoneHandler={moveStoneHandler} /> }
            { tab === 'comment' && (
            <form>
                <div className="field">
                    <label>Title</label>
                    <input type="text" placeholder="Give a title for the situation" />
                </div>
                <div className="field">
                    <label>Comments</label>
                    <textarea rows={5} />
                </div>
                <div className="field">
                    <label>Add photo</label>
                    <input type="file" />
                </div>
            </form>
            )}
        </div>
    </>);
}
export default Board;