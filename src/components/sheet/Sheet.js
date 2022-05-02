import { useRef, useCallback } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { stonesActions } from "../../store/stones-slice";
import DoublesMarkings from "./DoublesMarkings";

import Stone from "./Stone";

const Sheet = (props) => {
    const stones = useSelector(state => state.stones.stones);
    const direction = useSelector(state => state.stones.direction);
    const sheet = useSelector(state => state.sheet);
    const dispatch = useDispatch();
    
    const svgRef = useRef();

    const getScale = () => (sheet.width / svgRef.current.clientWidth);

    const [, drop] = useDrop(
        () => ({
          accept: 'stone',
          drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            const scale = getScale();
            let x = Math.round( item.stone.x + delta.x * scale );
            let y = Math.round( item.stone.y + delta.y * scale );
            
            dispatch(stonesActions.moveStone({id: item.stone.id, x, y}));
            return undefined;
          }
        }),
        [stonesActions.moveStone]
    );

    const minY = direction === 1 ? -(sheet.backgap+183) : -(640 + sheet.frontgap);
    const viewBox = `${-sheet.width/2} ${minY} ${sheet.width} ${ sheet.backgap + 183 + 640 + sheet.frontgap }`;
    console.log('ViewBox: '+ viewBox);

    return (<div ref={svgRef}>
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
      <circle cx={ 0 } cy={ 0 } r="183" stroke="black" strokeWidth="1" fill={sheet.ring12color}></circle>
      <circle cx={ 0 } cy={ 0 } r="122" stroke="black" strokeWidth="1" fill="white"></circle>
      <circle cx={ 0 } cy={ 0 } r="61" stroke="black" strokeWidth="1" fill={sheet.ring4color}></circle>
      <circle cx={ 0 } cy={ 0 } r={ sheet.buttonRadius } stroke="black" strokeWidth="1" fill="white"></circle>
      <line x1={ 0 } x2={ 0 } y1={ -direction*(183 + sheet.backgap)} y2={ direction*(640+sheet.frontgap) } stroke="black" strokeWidth="1"></line>
      <line x1={-sheet.width/2} y1={ -direction*183 } x2={ sheet.width/2 } y2={ -direction*183 } stroke="black" strokeWidth="1"></line>
      <line x1={-sheet.width/2} y1={ 0 } x2={ sheet.width/2 } y2={ 0 } stroke="black" strokeWidth="1"></line>
      <line x1={-sheet.width/2} y1={ direction*645 } x2={ sheet.width/2 } y2={ direction*645 } stroke="gray" strokeWidth="10"></line>
    </g>
    
    <DoublesMarkings direction={direction} />

    {/* <g>
      <path d={`M ${sheet.width/2-122} ${sheet.backgap+183} Q ${sheet.width/2} ${sheet.backgap+183*1.5} ${sheet.width/2} ${sheet.backgap+183+640+2000}`} stroke="green" fill="transparent"/>
      <line x1="10" y1="80"  x2="75" y2="10" stroke="red" />
      <line x1="180" y1="80" x2="75" y2="10" stroke="red" />
      <path d={`M ${sheet.width/2} ${sheet.backgap+183} Q ${sheet.width/2-122} ${sheet.backgap+183*1.5} ${sheet.width/2} ${sheet.backgap+183+640+2000}`} stroke="black" fill="transparent"/>
      <path d={`M ${sheet.width/2} ${sheet.backgap+183} Q ${sheet.width/2+183} ${sheet.backgap+183*1.5} ${sheet.width/2} ${sheet.backgap+183+640+2000}`} stroke="silver" fill="transparent"/>
      <path d={`M ${sheet.width/2-14.4} ${sheet.backgap+183} Q ${sheet.width/2+183-14.4} ${sheet.backgap+183*1.5} ${sheet.width/2-14.4} ${sheet.backgap+183+640+2000}`} stroke="silver" fill="transparent"/>
    </g> */}

    { Object.values(stones).map((stone) => {
        return <Stone key={ stone.id } stone={stone} getScale={getScale} />;
    }) }
    { props.children }

        Sorry, your browser does not support inline SVG.
    </svg>
  </div>);
};
export default Sheet;