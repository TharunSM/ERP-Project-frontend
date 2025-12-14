import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewProjectComponent } from './manager-view-project.component';

describe('ManagerViewProjectComponent', () => {
  let component: ManagerViewProjectComponent;
  let fixture: ComponentFixture<ManagerViewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerViewProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
