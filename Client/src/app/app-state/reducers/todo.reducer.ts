import { Action, createReducer, on } from '@ngrx/store';
import { Task } from '../entity';
import * as todoActions from '../actions';
import * as _ from 'lodash';
import * as storage from '../state/storage';
import { result } from 'lodash';

export interface State {
  tasks?: Task[];
  currentTask?: Task;
  deleteTaskId?: any;
  result?: any;
}

export const initialState: State = {
  tasks: storage.getItem('todo').tasks,
  currentTask: {},
  deleteTaskId: '',
  result: '',
}

const todoReducer = createReducer(
  initialState,
  on(todoActions.getTasksSuccess, (state, result) => ({
    ...state,
    tasks: result.response
  })),

  // Create Task Reducer
  on(todoActions.createTask, (state, {task}) => ({
    ...state,
    currentTask: task
  })),
  on(todoActions.createTaskSuccess, (state, result) => {
    const tasks = state.tasks !== undefined ? _.cloneDeep(state.tasks) : [];
    const currentTask = state.currentTask !== undefined ? _.cloneDeep(state.currentTask) : {};
    currentTask.id = result.taskId;
    tasks.push(currentTask);
    return {
      tasks,
    }
  }),
  on(todoActions.createTaskFailure, (state, result) => ({
    ...state,
    result
  })),
 
  // Delete Task Reducers
  on(todoActions.deleteTask, (state, { taskId }) => ({
    ...state,
    deleteTaskId: taskId
  })),
  on(todoActions.deleteTaskSuccess, (state, result) => {
    let tasks = state.tasks !== undefined ? _.cloneDeep(state.tasks) : [];
    if (result.status) {
      tasks = tasks.filter(task => task.id != state.deleteTaskId);
    }
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    }
  }),
  on(todoActions.deleteTaskFailure, (state, result) => ({
    ...state,
    isLoading: false,
    isLoadingFailure: true,
    deleteTaskId: '',
    result
  })),

  // Edit Task
  on(todoActions.editTask, (state, { task }) => ({
    ...state,
    isLoading: true,
    currentTask: task
  })),
  on(todoActions.editTaskSuccess, (state, result) => {
    let tasks = state.tasks !== undefined ? _.cloneDeep(state.tasks) : [];
    const currentTask = state.currentTask !== undefined ? _.cloneDeep(state.currentTask) : {};
    tasks = tasks.map(task => {
      if (task.id == currentTask.id) task = currentTask;
      return task;
    });
    return {
      tasks,
      isLoading: false,
      isLoadingSuccess: true
    }
  }),
  on(todoActions.editTaskFailure, (state, result) => ({
    ...state,
    isLoading: false,
    isLoadingFailure: true,
    result
  }))
);

export function reducer(state: State | undefined, action: Action): any {
  return todoReducer(state, action);
};

export const getTasks = (state: State) => {
  return {
    tasks: state.tasks,
  };
};