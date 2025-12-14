import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEditProjectComponent } from './manager-edit-project.component';

describe('ManagerEditProjectComponent', () => {
  let component: ManagerEditProjectComponent;
  let fixture: ComponentFixture<ManagerEditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerEditProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
