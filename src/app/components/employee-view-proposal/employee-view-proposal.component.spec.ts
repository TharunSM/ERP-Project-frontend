import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewProposalComponent } from './employee-view-proposal.component';

describe('EmployeeViewProposalComponent', () => {
  let component: EmployeeViewProposalComponent;
  let fixture: ComponentFixture<EmployeeViewProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeViewProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
