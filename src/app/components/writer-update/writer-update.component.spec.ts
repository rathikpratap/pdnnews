import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterUpdateComponent } from './writer-update.component';

describe('WriterUpdateComponent', () => {
  let component: WriterUpdateComponent;
  let fixture: ComponentFixture<WriterUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriterUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
