import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Task } from "./tasks.model"
@Injectable({ providedIn: "root" })
export class TaskService {
    private tasks: Task[] = [];
    private taskUpdated = new Subject<Task[]>();
    constructor(private http: HttpClient,private router:Router) { }
    getTasks() {
        // return [...this.tasks];
        this.http.get<{ status: {}, data: Task[] }>('http://localhost:3000/api/tasks').subscribe((taskData) => {
            this.tasks = taskData.data;
            this.taskUpdated.next([...this.tasks]);
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
            console.log(resp);
            let index = this.tasks.findIndex(t => t._id == task._id);
            if (index >= -1) {
                this.tasks[index] = task;
                this.taskUpdated.next([...this.tasks]);
            }
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
            this.tasks.push(resp.data);
            this.taskUpdated.next([...this.tasks])
            this.router.navigate(['/']);
        });

    }
    deleteTask(id: String) {
        this.http.delete('http://localhost:3000/api/tasks/' + id).subscribe((res) => {
            console.log(res);
            this.tasks = this.tasks.filter(task => task._id !== id);
            this.taskUpdated.next([...this.tasks]);
        })
    }

}