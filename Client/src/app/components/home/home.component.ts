import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SubTask } from '../../models/sub-task';
import { ParentTask } from '../../models/parent-task';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeAccor: number = 0;
  myTasks: any[] = [];
  isLoader: boolean = false;
  parentTaskInput: BehaviorSubject<string> = new BehaviorSubject<string>('');
  subTaskInput: BehaviorSubject<string> = new BehaviorSubject<string>('');
  parentTaskName: string = '';
  subTaskName: string = '';

  constructor(
    private _taskService: TaskService
  ) { }

  async ngOnInit() {
    this.isLoader = true;
    await this.getAllTasks();
    this.isLoader = false;

    this.taskNameInputListener();
  }

  async getAllTasks() {
    try{
      let myTasks = await this._taskService.getAllTask();
      if (myTasks.success && myTasks.data.length) {
        this.myTasks = myTasks.data;
      }
      console.log(this.myTasks);
    } catch(err) {
      console.log(err);
      this.myTasks = [];
    }
  }

  inputParentTaskName(inputEvent: any) {
    this.parentTaskInput.next(inputEvent.target.value);
  }

  inputSubTaskName(inputEvent: any) {
    this.subTaskInput.next(inputEvent.target.value);
  }

  taskNameInputListener() {
    this.parentTaskInput
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => this.parentTaskName = value);

    this.subTaskInput
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => this.subTaskName = value);
  }

  async createNewTask() {
    if (!this.parentTaskName.length) return;

    let payload = { "task_name": this.parentTaskName };
    try{
      let newTask = await this._taskService.postNewParentTask(payload);    
      this.parentTaskName = "";
      if (newTask.success) {
        this.myTasks.push(newTask.data);
      }
    } catch(err) {
      console.log(err);
    }
  }

  async updateParentTaskStatus(parentTask: ParentTask, index: number) {
    let taskId = parentTask._id;
    let payload = { 
      "overall_status": parentTask.overall_status == 'complete' ? 'pending' : 'complete'
    }

    try {
      let updatedTaskRes = await this._taskService.updateParentTask(payload, taskId);
      if (updatedTaskRes.success) {
        this.myTasks[index] = updatedTaskRes.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async createNewSubTask(parentTask: ParentTask, index: number) {
    if (!this.subTaskName.length) return;

    let parentTaskId = parentTask._id;
    let payload = {
      "subTask_name": this.subTaskName
    }

    try{
      let updatedSubTaskRes = await this._taskService.postNewSubTask(parentTaskId, payload);
      this.subTaskName = "";
      if (updatedSubTaskRes.success) {
        this.myTasks[index] = updatedSubTaskRes.data;
      }
      console.log(this.myTasks);
    } catch (err) {
      console.log(err);
    }
  }

  async updateSubTaskStatus(parentTask: ParentTask, subTask: SubTask, index: number) {
    let parentTaskId = parentTask._id;
    let subTaskId = subTask._id;
    let payload = {
      subTaskId,
      "status": subTask.status == 'complete' ? 'pending' : 'complete'
    }

    try{
      let updatedTaskRes = await this._taskService.updateSubTask(parentTaskId, payload);
      if (updatedTaskRes.success) {
        this.myTasks[index] = updatedTaskRes.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  isNewParentTaskDisable(){
    return !this.parentTaskName.length;
  }

  isNewSubTaskDisable() {
    return !this.subTaskName.length;
  }

  isParentTaskCompleted(task: ParentTask) {
    return task.overall_status == 'complete';
  }

  isSubTaskCompleted(task: SubTask) {
    return task.status == 'complete';
  }

  toggleAccor(i: number) {
    this.activeAccor = i;
  }

}
