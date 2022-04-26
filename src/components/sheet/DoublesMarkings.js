const DoublesMarkings = props => {
  // Create doubles markings:
  const doublesY = 183+228.6;
  const doublesX = 0;
  const doublesMarking = [];
  for(let x=-1; x < 2; x++) {
    for(let y=-1; y < 2; y++) {
      doublesMarking.push(<circle key={`dm${x}${y}`} cx={ doublesX+x*107-(x*(y)*2)} cy={doublesY+y*91.4} r={1} stroke='#393' fill='silver' strokeWidth='1' />);
      //[backgap+183*2+228.6-91.4,])
    }
  }

  return (<g id="doubles-markings">
    { doublesMarking.map(i => i) }
  </g>);
}

export default DoublesMarkings;