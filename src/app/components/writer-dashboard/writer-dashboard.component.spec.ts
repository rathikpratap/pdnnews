import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterDashboardComponent } from './writer-dashboard.component';

describe('WriterDashboardComponent', () => {
  let component: WriterDashboardComponent;
  let fixture: ComponentFixture<WriterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriterDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
