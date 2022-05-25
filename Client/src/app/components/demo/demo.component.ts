import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as rootReducer from '../../app-state';
import * as todoActions from '../../app-state/actions';
import { interval, of, Subject } from 'rxjs';
import { concatAll, exhaust, exhaustMap, map, mergeAll, switchAll, switchMap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Task } from 'src/app/app-state/entity';
import { TaskService, TodoService } from 'src/app/services';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  private unsubscribe$: Subject<any> = new Subject<any>();

  public taskList$ = this.store.pipe(
    select(rootReducer.getTasks),
    takeUntil(this.unsubscribe$)
  ); 

  public taskName: string = "";
  public currUser: string;
  myTasks: Task[] = [];

  constructor(
    private router: Router,
    private readonly store: Store<{}>,
    private todoService: TodoService,
    private _store: Store
  ) { }

  ngOnInit(): void {
    // getting all tasks from server
    this._store.dispatch(todoActions.getTasks());

    this.taskList$.subscribe((data) => {
      console.log(data);
      this.myTasks = data.tasks;

      if (data.isLoadingSuccess) this.taskName = "";
    });

    let obser = interval(2000);

    of('news', 'games', 'songs')
    .pipe(
      // map((str) => this.todoService.getTasks(str)),
      // mergeAll(),
      // switchAll(),
      // exhaust(),
      // concatAll()
      // exhaustMap((str) => this.todoService.getTasks(str))
    )
    .subscribe((res) => console.log(res));
  }

  createNewTask() {
    const task = {
      id: this.myTasks.length + 1,
      createdBy: this.currUser || "rajat",
      task: this.taskName,
      assignee: this.currUser || "rajat",
      status: 'active'
    }
    this.store.dispatch(todoActions.createTask({task}));
    this.taskName = "";
  }

  editTask(prevTask: Task) {
    console.log('Task editing ...');
    let taskName = prompt("Please enter task name", "Learn Killing Curse");

    if (!taskName) return;

    const task = {
      ...prevTask,
      task: taskName
    }
    this.store.dispatch(todoActions.editTask({task}));
  }

  deleteTask(taskId) {
    console.log('delete task clicked');
    this.store.dispatch(todoActions.deleteTask({taskId}));
  }

  isNewTaskDisable() {
    return !this.taskName.length;
  }

  navigateTo(route) {
    switch (route) {
      case 'home':
        this.router.navigate(['./']);
        break;
      
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
