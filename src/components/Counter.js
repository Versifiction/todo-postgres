import React from "react";
import PropTypes from "prop-types";

const Counter = ({ count }) => {
  let message = "";
  switch (count) {
    case 0:
      message = "Aucune tâche en cours";
      break;

    case 1:
      message = "1 tâche en cours";
      break;

    default:
      message = `${count} tâches en cours`;
  }

  return (
    <div className="app-counter">
      <h2>{message}</h2>
      <hr />
    </div>
  );
};

Counter.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Counter;
