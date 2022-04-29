import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sheetActions } from "../../store/sheet-slice";
import ColorSelector from "../UI/ColorSelector";

const ConfigureSheet = () => {
  const dispatch = useDispatch(sheetActions);
  const sheet = useSelector(state => state.sheet);
  const widthRef = useRef();
  const buttonRadiusRef = useRef();
  const backgapRef = useRef();
  const frontgapRef = useRef();
  const team1colorRef = useRef();
  const team2colorRef = useRef();
  const ring12colorRef = useRef();
  const ring4colorRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(sheetActions.setWidth(+widthRef.current.value));
    dispatch(sheetActions.setButtonRadius(+buttonRadiusRef.current.value));
    dispatch(sheetActions.setBackgap(+backgapRef.current.value));
    dispatch(sheetActions.setFrontgap(+frontgapRef.current.value));
    dispatch(sheetActions.setTeam1Color(team1colorRef.current.value));
    dispatch(sheetActions.setTeam2Color(team2colorRef.current.value));
    dispatch(sheetActions.set12Color(ring12colorRef.current.value));
    dispatch(sheetActions.set4Color(ring4colorRef.current.value));
  };
  const saveHandler = event => {
    submitHandler(event);
    dispatch(sheetActions.saveLocal());
  }

  return (
    <form onSubmit={submitHandler}>
      <h2>Configure sheet properties</h2>
      <div className="field">
        <label>Sheet width:</label>
        <input type="text" defaultValue={sheet.width} ref={widthRef} />
      </div>
      <div className="field">
        <label>Button radius:</label>
        <select defaultValue={sheet.buttonRadius} ref={buttonRadiusRef}>
          <option value={15}>15</option>
          <option value={22.5}>22.5</option>
          <option value={30}>30</option>
        </select>
      </div>
      <div className="field">
        <label>Backgap:</label>
        <select defaultValue={sheet.backgap} ref={backgapRef}>
          <option value={60}>60 cm</option>
          <option value={90}>90 cm</option>
          <option value={120}>120 cm</option>
          <option value={180}>180 cm</option>
        </select>
        </div>
      <div className="field">      
        <label>Frontgap:</label>
        <select defaultValue={sheet.frontgap} ref={frontgapRef}>
          <option value={0}>0 cm</option>
          <option value={40}>40 cm</option>
        </select>
      </div>
      <ColorSelector label="First stone color" value={sheet.team1color} ref={team1colorRef} />
      <ColorSelector label="Second stone color" value={sheet.team2color} ref={team2colorRef} />
      <ColorSelector label="12-foot ring color" value={sheet.ring12color} ref={ring12colorRef} />
      <ColorSelector label="4-foot ring color" value={sheet.ring4color} ref={ring4colorRef} />
      
      {/* <div className="field">
        <label>Second stone color:</label>
        <select defaultValue={sheet.team2color} ref={team2colorRef}>
          <option value='red'>Red</option>
          <option value='yellow'>Yellow</option>
          <option value='blue'>Blue</option>
          <option value='green'>Green</option>
          <option value='black'>Black</option>
          <option value='white'>White</option>
        </select>
      </div> */}
      {/* <div className="field"> */}
        {/* <label>12-foot ring color:</label>
        <select defaultValue={sheet.ring12color} ref={ring12colorRef}>
          <option value='red'>Red</option>
          <option value='yellow'>Yellow</option>
          <option value='blue'>Blue</option>
          <option value='green'>Green</option>
          <option value='black'>Black</option>
          <option value='gray'>Gray</option>
          <option value='silver'>Silver</option>
          <option value='white'>White</option>
        </select>
      </div>
      <div className="field">
        <label>4-foot ring color:</label>
        <select defaultValue={sheet.ring4color} ref={ring4colorRef}>
          <option value='red'>Red</option>
          <option value='yellow'>Yellow</option>
          <option value='blue'>Blue</option>
          <option value='green'>Green</option>
          <option value='black'>Black</option>
          <option value='gray'>Gray</option>
          <option value='silver'>Silver</option>
          <option value='white'>White</option>
        </select>
      </div> */}
      <button type="submit">Use</button>
      <button type="button" onClick={saveHandler}>Save</button>
    </form>
  );
};

export default ConfigureSheet;