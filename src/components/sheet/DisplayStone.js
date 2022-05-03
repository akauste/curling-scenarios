import ShadowStone from "./ShadowStone";

const DisplayStone = props => {
  const {x, y, id, color, direction} = props.stone;
  
  const getRadius = y => {
    if (direction === 1)
      return y < -(183+30) || y > 655 ? 8 : 14.4;
    return y > (183+30) || y < -655 ? 8 : 14.4;
  } 
  if(!props.stone.visible)
      return (<></>);

  const r = getRadius(y);
  return (
    <g>
      { props.stone.prevPosition && <ShadowStone currentX={x} currentY={y} stone={props.stone.prevPosition} /> }
      <g data-testid={`displaystone-${id}`}>
        <circle cx={ x } cy={ y } r={r} stroke="#666666" strokeWidth="1" fill="#999999"></circle>
        <circle cx={ x } cy={ y } r={r*0.69} stroke="#666666" strokeWidth="0.25" fill={ color }></circle>
      </g>
    </g>
  );
};
export default DisplayStone;