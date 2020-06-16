import React from "react";
import PropTypes from "prop-types";

import TrashIcon from "react-icons/lib/fa/trash-o";
import StarIcon from "react-icons/lib/fa/star-o";
import FaEyeSlash from "react-icons/lib/fa/eye-slash";
import classNames from "classnames";

const Task = ({
  id,
  label,
  onToggleTask,
  onDeleteTask,
  onFavoriteTask,
  onBlurTask,
  task,
}) => {
  const currentClassNames = classNames("todo-task", {
    "todo-task--done": task.done,
    "todo-task--favorite": task.favorite,
    "todo-task--blurred": task.blurred,
  });

  return (
    <li key={id} className={currentClassNames}>
      <input type="checkbox" checked={task.done} onChange={onToggleTask(id)} />
      <p className="task-label">{task.description}</p>
      <TrashIcon className="task-delete" onClick={onDeleteTask(id)} />
      <StarIcon className="task-favorite" onClick={onFavoriteTask(id)} />
      <FaEyeSlash className="task-blurred" onClick={onBlurTask(id)} />
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onFavoriteTask: PropTypes.func.isRequired,
  onBlurTask: PropTypes.func.isRequired,
};

export default Task;
