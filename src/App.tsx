import { useState } from 'react';
import { v1 } from 'uuid';
import { TaskType, Todolist } from './Todolist';
import './App.css';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistsType = { id: string; title: string };

type TodolistType = {
  data: TaskType[];
  filter: FilterValuesType;
};

type TasksType = {
  [key: string]: TodolistType;
};

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistsType[]>([
    { id: todolistId1, title: 'To learn' },
    { id: todolistId2, title: 'To read' },
  ]);

  const [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: {
      data: [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Rest API', isDone: false },
        { id: v1(), title: 'GraphQL', isDone: false },
      ],
      filter: 'all',
    },
    [todolistId2]: {
      data: [
        { id: v1(), title: 'The Hobbit', isDone: true },
        { id: v1(), title: 'The Lord of the Rings', isDone: true },
        { id: v1(), title: 'The Silmarillion', isDone: false },
        { id: v1(), title: 'Unfinished Tales', isDone: false },
      ],
      filter: 'active',
    },
  });

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(el => el.id !== todolistId));
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };
  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: tasks[todolistId].data.filter(el => el.id !== taskId),
      },
    });
  };
  const addTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title: title, isDone: false };
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: [newTask, ...tasks[todolistId].data],
      },
    });
  };
  const changeStatus = (
    todolistId: string,
    taskId: string,
    newIsDone: boolean
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: tasks[todolistId].data.map(el =>
          el.id === taskId ? { ...el, isDone: newIsDone } : el
        ),
      },
    });
  };
  const changeFilter = (todolistId: string, value: FilterValuesType) => {
    setTodolists(
      todolists.map(el =>
        el.id === todolistId ? { ...el, filter: value } : el
      )
    );
  };

  return (
    <div className='App'>
      {todolists.map(el => {
        let tasksForTodolist = tasks[el.id].data;
        if (tasks[el.id].filter === 'active') {
          tasksForTodolist = tasks[el.id].data.filter(t => t.isDone === false);
        }
        if (tasks[el.id].filter === 'completed') {
          tasksForTodolist = tasks[el.id].data.filter(t => t.isDone === true);
        }
        return (
          <Todolist
            key={el.id}
            todolistId={el.id}
            title={el.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tasks[el.id].filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
