import { Component,OnDestroy,OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { TaskService } from '../task.service';
import { Task } from '../tasks.model';
@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy{
// tasks=[
// {title:"code for angular module 1",description:"complete the module"},
// {title:"code for angular module 2",description:"complete the module"},
// {title:"code for angular module 3",description:"complete the module"},
// ];
storedTasks:Task[]=[];
isLoading=false;
totalTasks=0;
pageIndex=0;
pageSize=5;
pageSizeOptions=[1,5,10,100];
userId="";

  private tasksSub!: Subscription;

  private authListnerSubs : Subscription;
  public userIsAuthenticated=false;
constructor(public taskService:TaskService,private authService: AuthService){

}
ngOnInit(){
    this.taskService.getTasks(this.pageSize,this.pageIndex);
    this.isLoading=true;
    this.tasksSub=this.taskService.getTaskUpdateLister().subscribe((taskData:any)=>{
      this.isLoading=false; 
      this.storedTasks=taskData.tasks;
      this.totalTasks=taskData.totalCount;
    })

    this.userId=this.authService.getUserId();
    this.userIsAuthenticated=this.authService.getAuthStatus();
    this.authListnerSubs=this.authService.getAuthStatusListner().subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
      this.userId=this.authService.getUserId();
    })

}
onChangePage(event:PageEvent){
this.pageSize=event.pageSize;
this.pageIndex=event.pageIndex;
this.taskService.getTasks(this.pageSize, this.pageIndex);
}
onDelete(id:String){
  this.taskService.deleteTask(id).subscribe(r=>{
    this.taskService.getTasks(this.pageSize,this.pageIndex);
  })
}
ngOnDestroy(){
    this.tasksSub.unsubscribe();
    this.authListnerSubs.unsubscribe();
}

}





