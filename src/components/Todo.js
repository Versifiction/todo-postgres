import React, { Component } from "react";
import axios from "axios";
import Counter from "./Counter";
import Form from "./Form";
import Title from "./Title";
import List from "./List";
// import initialTasks from "../data/tasks";
import { getMax } from "../utils/getMax";

class Todo extends Component {
  state = {
    tasks: [],
    currentInputValue: "",
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/todos`)
      .then((response) => {
        console.log(response);
        this.setState({ tasks: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeInput = (evt) => {
    this.setState({
      currentInputValue: evt.target.value,
    });
  };

  addTask = (evt) => {
    const { currentInputValue } = this.state;
    const maxId = getMax(this.state.tasks);
    const newTask = {
      id: maxId + 1,
      description: currentInputValue,
      blurred: false,
      done: false,
      favorite: false,
    };

    axios
      .post(`http://localhost:5000/todos`, { newTask })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      tasks: [...this.state.tasks, newTask],
      currentInputValue: "",
    });
  };

  toggleTask = (id) => () => {
    // 1. On génère un **nouveau** tableau de tâches, avec .map
    const editedTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });

    const task = this.state.tasks.filter((t) => t.id === id);

    axios
      .put(`http://localhost:5000/todos/${id}`, { task })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // 2. On utilise ce nouveau tableau pour modifier le state de <Todo />
    this.setState({
      tasks: editedTasks,
    });
  };

  deleteTask = (id) => () => {
    console.log(this.state.tasks);
    const tasks = this.state.tasks.filter((task) => task.id !== id);

    axios
      .delete(`http://localhost:5000/todo/${id}`)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });

    this.setState({ tasks });
  };

  favoriteTask = (id) => () => {
    const tasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        /* eslint-disable no-prototype-builtins */
        if (!task.hasOwnProperty("favorite")) {
          task.favorite = false;
        }
        task.favorite = !task.favorite;
      }
      return task;
    });

    const task = this.state.tasks.filter((t) => t.id === id)[0];

    console.log("task ", task);
    axios
      .put(`http://localhost:5000/todos/${id}`, { task })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ tasks });
    console.log(this.state.tasks);
  };

  blurTask = (id) => () => {
    const tasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        /* eslint-disable no-prototype-builtins */
        if (!task.hasOwnProperty("blurred")) {
          task.blurred = false;
        }
        task.blurred = !task.blurred;
      }
      return task;
    });

    const task = this.state.tasks.filter((t) => t.id === id)[0];

    axios
      .put(`http://localhost:5000/todos/${id}`, { task })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ tasks });
  };

  render() {
    const { currentInputValue, tasks } = this.state;
    const tasksNotDone = tasks.filter((task) => !task.done).length;
    const orderedTasks = [
      ...tasks.filter((t) => !t.done && t.favorite),
      ...tasks.filter((t) => !t.done && !t.favorite),
      ...tasks.filter((t) => t.done),
    ];
    const taskActions = {
      onToggleTask: this.toggleTask,
      onDeleteTask: this.deleteTask,
      onFavoriteTask: this.favoriteTask,
      onBlurTask: this.blurTask,
    };

    return (
      <div className="container">
        <Title />
        <Form
          inputValue={currentInputValue}
          onAddTask={this.addTask}
          onInputChange={this.changeInput}
        />
        <Counter count={tasksNotDone} />
        <List tasks={orderedTasks} taskActions={taskActions} />
      </div>
    );
  }
}

export default Todo;
