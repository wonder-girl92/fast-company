import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
  options,
  onChange,
  name,
  label,
  defaultValue
}) => {
  const defaultValueToArray = defaultValue.map((value) => ({
    label: value.name,
    value: value._id
  }));
  const optionsArray =
    !Array.isArray(options) &&
  typeof options === "object"
    ? Object.keys(options).map((optionName) => ({
      label: options[optionName].name,
      value: options[optionName]._id
    }))
    : options;
  const handleChange = (value) => {
    onChange({ name: name, value });
  };
  return (
    <div className="mb-4">
      <label
        className="form-label"
      >
        {label}
      </label>
    <Select
      isMulti
      closeMenuOnSelect={false}
      // чтоб вкладка автоматически не закрывалась после выбора
      defaultValue={defaultValueToArray}
      options={optionsArray}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleChange}
      name={name}
    />
    </div>
  );
};

MultiSelectField.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.array
};

export default MultiSelectField;
