import React, { useState } from "react";

const ColorSelector = React.forwardRef((props, ref) => {
  const { label, id } = props;
  const [value, setValue] = useState( props.value );
  
  return <div className="field">
    <label htmlFor={id}>{ label } 
      <svg viewBox="0 0 2 2" style={{width: '1em', height: '1em', padding: '0 0.1em', marginBottom: '-0.1em'}}>
        <circle cx={1} cy={1} r={0.8} width={2} height={2} fill={ value || 'transparent' } />
      </svg>
    </label>
    <select id={id} value={value} onChange={(event) => setValue(event.target.value)} ref={ref}>
      <option value='red'>Red</option>
      <option value='yellow'>Yellow</option>
      <option value='blue'>Blue</option>
      <option value='green'>Green</option>
      <option value='black'>Black</option>
      <option value='white'>White</option>
    </select>
  </div>;
});
export default ColorSelector;