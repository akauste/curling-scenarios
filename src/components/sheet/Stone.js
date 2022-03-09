import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

import ShadowStone from "./ShadowStone";

const Stone = props => {
    const {x, y} = props.stone;
    const colors = [ useSelector(state => state.sheet.team1color), useSelector(state => state.sheet.team2color) ];
    const color = colors[props.stone.team - 1];

    // Stone must receive the coordinate calculation function based on the sheet config somehow
    // Stone itself should have position, that is no relative to that, maybe having origo at tee?

    const createShadow = event => {
      event.preventDefault();
      props.stone.prevPosition = { ...props.stone };
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
        const scale = 475 / props.containerRef.current.offsetWidth;
        const dragStartX = props.stone.prevPosition ? props.stone.prevPosition.x : x;
        const dragStartY = props.stone.prevPosition ? props.stone.prevPosition.y : y;
        return (
          <g>
            {diff && (
              <line
                x1={dragStartX} x2={x + diff.x * scale}
                y1={dragStartY} y2={y + diff.y * scale}
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
                <circle cx={ x + diff.x * scale } cy={ y + diff.y * scale } r="14.4" stroke="#666666" strokeWidth="1" fill="#999999"></circle>
                <circle cx={ x + diff.x * scale } cy={ y + diff.y * scale } r="10" stroke="#666666" strokeWidth="0.25" fill={ color }></circle>
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