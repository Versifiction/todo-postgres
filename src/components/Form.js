import React from "react";
import PropTypes from "prop-types";

const Form = ({ inputValue, onAddTask, onInputChange }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddTask();
  };

  return (
    <div className="container">
      <form className="app-form" onSubmit={handleSubmit}>
        <input
          className="app-input"
          placeholder="Entrez une tâche à faire..."
          type="text"
          value={inputValue}
          onChange={onInputChange}
        />
      </form>
    </div>
  );
};

Form.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default Form;
