import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userRole: any;
  tok:any;

  constructor(private auth:AuthService, private router: Router){
    this.auth.getProfile().subscribe((res:any)=>{
      console.log("Token===>", res);
      this.tok = res?.data
    });
  }

  loginForm = new FormGroup({
    loginUsername: new FormControl(''),
    loginPswd: new FormControl('')
  })

  loginUser(){
    const loginData = this.loginForm.value as {loginUsername: string, loginPswd: string};
    console.log("DATA====>>", loginData);
    this.auth.signin(loginData).subscribe((res:any)=>{
      console.log("API response===>", res);
      if(res.success){
        console.log("SUCCESS");
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);

        if(res.role === 'Admin'){
          alert("LOGGED IN SUCCESSFULL!!!!!!");
        }
      }else{
        alert(res.message);
      }
    },err => {
      alert('Login Failed');
    });
  }

}
