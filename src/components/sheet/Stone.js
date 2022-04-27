import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { stonesActions } from "../../store/stones-slice";

import ShadowStone from "./ShadowStone";

const Stone = props => {
    const {x, y, id} = props.stone;
    const colors = [ useSelector(state => state.sheet.team1color), useSelector(state => state.sheet.team2color) ];
    const direction = useSelector(state => state.stones.direction);
    const color = colors[props.stone.team - 1];
    const stones = useSelector(state => state.stones.stones);
    const sheetWidth = useSelector(state => state.sheet.width);
    const otherStones = Object.values(stones).filter(s => s.id !== id);
    const dispatch = useDispatch();

    let clickCount = 0;
    const clickHandler = event => {
      clickCount += 1;
        setTimeout(() => {
          if (clickCount === 1) {
            //console.log('single click: ', count);
            toggleContextMenu(event);
          } else if (clickCount === 2) {
            //console.log('setTimeout onDoubleClick: ', count);
            createShadow(event);
          }
          clickCount = 0;
      }, 300);
    }

    const toggleContextMenu = event => {
      props.showContextMenu(event, props.stone);
    }

    // Stone must receive the coordinate calculation function based on the sheet config somehow
    // Stone itself should have position, that is no relative to that, maybe having origo at tee?
    
    const createShadow = event => {
      event.preventDefault();
      dispatch(stonesActions.addStonePrevPosition({id}));
    }

    const diameter = 28.8;
    const isOverlap = (x1, y1, x2, y2) => {
      const dX = Math.abs(x1 - x2);
      const dY = Math.abs(y1-y2);
      if(dX > diameter || dY > diameter || Math.sqrt(dX*dX+dY*dY) > diameter)
        return false;
      return true;
    };
    const clearOverlaps = (x,y, other) => {
      const diffX = Math.abs(x-other.x);
      const diffY = Math.abs(y-other.y);
      if(diffX > diffY) {
        const x1 = (x < other.x) ? other.x - Math.sqrt(diameter**2 - diffY**2)
                                 : other.x + Math.sqrt(diameter**2 - diffY**2);
        return [x1, y];
      }
      const y1 = (y < other.y) ? other.y - Math.sqrt(diameter**2 - diffX**2)
                               : other.y + Math.sqrt(diameter**2 - diffX**2);
      return [x, y1];
    };
    const getRadius = y => {
      if (direction === 1)
        return y < -(183+30) || y > 655 ? 8 : 14.4;
      return y > (183+30) || y < -655 ? 8 : 14.4;
    } 
    const [{ isDragging, diff }, drag] = useDrag(
        () => ({
          type: 'stone',
          item: { id: props.id, stone: props.stone },
          collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            diff: monitor.getDifferenceFromInitialOffset()
          })
        }),
        [props.id, props.stone]
      );

      if (isDragging) { //  && hideSourceOnDrag
        const scale = sheetWidth / props.containerRef.current.clientWidth;
        const dragStartX = props.stone.prevPosition ? props.stone.prevPosition.x : x;
        const dragStartY = props.stone.prevPosition ? props.stone.prevPosition.y : y;
        if(!diff) return <div />;
        let newX = x + diff.x * scale;
        let newY = y + diff.y * scale;
        const overlaps = otherStones.filter(ot => isOverlap(ot.x, ot.y, newX, newY));
        if(overlaps.length) {
          console.log('Found overlaps: ', overlaps.length, overlaps);
          for (const other of overlaps) {
            [newX, newY] = clearOverlaps(newX, newY, other);
          }
          if(!newX) {
            console.log('newX not here!');
            newX=0;
          }
          if(!newY) {
            console.log('newY not here!');
            newY=0;
          }
        }
        const r = getRadius(y);

        return (
          <g>
            {newY < 30 && <rect width={sheetWidth} height={30} fill='none' stroke='silver' strokeWidth={0.5} /> }
            {diff && (
              <line
                x1={dragStartX} x2={newX}
                y1={dragStartY} y2={newY}
                stroke="black"
                strokeWidth={1}
                strokeDasharray='5,5'
              />
            )}
            <g opacity={0.4}>
                { props.stone.prevPosition && <ShadowStone currentX={x} currentY={y} stone={props.stone.prevPosition} /> }
                <circle cx={ x } cy={ y } r={r} stroke="#666666" strokeWidth="1" fill="#cccccc"></circle>
                <circle cx={ x } cy={ y } r={r*0.69} stroke="#666666" strokeWidth="0.25" fill={ color }></circle>
            </g>
            {diff && (
              <g>
                <circle cx={ newX } cy={ newY } r={14.4} stroke="#666666" strokeWidth="1" fill="#999999"></circle>
                <circle cx={ newX } cy={ newY } r={14.4*0.69} stroke="#666666" strokeWidth="0.25" fill={ color }></circle>
              </g>
            )}
          </g>
        );
    }
    if(!props.stone.visible)
        return (<></>);

    const r = getRadius(y);
    return (
        <g ref={drag} onClick={clickHandler}>
            { props.stone.prevPosition && <ShadowStone currentX={x} currentY={y} stone={props.stone.prevPosition} /> }
            <circle cx={ x } cy={ y } r={r} stroke="#666666" strokeWidth="1" fill="#999999"></circle>
            <circle cx={ x } cy={ y } r={r*0.69} stroke="#666666" strokeWidth="0.25" fill={ color }></circle>
        </g>
    );
};
export default Stone;