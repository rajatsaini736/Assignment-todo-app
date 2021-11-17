import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Client';

  constructor(
    private _taskService: TaskService
  ) { }

  async ngOnInit() {
      console.log('app component');
      let tasks = await this._taskService.getAllTask();
      console.log(tasks);
  }
}
