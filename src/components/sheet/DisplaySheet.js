import DoublesMarkings from "./DoublesMarkings";

import DisplayStone from "./DisplayStone";

const DisplaySheet = (props) => {
  const {sheet, stones, direction} = props;
  
  const displayStones = stones ? stones.map(s => ({...s, color: (s.color || sheet[`team${s.team}color`]) })) : [];

  const minY = direction === 1 ? -(sheet.backgap+183) : -(640 + sheet.frontgap);
  const viewBox = `${-sheet.width/2} ${minY} ${sheet.width} ${ sheet.backgap + 183 + 640 + sheet.frontgap }`;

  return (<svg viewBox={viewBox} style={{border: '1px solid silver', float: 'right'}}
      xmlns="http://www.w3.org/2000/svg" data-testid="displaysheet">
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

      { displayStones.map(stone => {
          return <DisplayStone key={ stone.id } stone={stone} />;
      }) }
      { props.children }

      Sorry, your browser does not support inline SVG.
    </svg>);
};
export default DisplaySheet;