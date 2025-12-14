import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAddProjectComponent } from './manager-add-project.component';

describe('ManagerAddProjectComponent', () => {
  let component: ManagerAddProjectComponent;
  let fixture: ComponentFixture<ManagerAddProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerAddProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
