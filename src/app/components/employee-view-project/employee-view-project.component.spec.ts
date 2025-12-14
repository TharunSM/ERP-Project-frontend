import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewProjectComponent } from './employee-view-project.component';

describe('EmployeeViewProjectComponent', () => {
  let component: EmployeeViewProjectComponent;
  let fixture: ComponentFixture<EmployeeViewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeViewProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
