import { Component, Renderer2 } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.css'
})
export class AllProjectsComponent {

  data: any=[];
  tok:any;
  tasks:any[]=[];
  previousMonthName: string;
  currentMonthName: string;
  previousTwoMonthName: string;
  previousData: any;
  TwoPreviousData: any;
  isExpanded:boolean = false;
  searchForm: FormGroup;
  rangeData: any;
  errorMessage:any;
  dateRangeForm = new FormGroup({
    startDate: new FormControl(""),
    endDate: new FormControl("")
  });
  emp:any[]=[];

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private renderer: Renderer2){
    this.auth.getProfile().subscribe((res:any)=>{
      this.tok = res?.data;
      if(!this.tok){
        alert("Session Expired, Please Login Again");
        this.auth.logout();
      }
    });
    this.searchForm = this.formBuilder.group({
      topic: ['']
    });
    this.auth.allProjects().subscribe((list:any)=>{
      this.data = list;
    });
    this.auth.allPreviousProjects().subscribe((list:any)=>{
      this.previousData = list;
    })
    this.auth.allTwoPreviousProjects().subscribe((list:any)=>{
      this.TwoPreviousData = list;
    });
    this.auth.allEmployee().subscribe((res:any)=>{
      this.emp = res.data;
      console.log("EMP===>>", this.emp);
    });
    this.currentMonthName = this.auth.getCurrentMonthName();
    this.previousMonthName = this.auth.getPreviousMonthName();
    this.previousTwoMonthName = this.auth.getPreviousTwoMonthName();
  }
  toggleExpanded(){
    this.isExpanded = !this.isExpanded;
    this.renderer.setAttribute(document.querySelector('.btn'), 'aria-expanded', this.isExpanded.toString());
  }
  searchTask(){
    const topic = this.searchForm.get('topic')!.value;
    this.auth.searchTaskbyTopic(topic).subscribe((tasks:any)=>{
      this.tasks = tasks;
      this.errorMessage = null;
    },error=>{
      this.tasks = [];
      this.errorMessage = error.message;
    });
  }
  downloadFile(){
    this.auth.downloadFile();
  }
  onDate(){
    const startDateValue = this.dateRangeForm.value.startDate;
    const endDateValue = this.dateRangeForm.value.endDate;

    const startDate = startDateValue? new Date(startDateValue) : null;
    const endDate = endDateValue? new Date(endDateValue) : null;

    if(startDate && endDate){
      this.auth.getDatabyRange(startDate, endDate).subscribe((rangeData:any)=>{
        this.rangeData = rangeData;
      })
    }
  }
  downloadRangeFile(){
    const startDateValue = this.dateRangeForm.value.startDate;
    const endDateValue = this.dateRangeForm.value.endDate;

    const startDate = startDateValue? new Date(startDateValue) : null;
    const endDate = endDateValue? new Date(endDateValue) : null;

    if(startDate && endDate){
      this.auth.downloadRangeFile(startDate, endDate);
    }
  }
  delete(id:any, i:any){
    if(window.confirm("Are you sure want to delete?")){
      this.auth.deleteCust(id).subscribe((res : any)=>{
        this.data.splice(i,1)
      })
    }
  }
  openUpdatePanel(taskId: string){
    const url = `/update-projects/${taskId}`;
    window.location.href = url;
  }
  updateTM(user:any){
    this.auth.updateTm([user]).subscribe((res:any)=>{
      if(res){
        alert("Projects Assigned");  
      }else{
        alert("Projects Not Assigned");
      }
    });
    
  }

  filterEmployeeByRole(Tm:string) : any[]{
    if (!this.emp || !Array.isArray(this.emp)) {
      console.warn('emp is undefined or not an array');
      return [];
    }
    switch(Tm){
      case 'Writer':
        return this.emp.filter((employee:any)=> employee.signupRole === 'Writer');
      case 'Anchor':
        return this.emp.filter((employee:any)=> employee.signupRole === 'VoiceOver Artist/ Anchor');
      case 'Raw Editor':
        return this.emp.filter((employee:any)=> employee.signupRole === 'Raw Editor');
      case 'Main Editor':
        return this.emp.filter((employee:any)=> employee.signupRole === 'Main Editor');
      default:
        return [];
    }
  }

  isTaskComplete(task: any): boolean {
    return task.writerStatus === 'Complete' && task.rawStatus === 'Complete' && task.mainStatus === 'Complete';
  }


}
