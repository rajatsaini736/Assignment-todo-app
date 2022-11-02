import { Action, createReducer, on } from "@ngrx/store";
import * as todoActions from '../actions';


export interface State {
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
};

export const initialState: State = {
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const todoStatusReducer = createReducer(
  initialState,
  on(todoActions.getTasks, (state) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(todoActions.getTasksSuccess, (state, result) => {
    return {
      ...state,
      isLoading: false,
      isLoadingSuccess: true
    }
  }),
  on(todoActions.getTasksFailure, (state) => {
    return {
      ...state,
      isLoading: false,
      isLoadingFailure: true
    }
  }),
  on(todoActions.createTask, (state, {task}) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(todoActions.createTaskSuccess, (state, result) => {
    return {
      ...state, 
      isLoading: false,
      isLoadingSuccess: true
    }
  }),
  on(todoActions.createTaskFailure, (state, result) => {
    return {
      ...state,
      isLoading: false,
      isLoadingFailure: true
    }
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return todoStatusReducer(state, action);
}

export const getTodoStatus = (state: State) => {
  return state;
}