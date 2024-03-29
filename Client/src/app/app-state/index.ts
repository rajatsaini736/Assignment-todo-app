import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import * as fromUser from './reducers/user.reducer';
import * as fromTodo from './reducers/todo.reducer';
import * as fromTodoStatus from './reducers/todo-status.reducer';

export interface State {
  user: fromUser.State,
  todo: fromTodo.State,
  todoStatus: fromTodoStatus.State
};

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  todo: fromTodo.reducer,
  todoStatus: fromTodoStatus.reducer
};

const reducerKeys = ['user', 'todo', 'todoStatus'];
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: reducerKeys})(reducer);
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug, localStorageSyncReducer] : [localStorageSyncReducer];

export const getLoginState = createFeatureSelector<fromUser.State>('user');

export const getLoggedInUser = createSelector(
  getLoginState,
  fromUser.getLoggedInUser
);

export const userLogin = createSelector(
  getLoginState,
  fromUser.userLogin
);

export const userSignup = createSelector(
  getLoginState,
  fromUser.userSignup
)

export const getTodoState = createFeatureSelector<fromTodo.State>('todo');

export const getTasks = createSelector(
  getTodoState,
  fromTodo.getTasks
);

export const getTodoStatusState = createFeatureSelector<fromTodoStatus.State>('todoStatus');

export const getTodoStatus = createSelector(
  getTodoStatusState,
  fromTodoStatus.getTodoStatus
)

// combining multiple selectors
export const getUserAndTask = createSelector(
  userLogin,
  getTasks,
  ({user}, {tasks}) => {
    return {
      user,
      tasks
    }
  }
);