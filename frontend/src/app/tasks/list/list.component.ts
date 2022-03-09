import { Component,OnDestroy,OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
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
totalTasks=100;
pageSize=5;
pageSizeOptions=[1,5,10,100];

  private tasksSub!: Subscription;
constructor(public taskService:TaskService){

}
ngOnInit(){
    this.taskService.getTasks();
    this.isLoading=true;
    this.tasksSub=this.taskService.getTaskUpdateLister().subscribe((tasks:Task[])=>{
      this.isLoading=false; 
      this.storedTasks=tasks;
    })
}
onChangePage(event:PageEvent){
console.log(event);
}
onDelete(id:String){
  this.taskService.deleteTask(id);
}
ngOnDestroy(){
    this.tasksSub.unsubscribe();
}

}





