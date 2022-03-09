import { Component } from '@angular/core';
import { Task } from './tasks/tasks.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tasks: Task[]=[];
  onTaskAdd(task:Task){
  this.tasks.push(task)
  }
}
