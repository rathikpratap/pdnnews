import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { appConfig } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpHeaders = new HttpHeaders().set('Content-Type','application/json')

  constructor(private http: HttpClient, private router: Router) { }

  signin(credentials: {loginUsername: string, loginPswd: string}):Observable<any>{
    return this.http.post(`${appConfig.apiUrl}/auth/login`, credentials);
  }

  getProfile(){
    let headers = {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    return this.http.get(`${appConfig.apiUrl}/auth/profile`, {headers:headers})
  }
}
