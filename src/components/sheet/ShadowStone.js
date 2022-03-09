const ShadowStone = props => {
return (<g>
      <line
        x1={props.currentX} x2={props.stone.x}
        y1={props.currentY} y2={props.stone.y}
        stroke="black"
        strokeWidth={1}
        strokeDasharray='5,5'
      />
      <circle cx={ props.stone.x } cy={ props.stone.y } r="14.4" stroke="#666666" strokeWidth="2" fill="none"></circle>
      { props.stone.prevPosition && <ShadowStone currentX={props.stone.x} currentY={props.stone.y} stone={props.stone.prevPosition} /> }
    </g>);
};
export default ShadowStone;