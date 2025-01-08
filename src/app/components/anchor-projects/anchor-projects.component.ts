import { Component, Renderer2 } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anchor-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './anchor-projects.component.html',
  styleUrl: './anchor-projects.component.css'
})
export class AnchorProjectsComponent {

  data:any=[];
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
    this.auth.writerAllProjects().subscribe((list:any)=>{
      this.data = list;
    });
    this.auth.writerPreviousProjects().subscribe((list:any)=>{
      this.previousData = list;
    });
    this.auth.writerTwoPreviousProjects().subscribe((list:any)=>{
      this.TwoPreviousData = list;
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
        this.data.splice(i,1)
      });
    }
  }
  openUpdatePanel(taskId: string){
    const url = `/anchor-home/anchor-update/${taskId}`;
    window.location.href = url;
  }
}
