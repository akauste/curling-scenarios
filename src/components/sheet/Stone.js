import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

import ShadowStone from "./ShadowStone";

const Stone = props => {
    const {x, y, id} = props.stone;
    const colors = [ useSelector(state => state.sheet.team1color), useSelector(state => state.sheet.team2color) ];
    const color = colors[props.stone.team - 1];
    const stones = useSelector(state => state.stones.stones);
    const sheetWidth = useSelector(state => state.sheet.width);
    const otherStones = Object.values(stones).filter(s => s.id !== id);

    // Stone must receive the coordinate calculation function based on the sheet config somehow
    // Stone itself should have position, that is no relative to that, maybe having origo at tee?

    const createShadow = event => {
      event.preventDefault();
      props.stone.prevPosition = { ...props.stone };
    };

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
        const scale = sheetWidth / props.containerRef.current.offsetWidth;
        const dragStartX = props.stone.prevPosition ? props.stone.prevPosition.x : x;
        const dragStartY = props.stone.prevPosition ? props.stone.prevPosition.y : y;
        if(!diff) return <div />;
        let newX = x + diff.x * scale;
        let newY = y + diff.y * scale;
        const overlaps = otherStones.filter(ot => isOverlap(ot.x, ot.y, newX, newY));
        if(overlaps.length) {
          console.log('Found overlaps: ', overlaps);
          for (const other of overlaps) {
            [newX, newY] = clearOverlaps(newX, newY, other);
          }
          if(!newX) {
            console.log('fucked here!');
            newX=0;
          }
          if(!newY) {
            console.log('fucked here Y!');
            newY=0;
          }
        }

        return (
          <g>
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
                <circle cx={ x } cy={ y } r="14.4" stroke="#666666" strokeWidth="1" fill="#cccccc"></circle>
                <circle cx={ x } cy={ y } r="10" stroke="#666666" strokeWidth="0.25" fill={ color }></circle>
            </g>
            {diff && (
              <g>
                <circle cx={ newX } cy={ newY } r="14.4" stroke="#666666" strokeWidth="1" fill="#999999"></circle>
                <circle cx={ newX } cy={ newY } r="10" stroke="#666666" strokeWidth="0.25" fill={ color }></circle>
              </g>
            )}
          </g>
        );
    }
    if(!props.stone.visible)
        return (<></>);
    return (
        <g ref={drag} onDoubleClick={createShadow}>
            { props.stone.prevPosition && <ShadowStone currentX={x} currentY={y} stone={props.stone.prevPosition} /> }
            <circle cx={ x } cy={ y } r="14.4" stroke="#666666" strokeWidth="1" fill="#999999"></circle>
            <circle cx={ x } cy={ y } r="10" stroke="#666666" strokeWidth="0.25" fill={ color }></circle>
        </g>
    );
};
export default Stone;