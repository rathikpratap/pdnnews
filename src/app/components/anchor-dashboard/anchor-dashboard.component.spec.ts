import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorDashboardComponent } from './anchor-dashboard.component';

describe('AnchorDashboardComponent', () => {
  let component: AnchorDashboardComponent;
  let fixture: ComponentFixture<AnchorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnchorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
