import React from "react";
import classnames from "classnames";

const TextInputGroup = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  type,
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        label={label}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        className={classnames("form-control form-control-lg", { "is-invalid": error })}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
TextInputGroup.defaultProps = {
  type: "text"
};

export default TextInputGroup;
