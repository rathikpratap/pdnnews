import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterProjectsComponent } from './writer-projects.component';

describe('WriterProjectsComponent', () => {
  let component: WriterProjectsComponent;
  let fixture: ComponentFixture<WriterProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriterProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriterProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
