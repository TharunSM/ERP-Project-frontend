import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeaddfeedbackComponent } from './employeeaddfeedback.component';

describe('EmployeeaddfeedbackComponent', () => {
  let component: EmployeeaddfeedbackComponent;
  let fixture: ComponentFixture<EmployeeaddfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeaddfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeaddfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
