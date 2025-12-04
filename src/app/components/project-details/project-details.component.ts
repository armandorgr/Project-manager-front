import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Project } from '../../model/projects/project.interface';
import {
  Task,
  TaskPriority,
  TaskStatus,
} from '../../model/tasks/task.interface';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { FieldConfig } from '../../shared/dynamic-forms/interfaces/dynamic-field.interface';
import { FormControl, Validators } from '@angular/forms';
import { DialogService } from '../../shared/service/dialog.service';
import { filter, switchMap } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { SendInvitation } from '../../model/projects/invitation.interface';
import { MemberListComponent } from '../member-list/member-list.component';
import { Member } from '../../model/projects/member.interface';
import { User } from '../../model/auth/user.interface';
import { AuthenticationService } from '../../services/authentication.service';
import { projectFormConfig } from '../../shared/forms/projects/project.form';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    TaskCardComponent,
    MatTabsModule,
    MemberListComponent,
  ],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);
  private readonly taskService = inject(TaskService);
  private readonly dialogService = inject(DialogService);
  private readonly authService = inject(AuthenticationService);
  private id!: string;

  project = signal<Project | null>(null);
  currentUser = signal<User | null>(null);
  tasks = signal<Task[]>([]);
  members = signal<Member[]>([]);
  loading = signal(true);
  taskFormConfig: FieldConfig[] = [
    {
      name: 'name',
      label: 'Name of the task',
      type: 'text',
      validations: [Validators.required, Validators.minLength(3)],
    },
    {
      name: 'description',
      label: 'Description of the task',
      type: 'textarea',
      validations: [Validators.required, Validators.minLength(10)],
    },
    {
      name: 'status',
      label: 'Status of the task',
      type: 'select',
      options: [
        { label: 'Not started', value: TaskStatus.NOT_STARTED },
        { label: 'In progress', value: TaskStatus.IN_PROGRESS },
        { label: 'Done', value: TaskStatus.DONE },
      ],
    },
    {
      name: 'priority',
      label: 'Priority of the task',
      type: 'select',
      options: [
        { label: 'Low', value: TaskPriority.LOW },
        { label: 'Medium', value: TaskPriority.MEDIUM },
        { label: 'High', value: TaskPriority.HIGH },
      ],
    },
    {
      name: 'dueDate',
      type: 'date',
      label: 'Due date of the task',
      validations: [Validators.required],
    },
  ];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (!this.id) return;
    this.projectService.getProjectById(this.id).subscribe((response) => {
      this.project.set(response.body?.data ?? null);
    });

    this.taskService.getAllTaskByProject(this.id).subscribe((response) => {
      this.tasks.set(response.body?.data ?? []);
      this.loading.set(false);
    });
    this.projectService.getAllMembers(this.id).subscribe((result) => {
      this.members.set(result.body?.data ?? []);
    });
    this.authService.checkAuth().subscribe((response) => {
      this.currentUser.set(response.body?.data!);
    });
  }

  navigateTaskDetails(task: Task) {
    this.router.navigate([`tasks/${task.id}`], { relativeTo: this.route });
  }

  openUpdateProjectDialog() {
    this.dialogService
      .openFormDialog(projectFormConfig, 'Update project', this.project())
      .pipe(
        filter((result) => result),
        switchMap((result) => {
          return this.projectService.update(result, this.id);
        })
      )
      .subscribe({
        next: (updateResult) => {
          this.dialogService
            .openResponseDialog(
              updateResult,
              updateResult.ok
                ? 'Project updated successfully'
                : 'Error trying to update project'
            )
            .subscribe(() => {
              if (updateResult.ok && updateResult.body?.data) {
                this.project.set({
                  ...updateResult.body.data,
                  role: this.project()?.role,
                });
              }
            });
        },
      });
  }

  openDeleteDialog() {
    this.dialogService
      .openConfirrmDialog('Are you sure you want to delete this project?')
      .pipe(
        filter((response) => response),
        switchMap(() => {
          return this.projectService.delete(this.id);
        })
      )
      .subscribe({
        next: (deleteResult) => {
          this.dialogService
            .openResponseDialog(
              deleteResult,
              deleteResult.ok
                ? 'Project deleted successfully'
                : 'Error trying to delete project'
            )
            .subscribe(() => {
              if (deleteResult.ok) {
                this.router.navigate(['..'], { relativeTo: this.route });
              }
            });
        },
      });
  }

  openCreateTaskDialog() {
    this.dialogService
      .openFormDialog(this.taskFormConfig, 'New task')
      .pipe(
        (result) => result,
        switchMap((result) => {
          return this.taskService.create(result, this.id);
        })
      )
      .subscribe({
        next: (createResult) => {
          this.dialogService
            .openResponseDialog(
              createResult,
              createResult.ok
                ? 'Task created successfully'
                : 'Error trying to create task'
            )
            .subscribe(() => {
              if (createResult.ok && createResult.body?.data) {
                const newTask = createResult.body.data;
                this.tasks.update((tasks) => {
                  return [newTask, ...tasks];
                });
              }
            });
        },
      });
  }

  openInviteDialog() {
    this.dialogService
      .openFormDialog(
        [
          {
            name: 'query',
            label: 'Email or username',
            type: 'text',
            validations: [Validators.required, Validators.minLength(3)],
          },
        ],
        'Invite user'
      )
      .subscribe((result) => {
        if (!result?.query) return;
        const value = result.query;
        const isEmail = Validators.email(new FormControl(value)) === null;
        const payload: Partial<SendInvitation> = isEmail
          ? { email: value }
          : { username: value };
        this.projectService.invite(this.id, payload).subscribe({
          next: (response) =>
            this.dialogService.openResponseDialog(
              response,
              response.ok
                ? 'Invitation sent'
                : response.body?.message ?? 'Error trying to send invitation'
            ),
        });
      });
  }
  onMemberRemove(member: Member) {
    this.dialogService
      .openConfirrmDialog(
        `Are you sure you want to eliminate ${member.user.username} from the project?`
      )
      .pipe(filter((response) => response))
      .subscribe(() => {
        this.projectService
          .kickMember(this.id, member.user.id)
          .subscribe((response) => {
            if (response.ok) {
              this.members.update((members) =>
                members.filter((m) => m.user.id !== member.user.id)
              );
            }
          });
      });
  }
}
