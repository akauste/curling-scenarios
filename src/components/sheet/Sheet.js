import { useRef, useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";

import Stone from "./Stone";

const Sheet = (props) => {
    const { stones, onMoveStone } = props;
    const sheet = useSelector(state => state.sheet);
    
    const svgRef = useRef();

    const moveStone = useCallback(
      (id, x, y) => {
        onMoveStone(id, x, y);
      },
      [onMoveStone]
    );

    const [, drop] = useDrop(
        () => ({
          accept: 'stone',
          drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            const x = Math.round(
              item.stone.x + delta.x * (sheet.width / svgRef.current.offsetWidth)
            );
            const y = Math.round(
              item.stone.y + delta.y * (sheet.width / svgRef.current.offsetWidth)
            );
            moveStone(item.stone.id, x, y);
            return undefined;
          }
        }),
        [moveStone]
    );

    const viewBox = `0 0 ${sheet.width} ${ sheet.backgap + 183 + 640 + sheet.frontgap }`;
    console.log('ViewBox: '+ viewBox);

    // Create doubles markings:
    const doublesY = sheet.backgap+183*2+228.6;
    const doublesX = sheet.width/2;
    const doublesMarking = [];
    for(let x=-1; x < 2; x++) {
      for(let y=-1; y < 2; y++) {
        doublesMarking.push(<circle key={`dm${x}${y}`} cx={ doublesX+x*107-(x*(y)*2)} cy={doublesY+y*91.4} r={1} stroke='#333' fill='silver' strokeWidth='1' />);
        //[backgap+183*2+228.6-91.4,])
      }
    }
    //backgap+183*2+228.6-91.4

    return (<div  ref={svgRef}>
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

    { doublesMarking.map(i => i) }

    {/* <!-- // Test displaying shades, that represent what is behind guards //-->
     <!-- // Move away, when works // -->
    <g ng-repeat="stone in $ctrl.stones | limitDisplay:$ctrl.visualize.display_stone">
        <g stoneshade ng-init="stone=stone"></g>
    </g> */}
    { Object.keys(stones).map((stone) => {
        return <Stone key={ stone } stone={stones[stone]} containerRef={svgRef} />;
    }) }
    { props.children }

        Sorry, your browser does not support inline SVG.
    </svg></div>);
};
export default Sheet;