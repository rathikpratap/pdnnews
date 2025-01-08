import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorProjectsComponent } from './anchor-projects.component';

describe('AnchorProjectsComponent', () => {
  let component: AnchorProjectsComponent;
  let fixture: ComponentFixture<AnchorProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnchorProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
