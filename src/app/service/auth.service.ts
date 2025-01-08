import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { appConfig } from '../../environment';
import { application } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpHeaders = new HttpHeaders().set('Content-Type','application/json')

  constructor(private http: HttpClient, private router: Router) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  signin(credentials: {loginUsername: string, loginPswd: string}):Observable<any>{
    return this.http.post(`${appConfig.apiUrl}/auth/login`, credentials);
  }

  getProfile(){
    let headers = {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    return this.http.get(`${appConfig.apiUrl}/auth/profile`, {headers:headers})
  }

  logout(): void {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage
  
    if (token) {
      // Remove the token and role from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
  
      // Navigate to the login page
      this.router.navigate(['/login']);
    } else {
      // If no token is found, simply redirect to login
      this.router.navigate(['/login']);
    }
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  signup(data:any):Observable<any>{
    return this.http.post(`${appConfig.apiUrl}/auth/register`, data);
  }
  allEmployee(){
    return this.http.get(`${appConfig.apiUrl}/auth/allEmployee`);
  }
  deleteEmp(id:any):Observable<any>{
    return this.http.delete(`${appConfig.apiUrl}/auth/delete-emp/${id}`, {headers:this.httpHeaders}).pipe( catchError(this.handleError));
  }
  getEmployee(id:any):Observable<any>{
    return this.http.get(`${appConfig.apiUrl}/auth/read-emp/${id}`, {headers:this.httpHeaders}).pipe(map((res:any)=>{
      return res || {}
    }), catchError(this.handleError)
  )}
  updateEmployee(id:any, data:any):Observable<any>{
    return this.http.put(`${appConfig.apiUrl}/auth/updateEmp/${id}`, data, {headers:this.httpHeaders}).pipe( catchError(this.handleError));
  }
  dataLength(){
    return this.http.get(`${appConfig.apiUrl}/auth/dataLength`);
  };
  addTask(customerData:any):Observable<any>{
    return this.http.post(`${appConfig.apiUrl}/auth/addTask`, customerData);
  };

  searchTaskbyTopic(topic:string): Observable<any>{
    return this.http.get<any>(`${appConfig.apiUrl}/auth/searchTopic/${topic}`);
  };

  writerAllProjects():Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/writerAllProjects`,{headers});
  };
  writerPreviousProjects(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/writerAllPreviousProjects`,{headers});
  };
  writerTwoPreviousProjects(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/writerAllTwoPreviousProjects`,{headers});
  };
  getPreviousMonthName(): string{
    const today = new Date();
    const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[previousMonth.getMonth()];
  };
  getPreviousTwoMonthName(): string{
    const today = new Date();
    const previousMonth = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[previousMonth.getMonth()];
  };
  getCurrentMonthName(): string{
    const today = new Date();
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[previousMonth.getMonth()];
  };
  downloadFile(){

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get(`${appConfig.apiUrl}/auth/downloadFile`,{ headers ,responseType: 'blob'}).subscribe((res: any)=>{
      const blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'task.xlsx';
      link.click();
      console.log('Download Complete')
    }, error => {
      console.error('Error Downloading File', error);
    });
  };
  getDatabyRange(startDate: Date, endDate: Date): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/dataByRange/${startDate.toISOString()}/${endDate.toISOString()}`,{headers});
  };
  deleteCust(id:any):Observable<any>{
    return this.http.delete(`${appConfig.apiUrl}/auth/delete-task/${id}`, {headers: this.httpHeaders}).pipe( catchError(this.handleError))
  };

  downloadRangeFile(startDate: Date, endDate: Date){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get(`${appConfig.apiUrl}/auth/downloadRangeFile/${startDate.toISOString()}/${endDate.toISOString()}`, {headers,responseType: 'blob'}).subscribe((res: any)=>{
      const blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'task.xlsx';
      link.click();
      console.log("Download Done")
    }, error =>{
      console.error('Error Downloading File: ',error);
    });
  };

  updateWriterTask(id:any, data:any): Observable<any>{
    return this.http.put(`${appConfig.apiUrl}/auth/updateWriterTask/${id}`, data, {headers: this.httpHeaders}).pipe( catchError(this.handleError));
  };
  getWriterTask(id:any): Observable<any>{
    return this.http.get(`${appConfig.apiUrl}/auth/read-writerTask/${id}`,{headers:this.httpHeaders}).pipe(map((res:any)=>{
      return res || {}
    }), catchError(this.handleError))
  };

  allProjects():Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/allProjects`,{headers});
  };
  allPreviousProjects(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/allPreviousProjects`,{headers});
  };
  allTwoPreviousProjects(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/allTwoPreviousProjects`,{headers});
  };
  updateTm(data: any):Observable<any>{
    return this.http.post(`${appConfig.apiUrl}/auth/updateTm`,{items: data});
  };

  rawEditorAllProjects(): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/rawEditorAllProjects`,{headers});
  };
  rawEditorPreviousProjects(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/rawEditorAllPreviousProjects`,{headers});
  };
  rawEditorTwoPreviousProjects(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/rawEditorAllTwoPreviousProjects`,{headers});
  };

  mainEditorAllProjects():Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorizzation': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/mainEditorAllProjects`, {headers});
  };
  mainEditorPreviousProjects(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/mainEditorAllPreviousProjects`,{headers});
  };
  mainEditorTwoPreviousProjects(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-Type': 'application.json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${appConfig.apiUrl}/auth/mainEditorAllTwoPreviousProjects`,{headers});
  };

}
