import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaderProjectsComponent } from './uploader-projects.component';

describe('UploaderProjectsComponent', () => {
  let component: UploaderProjectsComponent;
  let fixture: ComponentFixture<UploaderProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploaderProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploaderProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
