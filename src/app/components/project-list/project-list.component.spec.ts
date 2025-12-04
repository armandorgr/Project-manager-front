import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from '../../services/project.service';
import { Response } from '../../model/api.types';
import { Project } from '../../model/projects/project.interface';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectService: ProjectService;

  const mockProjects: Project[] = [
    { id: '1', name: 'Project 1', description: 'Description 1' },
    { id: '2', name: 'Project 2', description: 'Description 2' }
  ];

  const mockResponse: Response<Project[]> = {
    status: 'SUCCESS',
    data: mockProjects
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjectListComponent, HttpClientTestingModule ],
      providers: [ ProjectService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    spyOn(projectService, 'getProjects').and.returnValue(of(mockResponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch projects on init', () => {
    expect(component.projects.length).toBe(2);
    expect(component.projects).toEqual(mockProjects);
  });
});
