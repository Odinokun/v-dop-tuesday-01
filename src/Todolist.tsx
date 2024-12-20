import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  removeTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, value: FilterValuesType) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(props.todolistId, title.trim());
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const onAllClickHandler = () => props.changeFilter(props.todolistId, 'all');
  const onActiveClickHandler = () =>
    props.changeFilter(props.todolistId, 'active');
  const onCompletedClickHandler = () =>
    props.changeFilter(props.todolistId, 'completed');

  const removeTodolistHandler = () => props.removeTodolist(props.todolistId);

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={removeTodolistHandler}>Del todo</button>
      </h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>add</button>
        {error && <div className='error-message'>{error}</div>}
      </div>
      <ul>
        {props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(props.todolistId, t.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(
              props.todolistId,
              t.id,
              e.currentTarget.checked
            );
          };

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <button onClick={onClickHandler}>del</button>
              <input
                type='checkbox'
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
