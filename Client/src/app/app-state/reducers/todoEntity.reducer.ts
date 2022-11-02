import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { Task } from "../entity";
import * as todoActions from '../actions';

export interface State extends EntityState<Task> {};

export function selectTaskId(task: Task): string {
  return task.id;
}

export function sortById(a: Task, b: Task): number {
  return +a.id - +b.id;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: selectTaskId,
  sortComparer: sortById
});

export const initialState: State = adapter.getInitialState({});

const todoReducer = createReducer(
  initialState,

  // get tasks
  on(todoActions.getTasksSuccess, (state, result) => {
    return adapter.setAll(result.response, state);
  }),

  // create Task
  on(todoActions.createTaskSuccess, (state, result) => {
    return adapter.addOne(result, state);
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal} = adapter.getSelectors();

export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}