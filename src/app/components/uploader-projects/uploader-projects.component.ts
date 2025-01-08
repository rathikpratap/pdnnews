import { Component, Renderer2 } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-uploader-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './uploader-projects.component.html',
  styleUrl: './uploader-projects.component.css'
})
export class UploaderProjectsComponent {

  data: any=[];
  tok: any;
  tasks: any[]=[];
  previousMonthName: string;
  currentMonthName: string;
  previousTwoMonthName: string;
  previousData: any;
  TwoPreviousData: any;
  isExpanded: boolean = false;
  searchForm: FormGroup;
  rangeData: any;
  errorMessage: any;
  dateRangeForm = new FormGroup({
    startDate: new FormControl(""),
    endDate: new FormControl("")
  });

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
      });
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
      this.auth.deleteCust(id).subscribe((res:any)=>{
        this.data.splice(i,1);
      })
    }
  }
  openUpdatePanel(taskId: string){
    const url = `/uploader-home/uploader-update/${taskId}`;
    window.location.href = url;
  }
}
