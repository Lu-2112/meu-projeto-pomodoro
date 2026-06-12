import { createContext, type Dispatch } from 'react';
import { initialTaskState } from './initialTaskState';
import type { TaskActionModel } from './TaskActions';


type TaskStateModel = typeof initialTaskState;

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: Dispatch<TaskActionModel>;
};

const initialContextValue: TaskContextProps = {
  state: initialTaskState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);