import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  taskForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
  });

  tasks: [];
  enableEdit = false;
  selectedTask: any;
  constructor(private taskService: TaskService) {}

  ngOnInit(){
    this.displayTasks();
  }

  displayTasks() {
     this.taskService.getTasks().subscribe((result:any) => {
       //place the return to you variable tasks array
        this.tasks = result.tasks;
     });
  }

  onSubmit(){

    let formValue = this.taskForm.value;
    if(this.enableEdit) {
      this.taskService.updateTask(formValue).subscribe((result : any) => {
        console.log(result);
      });
    }else{
      this.taskService.saveTask(formValue).subscribe((result: any) => {
        console.log(result);
      });
    }
  
  }

  editTask(event) {
    let id = parseInt(event.target.id);
    this.taskService.getTaskDetail(id).subscribe((result: any) => {
      this.taskForm.patchValue(result);
      this.enableEdit = true;
    });
  }


  deleteTask(event){
    let id = parseInt(event.target.id);
    this.taskService.deleteTask(id).subscribe((result: any) => {
      console.log(result);
    });
  }
}
