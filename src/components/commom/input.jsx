import React from "react";

const Input = (props) => {
	const { name, label, error, ...rest } = props;

	return (
		<div className='form-group'>
			<label htmlFor={name} className='form-label'>
				{label}
			</label>
			<input {...rest} id={name} name={name} className='form-control'></input>
			{/* If error is truphy, returns itself */}
			{error && <div className='alert alert-warning'>{error}</div>}
		</div>
	);
};

export default Input;
