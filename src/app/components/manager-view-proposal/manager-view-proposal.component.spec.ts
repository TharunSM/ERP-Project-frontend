import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewProposalComponent } from './manager-view-proposal.component';

describe('ManagerViewProposalComponent', () => {
  let component: ManagerViewProposalComponent;
  let fixture: ComponentFixture<ManagerViewProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerViewProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
