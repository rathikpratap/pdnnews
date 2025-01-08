import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorHomeComponent } from './anchor-home.component';

describe('AnchorHomeComponent', () => {
  let component: AnchorHomeComponent;
  let fixture: ComponentFixture<AnchorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnchorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
