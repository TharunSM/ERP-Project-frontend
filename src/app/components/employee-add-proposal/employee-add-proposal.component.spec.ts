import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddProposalComponent } from './employee-add-proposal.component';

describe('EmployeeAddProposalComponent', () => {
  let component: EmployeeAddProposalComponent;
  let fixture: ComponentFixture<EmployeeAddProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAddProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
