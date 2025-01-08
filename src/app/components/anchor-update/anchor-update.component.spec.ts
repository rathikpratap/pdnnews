import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorUpdateComponent } from './anchor-update.component';

describe('AnchorUpdateComponent', () => {
  let component: AnchorUpdateComponent;
  let fixture: ComponentFixture<AnchorUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnchorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
