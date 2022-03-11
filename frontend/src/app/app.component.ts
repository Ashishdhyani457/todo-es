import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
// import { Task } from './tasks/tasks.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 
 constructor(private authService: AuthService){
   
 }
 ngOnInit(){
     this.authService.autoAuthUser();
 }
  // tasks: Task[]=[];
  // onTaskAdd(task:Task){
  // this.tasks.push(task)
}
