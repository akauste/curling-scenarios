import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Field from "../UI/Field";

const Situation = props => {
  const {team1, team2} = props;
  const [id, setId] = useState(props.init?.id || '');
  //const titleRef = useRef();
  const [title, setTitle] = useState(props.init?.title || '');
  const [weAre, setWeAre] = useState(team1);
  const [end, setEnd] = useState(props.init?.end || 1);
  const gameLengthRef = useRef();
  const [score, setScore] = useState(props.init?.score || '');
  const commentRef = useRef();
  const [status, setStatus] = useState(props.init?.id || 'new');

  const sheet = useSelector(state => state.sheet);
  const stones = useSelector(state => state.stones);

  const endsRemaining = () => {
    return gameLengthRef.current.value - end +1;
  };

  const saveToServer = async () => {
    console.log('Saving to server');
    setStatus('saving');
    const method = id ? 'PATCH' : 'PUT';

    const res = await fetch('http://localhost:3001/scenario', {
        method: method,
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: id,
            title: title, // titleRef.current.value,
            end: end,
            format: stones.gameMode,
            ends_left: endsRemaining(),
            score_diff: score,
            owner: null,
            data: {
                 direction: stones.direction,
                 stones: stones.stones,
                 sheet: sheet
            }
        })
    });
    if(res.ok) {
        setStatus('saved');
        const data = await res.json();
        console.log(data);
        setId(data.id);
    }
    else {
        setStatus('error');
        console.error(res.error);
    }
  }
  const deleteFromServer = async (event) => {
    event.preventDefault();
    setStatus('saving');
    const res = await fetch('http://localhost:3001/scenario/'+ id, {method: 'DELETE', mode: 'cors'});
    if(res.ok) {
      setId(null);
      setStatus('deleted');
    }
    else {
      setStatus('error');
    }
  }

  const localSaveHandler = () => {
    const maxId = +(localStorage.getItem('maxScenarioId') || 1);
    localStorage.setItem('scenario-'+ maxId, JSON.stringify({
        scenarioId: maxId,
        // direction: stones.direction,
        // stones: stones.stones,
        //title: titleRef.current.value,
        title: title,
        comment: commentRef.current.value,
    }));
    localStorage.setItem('maxScenarioId', maxId+1);
  };


  return (<form>
    { status === 'saving' && <p>spinner - Saving...</p> }
    { status === 'saved' && <p>Saved</p> }
    { status === 'error' && <p>Saving failed</p> }
    { id && <Field label="ID"><p>{ id }</p></Field> }
    <Field label="Title">
      <input type="text" placeholder="Give a title for the situation" value={title} onChange={event => setTitle(event.target.value)} required />
    </Field>
    <Field label="We are">
      <select value={weAre} onChange={event=>setWeAre(event.target.value)} style={{width: '5em'}}>
        <option>{ team1 }</option>
        <option>{ team2 }</option>
      </select>
      { weAre === stones.hammer ? <i>and we have the hammer</i> : <b>and we don't have hammer</b> }
    </Field>
    <Field label="Hammer">
      { stones.hammer }
    </Field>
    <Field label="End #" id="end">
      { end === null && <>undefined <button type="button" onClick={event=>setEnd(1)}>Set</button></> }
      { end !== null && <span className="input-group"><input id="end" value={end} onChange={event=>setEnd(+event.target.value)} type="number" min={0} max={12} />
      <button type="button" onClick={event=>setEnd(null)}>Clear</button></span> }
    </Field>
    <Field label="Game length" id="gamelen">
      <input id="gamelen" ref={gameLengthRef} type="number" defaultValue={8} min={1} max={10} />
    </Field>
    <Field label="Score difference" id="score">
      { end === 1 && 'is even in the first end' }
      { end !== 1 && (
        <div className="input-group">
          <input id="score" value={score} onChange={event=>setScore(event.target.value)} type="number" defaultValue={0} />
          <span style={{width: '7em'}}>{ score > 0 ? ' for us' : score === 0 ? 'even' : ' points down' }</span>
        </div>)
      }
    </Field>
    <Field label="Comments">
      <textarea rows={5} ref={commentRef} />
    </Field>
    <Field label="Add photo">
      <input type="file" />
    </Field>
    <Field>
      <button type="button" className="btnPrimary" onClick={saveToServer}>Save</button>
      <button type="button" onClick={localSaveHandler}>Save locally</button>
      { id && <button type="button" onClick={deleteFromServer}>Delete</button> }
    </Field>
  </form>);
};
export default Situation;