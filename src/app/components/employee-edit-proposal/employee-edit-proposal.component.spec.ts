import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditProposalComponent } from './employee-edit-proposal.component';

describe('EmployeeEditProposalComponent', () => {
  let component: EmployeeEditProposalComponent;
  let fixture: ComponentFixture<EmployeeEditProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeEditProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
