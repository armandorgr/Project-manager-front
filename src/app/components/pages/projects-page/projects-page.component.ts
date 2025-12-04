import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProjectService } from '../../../services/project.service';
import { ProjectCardComponent } from '../../project-card/project-card.component';
import { Project } from '../../../model/projects/project.interface';
import { FieldConfig } from '../../../shared/dynamic-forms/interfaces/dynamic-field.interface';
import { Validators } from '@angular/forms';
import { DialogService } from '../../../shared/service/dialog.service';
import { filter, switchMap } from 'rxjs';
import { projectFormConfig } from '../../../shared/forms/projects/project.form';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ProjectCardComponent,
  ],
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);
  private readonly dialogService = inject(DialogService);

  projects = signal<Project[]>([]);
  search = signal('');
  // Filtro reactivo usando signals
  filteredProjects = computed(() => {
    const text = this.search().toLowerCase();
    if (!text) return this.projects();

    return this.projects().filter(
      (p) =>
        p.name.toLowerCase().includes(text) ||
        (p.description?.toLowerCase() ?? '').includes(text)
    );
  });

  openCreateModal() {
    this.dialogService
      .openFormDialog(projectFormConfig, 'New project')
      .pipe(
        filter((result) => result),
        switchMap((result) => {
          return this.projectService.createProject(result);
        })
      )
      .subscribe({
        next: (createResult) => {
          this.dialogService
            .openResponseDialog(
              createResult,
              createResult.ok
                ? 'Project created successfully'
                : 'Error trying to create project'
            )
            .subscribe(() => {
              if (createResult.ok && createResult.body?.data) {
                const newProject = createResult.body.data;
                this.projects.update((projects) => [newProject, ...projects]);
              }
            });
        },
      });
  }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((response) => {
      const data = response.body?.data ?? [];
      this.projects.set(data);
    });
  }
}
