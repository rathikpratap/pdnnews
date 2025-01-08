import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormControl, AbstractControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-writer-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './writer-update.component.html',
  styleUrl: './writer-update.component.css'
})
export class WriterUpdateComponent {

  getId: any;
  tok: any;

  writerUpdateForm = new FormGroup({
    custCode: new FormControl(),
    topic: new FormControl('', Validators.required),
    referenceLink: new FormControl('', Validators.required),
    script: new FormControl('', Validators.required),
    thumbnailText: new FormControl('', Validators.required),
    remark: new FormControl('')
  });

  constructor(private router: Router, private ngZone: NgZone, private activatedRoute: ActivatedRoute, private auth: AuthService){
    this.auth.getProfile().subscribe((res:any)=>{
      this.tok = res?.data;
      if(!this.tok){
        alert("Session Expired, Please Login Again");
        this.auth.logout();
      }
    });
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.auth.getWriterTask(this.getId).subscribe((res:any)=>{
      this.writerUpdateForm.patchValue({
        custCode : res['custCode'],
        topic : res['topic'],
        referenceLink : res['referenceLink'],
        script : res['script'],
        thumbnailText : res['thumbnailText'],
        remark : res['remark']
      })
    });
  }
  getControls(name:any) : AbstractControl | null{
    return this.writerUpdateForm.get(name)
  }

  onUpdate(){
    this.auth.updateWriterTask(this.getId, this.writerUpdateForm.value).subscribe((res:any)=>{
      this.ngZone.run(()=>{this.router.navigateByUrl('/writer-home/writer-projects')})
    },(err)=>{
      console.log(err)
    })
  }
}
