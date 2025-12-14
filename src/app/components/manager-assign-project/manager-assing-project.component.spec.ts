import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAssingProjectComponent } from './manager-assing-project.component';

describe('ManagerAssingProjectComponent', () => {
  let component: ManagerAssingProjectComponent;
  let fixture: ComponentFixture<ManagerAssingProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerAssingProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAssingProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
