import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl, AbstractControl} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  message:string = '';
  isProcess:boolean = false;
  className = 'd-none';
  tok: any;
  dataLength: any;

  codeInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(){
    const inputElement = this.el.nativeElement.querySelector('input[type=text]');
    if(inputElement) {
      this.renderer.selectRootElement(inputElement).focus();
    }
  }

  constructor(private auth: AuthService, private renderer: Renderer2, private el: ElementRef) {
    
    this.auth.getProfile().subscribe((res:any)=>{
      this.tok = res?.data;
      console.log("MY DATA====>>", this.tok.signupUsername);
      if(!this.tok){
        alert("Session Expired, Please Login Again");
        this.auth.logout();
      }
    });

    this.auth.dataLength().subscribe((list:any)=>{
      this.dataLength = list + 1;
      if(this.dataLength){
        this.taskForm.get('custCode')!.setValue(this.dataLength);
      }else{
        this.taskForm.get('custCode')!.setValue(0);
      }
    });

  }

  taskForm = new FormGroup({
    custCode: new FormControl(0, Validators.required),
    topic: new FormControl('', Validators.required),
    referenceLink: new FormControl('', Validators.required),
    script: new FormControl('', Validators.required),
    thumbnailText: new FormControl('', Validators.required),
    remark: new FormControl(''),
    taskDate: new FormControl(''),
    writerName: new FormControl('')
  });

  getControls(name:any):AbstractControl | null{
    return this.taskForm.get(name);
  }

  onSubmit(): void {
    const currentDate = new Date().toISOString();
    this.taskForm.get('taskDate')!.setValue(currentDate);
    this.taskForm.get('writerName')!.setValue(this.tok.signupUsername);
    this.isProcess = true;
    const custData = this.taskForm.value;
    this.auth.addTask(custData).subscribe((res:any)=>{
      if(res.success){
        this.isProcess = false;
        this.message = "Task Added";
        this.className = 'alert alert-success';
        this.taskForm.reset();
        this.taskForm.get('custCode')!.setValue(this.dataLength + 1);
      }else{
        this.isProcess = false;
        this.message = res.message;
        this.className = 'alert alert-danger';
      }
    },err=>{
      this.isProcess = false;
      this.message = "Server Error";
      this.className = 'alert alert-danger';
    })
  }

  resetForm(): void {
    this.taskForm.reset();
  }  
}
