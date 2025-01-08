import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-employees',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-employees.component.html',
  styleUrl: './all-employees.component.css'
})
export class AllEmployeesComponent {

  data: any=[];
  tok: any;

  constructor(private auth: AuthService){
    this.auth.getProfile().subscribe((res:any)=>{
      this.tok= res?.data;
      if(!this.tok){
        alert("Session Expired, Please Login Again");
        this.auth.logout();
      }
    });
    this.auth.allEmployee().subscribe((list:any)=>{
      this.data = list.data;
      console.log("USERS===>>", list);
    });
  }
  delete(id:any, i:any){
    if(window.confirm("Are you sure want to Delete?")){
      this.auth.deleteEmp(id).subscribe((res:any)=>{
        this.data.splice(i,1);
      })
    }
  }
}
