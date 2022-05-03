const Field = props => {
  const {label, id} = props;
  return <div className="field">
    <label htmlFor={id}>{label}</label>
    <div className="controls">
      {props.children}
    </div>
  </div>;
};
export default Field;