import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Task } from "./tasks.model"
@Injectable({ providedIn: "root" })
export class TaskService {
    private tasks: Task[] = [];
    private taskUpdated = new Subject<{tasks:Task[],totalCount:number}>();
    constructor(private http: HttpClient,private router:Router) { }
    getTasks(taskPerPage?:number, currentPage?:number) {
        // return [...this.tasks];
let url='http://localhost:3000/api/tasks';
if(taskPerPage && (currentPage > -1)){
    url += `?pagesize=${taskPerPage}&currentpage=${currentPage}`;
}

        this.http.get<{ status: {}, data: Task[] ,totalCount:number}>(url).subscribe((taskData) => {
            this.tasks = taskData.data;
            this.taskUpdated.next({tasks:[...this.tasks],totalCount:taskData.totalCount});
        });

    }
    getTask(id: String) {
        // return{...this.tasks.find(task=>task._id==id)}
        return this.http.get<{ status: {}, data: Task }>('http://localhost:3000/api/tasks/' + id)
    }
    updateTask(task: Task) {

        let taskData:any=null;
        if(typeof(task.imagePath)=='string'){
            taskData=task;
        }
        else{
             taskData=new FormData();
             taskData.append("_id",task._id);
            taskData.append("title",task.title);
            taskData.append("description",task.description)
            taskData.append('image',task.imagePath,task.title);
        }
        this.http.put<{ status: {}, data: Task }>('http://localhost:3000/api/tasks/' + task._id, taskData).
        subscribe((resp) => {
            this.router.navigate(['/']);
        })
      
    }
    getTaskUpdateLister() {
        return this.taskUpdated.asObservable();
    }
    // mGHtMLPW8ByACXmK
    // mongodb+srv://pwr:<password>@cluster0.pb8zt.mongodb.net/todolist-mean?retryWrites=true&w=majority
    addTasks(task: Task,image: File) {

        const taskData:any= new FormData();
        taskData.append("title",task.title);
        taskData.append("description",task.description)
        taskData.append('image',image,task.title);
        
        this.http.post<{ status: {}, data: Task }>('http://localhost:3000/api/tasks', taskData).subscribe((resp) => {
            console.log(resp)
            this.router.navigate(['/']);
        });

    }
    deleteTask(id: String) {
        return this.http.delete('http://localhost:3000/api/tasks/' + id);
    }

}