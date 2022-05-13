//import logo from '../logo.svg';

// import { useEffect } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DisplaySheet from "../components/sheet/DisplaySheet";
import Card from "../components/UI/Card";

// const sheets = [];

const Home = () => {
  // const [sh, setSh] = useState(sheets);
  // useEffect(() => {
  //   for(let i = 1; i++; i < 2) {
  //     sheets.push(i);
  //   }
  // }, []);
  const [scenarios, setScenarios] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const res =  await fetch('http://localhost:3001/scenarios', {mode: 'cors'});
      const data = await res.json();
      console.log('Got data: ', data);
      setScenarios(data);
    };
    getData();
  }, [setScenarios]);
  
  return (<>
    <h1>Welcome</h1>
    <p>This app has set of tools for curling coaching.</p>

    <div style={{display: 'flex', flexWrap: "wrap"}}>
      { scenarios && scenarios.map(row => <Card key={row.id}>
        <DisplaySheet 
          sheet={ row.data.sheet }
          stones={ row.data.stones }
          direction={ row.data.direction }
        />
        <div style={{marginLeft: '0.5rem'}}>
          <h3>{row.title}</h3>
          <div>End: {row.end}</div>
          <div>Ends remaining: {row.ends_left}</div>
          <div>Score: {row.score_diff}</div>
          <div>Hammer: {row.hammer}</div>

          <h4>Options</h4>
          <div><button onClick={event => {navigate('/board/'+row.id)}}>Show</button> {row.option}</div>
        </div>
      </Card>) }
    </div>

    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Card>
        <DisplaySheet sheet={{width:475,buttonRadius:22.5,backgap:50,frontgap:40,ring12color:'blue',ring4color:'red',team1color:'red',team2color:'yellow'}} 
          stones={[
            {id:'r1', x:0, y:-20, color:'red',visible:true},
            {id:'y1', x:12, y:+50, color:'yellow',visible:true}

          ]} direction={1}></DisplaySheet>
      </Card>
      <Card>
        <DisplaySheet sheet={{width:475,buttonRadius:22.5,backgap:50,frontgap:40,ring12color:'blue',ring4color:'red',team1color:'red',team2color:'yellow'}} stones={[]} direction={1}></DisplaySheet>
      </Card>
      <Card>
        <DisplaySheet sheet={{width:475,buttonRadius:22.5,backgap:50,frontgap:40,ring12color:'blue',ring4color:'red',team1color:'red',team2color:'yellow'}} stones={[]} direction={1}></DisplaySheet>
      </Card>
      <Card>
        <DisplaySheet sheet={{width:475,buttonRadius:22.5,backgap:50,frontgap:40,ring12color:'blue',ring4color:'red',team1color:'red',team2color:'yellow'}} stones={[]} direction={-1}></DisplaySheet>
      </Card>
      <Card>
        <DisplaySheet sheet={{width:475,buttonRadius:22.5,backgap:50,frontgap:40,ring12color:'blue',ring4color:'red',team1color:'red',team2color:'yellow'}} stones={[]} direction={1}></DisplaySheet>
      </Card>
      <Card>
        <DisplaySheet sheet={{width:475,buttonRadius:22.5,backgap:50,frontgap:40,ring12color:'blue',ring4color:'red',team1color:'red',team2color:'yellow'}} stones={[]} direction={-1}></DisplaySheet>
      </Card>
      <Card>
        <DisplaySheet sheet={{width:475,buttonRadius:22.5,backgap:50,frontgap:40,ring12color:'blue',ring4color:'red',team1color:'red',team2color:'yellow'}} stones={[]} direction={1}></DisplaySheet>
      </Card>
    </div>    

    {/* { sheets.map(s => <Card key={s}>
      <DisplaySheet sheet={{width:475,buttonRadius:22.5,backgap:50,frontgap:40,ring12color:'blue',ring4color:'red',team1color:'red',team2color:'yellow'}} stones={[]} direction={1}></DisplaySheet>
    </Card>)} */}

          {/* <svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
            <path d="M 10 80 Q 75 10 180 80" stroke="black" fill="transparent"/>
            <line x1="10" y1="80"  x2="75" y2="10" stroke="red" />
            <line x1="180" y1="80" x2="75" y2="10" stroke="red" />
        </svg> */}

        {/* <svg height="400" width="450">
  <path id="lineAB" d="M 100 350 l 150 -300" stroke="red"
  stroke-width="3" fill="none" />
  <path id="lineBC" d="M 250 50 l 150 300" stroke="red"
  stroke-width="3" fill="none" />
  <path d="M 175 200 l 150 0" stroke="green" stroke-width="3"
  fill="none" />
  <path d="M 0 200 q 100 -100 450 0" stroke="blue"
  stroke-width="5" fill="none" />
  
  <g stroke="black" stroke-width="3" fill="black">
    <circle id="pointA" cx="100" cy="350" r="3" />
    <circle id="pointB" cx="250" cy="50" r="3" />
    <circle id="pointC" cx="400" cy="350" r="3" />
  </g>
  
  <g font-size="30" font-family="sans-serif" fill="black" stroke="none"
  text-anchor="middle">
    <text x="100" y="350" dx="-30">A</text>
    <text x="250" y="50" dy="-10">B</text>
    <text x="400" y="350" dx="30">C</text>
  </g>
</svg>  */}
        
    </>);
}
export default Home;