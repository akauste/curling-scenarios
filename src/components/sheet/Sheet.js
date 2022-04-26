import { useRef, useCallback } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { stonesActions } from "../../store/stones-slice";
import DoublesMarkings from "./DoublesMarkings";

import Stone from "./Stone";

const Sheet = (props) => {
    //const { stones, onMoveStone } = props;
    const { onMoveStone } = props;
    const stones = useSelector(state => state.stones.stones);
    const sheet = useSelector(state => state.sheet);
    const dispatch = useDispatch();
    
    const svgRef = useRef();

    const moveStone = useCallback(
      (id, x, y) => {
        onMoveStone(id, x, y);
      },
      [onMoveStone]
    );

    const [{isOver, isOverShallow, canDrop}, drop] = useDrop(
        () => ({
          accept: 'stone',
          collect: (monitor) => ({
            isOver: monitor.isOver({shallow: false}),
            isOverShallow: monitor.isOver({shallow: true}),
            canDrop: monitor.canDrop(),
          }),
          drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            let x = Math.round(
              item.stone.x + delta.x * (sheet.width / svgRef.current.clientWidth)
            );
            let y = Math.round(
              item.stone.y + delta.y * (sheet.width / svgRef.current.clientWidth)
            );
            // If stone is in corner, move it to orig position, scaled to small
            if(y < 30) {
              x = item.stone.team === 1 ? 30 + item.stone.num * 16 : 430 - item.stone.num * 16;
              y = 8;

            }
            
            dispatch(stonesActions.moveStone({id: item.stone.id, x, y}));
            return undefined;
          }
        }),
        [moveStone]
    );

    const viewBox = `0 0 ${sheet.width} ${ sheet.backgap + 183 + 640 + sheet.frontgap }`;
    console.log('ViewBox: '+ viewBox);

    return (<div ref={svgRef} style={{marginRight: '2em'}}>
        <svg ref={drop} viewBox={viewBox} className="sheet-image" style={{border: '1px solid silver', float: 'right'}}
    xmlns="http://www.w3.org/2000/svg">
    <g id="sheet">
      <defs>
        <filter id="shadow1" x="0" y="0" width="120%" height="120%">
        <feOffset result="offOut" in="SourceGraphic" dx="-5" dy="-5"></feOffset>
        <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="1 1 1 1 1 1 1 1 1 1 1 1 01 1 1 1 1 1 1 1"></feColorMatrix>
        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10"></feGaussianBlur>
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
        </filter>
      </defs>
      <circle cx={ sheet.width/2 } cy={ sheet.backgap + 183 } r="183" stroke="black" strokeWidth="1" fill={sheet.ring12color}></circle>
      <circle cx={ sheet.width/2 } cy={ sheet.backgap + 183 } r="122" stroke="black" strokeWidth="1" fill="white"></circle>
      <circle cx={ sheet.width/2 } cy={ sheet.backgap + 183 } r="61" stroke="black" strokeWidth="1" fill={sheet.ring4color}></circle>
      <circle cx={ sheet.width/2 } cy={ sheet.backgap + 183 } r={ sheet.buttonRadius } stroke="black" strokeWidth="1" fill="white"></circle>
      <line x1={ sheet.width/2 } y1="0" x2={ sheet.width/2 } y2={ sheet.backgap + 823 } stroke="black" strokeWidth="1"></line>
      <line x1="0" y1={ sheet.backgap } x2={ sheet.width } y2={ sheet.backgap } stroke="black" strokeWidth="1"></line>
      <line x1="0" y1={ sheet.backgap + 183 } x2={ sheet.width } y2={ sheet.backgap + 183 } stroke="black" strokeWidth="1"></line>
      <line x1="0" y1={ sheet.backgap + 183 + 645 } x2={ sheet.width } y2={ sheet.backgap + 183 + 645 } stroke="gray" strokeWidth="10"></line>
    </g>
    
    <DoublesMarkings sheet={sheet} />

    {/* <g>
      <path d={`M ${sheet.width/2-122} ${sheet.backgap+183} Q ${sheet.width/2} ${sheet.backgap+183*1.5} ${sheet.width/2} ${sheet.backgap+183+640+2000}`} stroke="green" fill="transparent"/>
      <line x1="10" y1="80"  x2="75" y2="10" stroke="red" />
      <line x1="180" y1="80" x2="75" y2="10" stroke="red" />
      <path d={`M ${sheet.width/2} ${sheet.backgap+183} Q ${sheet.width/2-122} ${sheet.backgap+183*1.5} ${sheet.width/2} ${sheet.backgap+183+640+2000}`} stroke="black" fill="transparent"/>
      <path d={`M ${sheet.width/2} ${sheet.backgap+183} Q ${sheet.width/2+183} ${sheet.backgap+183*1.5} ${sheet.width/2} ${sheet.backgap+183+640+2000}`} stroke="silver" fill="transparent"/>
      <path d={`M ${sheet.width/2-14.4} ${sheet.backgap+183} Q ${sheet.width/2+183-14.4} ${sheet.backgap+183*1.5} ${sheet.width/2-14.4} ${sheet.backgap+183+640+2000}`} stroke="silver" fill="transparent"/>
    </g> */}

    {/* <!-- // Test displaying shades, that represent what is behind guards //-->
     <!-- // Move away, when works // -->
    <g ng-repeat="stone in $ctrl.stones | limitDisplay:$ctrl.visualize.display_stone">
        <g stoneshade ng-init="stone=stone"></g>
    </g> */}
    { Object.values(stones).map((stone) => {
        return <Stone key={ stone.id } stone={stone} containerRef={svgRef} />;
    }) }
    { props.children }

        Sorry, your browser does not support inline SVG.
    </svg></div>);
};
export default Sheet;