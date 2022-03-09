import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../tasks.model';
import { imageTypeValidator } from './image-type.validator';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

 mode='Create';
 private taskId:String|null="";
  task:Task;
  taskForm:FormGroup
  isLoading=false;
  imagePreview:any=null;
  // taskService:TaskService;
// constructor(taskService:TaskService){
//   this.taskService=taskService;
// } one shortcutb for doing this is mentioned below

constructor(public taskService:TaskService,public route:ActivatedRoute){ }
ngOnInit(){
  
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has("taskId")){

        this.taskForm=new FormGroup({
          'title':new FormControl(null,{validators:[Validators.required,Validators.minLength(5)]}),
          'description':new FormControl(null,{validators:[Validators.required]}),
          'image': new FormControl(null,{validators:[Validators.required]})
            })


this.mode='edit';
this.taskId=paramMap.get('taskId');
this.isLoading=true;
this.taskService.getTask(this.taskId).subscribe((resp)=>{
  this.isLoading=false;
  this.task=resp.data;
  this.taskForm.setValue({
    'title':this.task.title,
    'description':this.task.description,
    'image':this.task.imagePath
  })
})

      }else{
        this.taskForm=new FormGroup({
          'title':new FormControl(null,{validators:[Validators.required,Validators.minLength(5)]}),
          'description':new FormControl(null,{validators:[Validators.required]}),
          'image': new FormControl(null,{validators:[Validators.required,imageTypeValidator]})
            })
        this.mode='Create';
          this.taskId=null;
      }
    })
}
onImagePicked(event:Event){
const file=(event.target as HTMLInputElement ).files[0];
this.taskForm.patchValue({image: file});
this.taskForm.get('image').updateValueAndValidity();
this.imageToDataUrl(file);
}
imageToDataUrl(file:File){
  const reader=new FileReader();
  reader.onload=()=>{
    this.imagePreview=reader.result
  }
  reader.readAsDataURL(file);
}

  onSaveTask(){
    if(!this.taskForm.valid){
      return;
    }
    const task:any={
      title:this.taskForm.value.title,
      description:this.taskForm.value.description,
      imagePath:this.taskForm.value.image
    }
    if(this.mode=='edit'){
      task['_id']=this.task._id;
      this.taskService.updateTask(task);
    }else{
      this.taskService.addTasks(task,this.taskForm.value.image)
    }
    
    this.taskForm.reset();
  }

}
