import { useState } from "react";
import { useDispatch } from "react-redux";
import { stonesActions } from "../../store/stones-slice";
import ContextMenu from "../UI/ContextMenu";

const ShadowStone = props => {
  const {id, x, y} = props.stone;
  const [menu, setMenu] = useState(null);
  const dispatch = useDispatch();

  const showMenu = event => {
    event.preventDefault();
    setMenu({x: event.clientX, y: event.clientY});
  }

  const removeShadow = event => {
    event.preventDefault();
    setMenu(null);
    dispatch(stonesActions.removeStonePrevPosition({id, x, y}));
  }

  return (<g>
      <line
        x1={props.currentX} x2={x}
        y1={props.currentY} y2={y}
        stroke="black"
        strokeWidth={1}
        strokeDasharray='5,5'
      />
      <circle cx={ x } cy={ y } r="14.4" stroke="#666666" strokeWidth="2" fill="transparent" onClick={showMenu}></circle>
      { props.stone.prevPosition && <ShadowStone currentX={x} currentY={y} stone={props.stone.prevPosition} /> }
      { menu && <ContextMenu x={menu.x} y={menu.y}>
        <li><button onClick={removeShadow}>Remove this</button></li>
      </ContextMenu> }
    </g>);
};
export default ShadowStone;