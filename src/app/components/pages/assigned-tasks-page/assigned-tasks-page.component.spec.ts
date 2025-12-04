import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTasksPageComponent } from './assigned-tasks-page.component';

describe('AssignedTasksPageComponent', () => {
  let component: AssignedTasksPageComponent;
  let fixture: ComponentFixture<AssignedTasksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedTasksPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedTasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
