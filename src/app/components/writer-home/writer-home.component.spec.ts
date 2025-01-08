import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterHomeComponent } from './writer-home.component';

describe('WriterHomeComponent', () => {
  let component: WriterHomeComponent;
  let fixture: ComponentFixture<WriterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriterHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
