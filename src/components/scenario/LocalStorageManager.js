import { useState } from "react";
import { useDispatch } from "react-redux";
import { stonesActions } from "../../store/stones-slice";

const LocalStorageManager = props => {
  const dispatch = useDispatch();

  const [myScenarios, setMyScenarios] = useState(
    Object.keys(localStorage).filter((k,v) => k.toString().match(/^scenario-\d+/)).map(k => JSON.parse(localStorage.getItem(k)))
  );

  const loadScenario = id => {
      const scenario = JSON.parse(localStorage.getItem('scenario-'+ id));
      dispatch(stonesActions.load({direction: scenario.direction || 1, stones: scenario.stones}));
  };
  const deleteScenario = id => {
      localStorage.removeItem('scenario-'+ id);
      setMyScenarios(cur => cur.filter(scene => scene.scenarioId !== id));
  };

  return (<>
    <h2>Locally saved scenarios</h2>
    <ul>
        { myScenarios.map(scene => (
            <li key={ scene.scenarioId }>
                [{scene.scenarioId}] { scene.title }
                <button onClick={() => {loadScenario(scene.scenarioId)}}>Load</button>
                <button onClick={() => {deleteScenario(scene.scenarioId)}}>Delete</button>
            </li>
        ))}
    </ul>
  </>);
};
export default LocalStorageManager;