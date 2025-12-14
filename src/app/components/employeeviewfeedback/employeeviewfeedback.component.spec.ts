import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeviewfeedbackComponent } from './employeeviewfeedback.component';

describe('EmployeeviewfeedbackComponent', () => {
  let component: EmployeeviewfeedbackComponent;
  let fixture: ComponentFixture<EmployeeviewfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeviewfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
