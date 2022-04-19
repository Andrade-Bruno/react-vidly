import React from "react";

const Input = (props) => {
  const { name, label, value, onChange, error } = props;

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        autoFocus
        id={name}
        type="text"
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
      ></input>
      {/* If error is truphy, returns itself */}
      {error && <div className="alert alert-warning">{error}</div>}
    </div>
  );
};

export default Input;
