import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormControl, AbstractControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-projects',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-projects.component.html',
  styleUrl: './update-projects.component.css'
})
export class UpdateProjectsComponent {

  getId:any;
  tok:any;
  emp:any;

  updateForm = new FormGroup({
    custCode: new FormControl(),
    topic: new FormControl('', Validators.required),
    referenceLink: new FormControl('', Validators.required),
    script: new FormControl('', Validators.required),
    thumbnailText : new FormControl('', Validators.required),
    remark: new FormControl(''),
    writerName: new FormControl(''),
    writerStatus: new FormControl(''),
    anchorName: new FormControl(''),
    rawEditorName: new FormControl(''),
    rawStatus: new FormControl(''),
    mainEditorName: new FormControl(''),
    mainStatus: new FormControl('')

  });
  constructor(private router: Router, private auth: AuthService, private ngZone: NgZone, private activatedRoute: ActivatedRoute){
    this.auth.getProfile().subscribe((res:any)=>{
      this.tok = res?.data;
      if(!this.tok){
        alert("Session Expired, Please Login Again");
        this.auth.logout()
      }
    });
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.auth.getWriterTask(this.getId).subscribe((res:any)=>{
      this.updateForm.patchValue({
        custCode : res['custCode'],
        topic : res['topic'],
        referenceLink : res['referenceLink'],
        script : res['script'],
        thumbnailText : res['thumbnailText'],
        remark : res['remark'],
        writerName : res['writerName'],
        writerStatus : res['writerStatus'],
        anchorName : res['anchorName'],
        rawEditorName : res['rawEditorName'],
        rawStatus : res['rawStatus'],
        mainEditorName : res['mainEditorName'],
        mainStatus : res['mainStatus']
      })
    });
    this.auth.allEmployee().subscribe((res:any)=>{
      this.emp = res.data;
    });
  }
  getControls(name:any) : AbstractControl | null{
    return this.updateForm.get(name)
  }
  onUpdate(){
    this.auth.updateWriterTask(this.getId, this.updateForm.value).subscribe((res:any)=>{
      this.ngZone.run(()=>{this.router.navigateByUrl('/all-projects')})
    },(err)=>{
      console.log(err)
    })
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

}
