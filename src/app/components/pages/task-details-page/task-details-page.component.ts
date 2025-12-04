import { Component, inject, Input, OnInit, signal } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  Location,
  TitleCasePipe,
} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {
  Task,
  TaskPriority,
  TaskStatus,
} from '../../../model/tasks/task.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import {
  FieldConfig,
  FieldOption,
} from '../../../shared/dynamic-forms/interfaces/dynamic-field.interface';
import { Validators } from '@angular/forms';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../model/comments/comment.interface';
import { CommentCardComponent } from '../../comment-card/comment-card.component';
import { DialogService } from '../../../shared/service/dialog.service';
import { filter, forkJoin, map, Observable, switchMap } from 'rxjs';
import { TaskPriorityPipe, TaskStatusPipe } from '../../../shared/pipe';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../model/projects/project.interface';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../model/auth/user.interface';

@Component({
  selector: 'app-task-details-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    DatePipe,
    TitleCasePipe,
    CommentCardComponent,
    TaskPriorityPipe,
    TaskStatusPipe,
  ],
  templateUrl: './task-details-page.component.html',
  styleUrl: './task-details-page.component.scss',
})
export class TaskDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly taskService: TaskService = inject(TaskService);
  private readonly projectService = inject(ProjectService);
  private readonly commentService = inject(CommentService);
  private readonly authService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly dialogService = inject(DialogService);
  private readonly location = inject(Location);

  @Input() private readonly id!: string;
  @Input() private readonly taskId!: string;
  task = signal<Task | null>(null);
  currentUser = signal<User | null>(null);
  project = signal<Project | null>(null);
  comments = signal<Comment[]>([]);
  taskFormConfig: FieldConfig[] = [];
  commentFormConfig: FieldConfig[] = [
    {
      name: 'content',
      label: 'Content',
      type: 'textarea',
      validations: [Validators.required, Validators.minLength(10)],
    },
  ];

  ngOnInit(): void {
    if (!this.id) {
      this.location.back();
      return;
    }
    forkJoin({
      project: this.projectService.getProjectById(this.id),
      task: this.taskService.getById(this.id, this.taskId),
      auth: this.authService.checkAuth(),
      comments: this.commentService.getTaskComments(this.id, this.taskId),
    }).subscribe({
      next: (results) => {
        this.project.set(results.project.body?.data ?? null);
        this.task.set(results.task.body?.data ?? null);
        this.currentUser.set(results.auth.body?.data ?? null);
        if (results.comments.ok) {
          console.log(results.comments.body?.data);
          
          this.comments.set(results.comments.body?.data ?? []);
        }
      },
      error: (err) => {
        console.error('Error al cargar los datos:', err);
        this.location.back();
      },
    });
    const memberOptions$ = this.projectService.getAllMembers(this.id).pipe(
      map((response) =>
        response.body?.data?.map((member) => {
          const obj: FieldOption = {
            label: member.user.username,
            value: member.user.id,
          };
          return obj;
        })
      )
    );
    this.taskFormConfig = [
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
      {
        name: 'assignedUser',
        label: 'Assign to Member',
        type: 'select',
        asyncOptions: memberOptions$,
        validations: [Validators.required],
      },
    ];
  }

  openUpdateDialog() {
    console.log(this.task());
    
    this.dialogService
      .openFormDialog(this.taskFormConfig, 'Update task', {...this.task(), assignedUser: this.task()?.assignedUser?.id})
      .pipe(
        filter((result) => result),
        switchMap((result) => {
          return this.taskService.update(result, this.id, this.taskId);
        })
      )
      .subscribe({
        next: (updateResult) => {
          this.dialogService
            .openResponseDialog(
              updateResult,
              updateResult.ok
                ? 'Task updated successfully'
                : 'Erro trying to update task'
            )
            .subscribe(() => {
              if (updateResult.ok && updateResult.body?.data) {
                this.task.set(updateResult.body.data);
              }
            });
        },
      });
  }

  openDeleteDialog() {
    this.dialogService
      .openConfirrmDialog('Are you sure you want to delete this task?')
      .pipe(
        filter((result) => result),
        switchMap(() => {
          return this.taskService.delete(this.id, this.taskId);
        })
      )
      .subscribe({
        next: (deleteResult) => {
          this.dialogService
            .openResponseDialog(
              deleteResult,
              deleteResult.ok
                ? 'Task deleted successfully'
                : 'Error trying to delete the task'
            )
            .subscribe(() => {
              if (deleteResult.ok) {
                this.router.navigate(['../../'], { relativeTo: this.route });
              }
            });
        },
      });
  }

  openCreateCommentDialog() {
    this.dialogService
      .openFormDialog(this.commentFormConfig, 'New comment')
      .pipe(
        filter((result) => result),
        switchMap((result) => {          
          return this.commentService.create(this.id, this.taskId, result);
        })
      )
      .subscribe({
        next: (createResult) => {
          this.dialogService
            .openResponseDialog(
              createResult,
              createResult.ok
                ? 'Comment created successfully'
                : 'Error trying to create comment'
            )
            .subscribe(() => {
              if (createResult.ok && createResult.body?.data) {
                const newComment = createResult.body.data;
                this.comments.update((comments) => [...comments, newComment]);
              }
            });
        },
      });
  }

  updateComment(comment: Comment) {
    this.commentService
      .update(this.id, this.taskId, comment)
      .subscribe((updateResult) => {
        this.dialogService
          .openResponseDialog(
            updateResult,
            updateResult ? 'Comment edited' : 'Error trying to edit comment'
          )
          .subscribe({
            next: () => {
              if (updateResult.ok && updateResult.body?.data) {
                const updatedComment = updateResult.body.data;
                this.comments.update((comments) =>
                  comments.map((c) =>
                    c.id === updatedComment.id ? updatedComment : c
                  )
                );
              }
            },
          });
      });
  }

  deleteComment(commentId: string) {
    this.commentService
      .delete(this.id, this.taskId, commentId)
      .subscribe((deleteResult) => {
        this.dialogService
          .openResponseDialog(
            deleteResult,
            deleteResult.ok
              ? 'Comment deleted'
              : 'Error trying to delete comment'
          )
          .subscribe({
            next: () => {
              if (deleteResult.ok) {
                this.comments.update((comments) =>
                  comments.filter((comment) => comment.id !== commentId)
                );
              }
            },
          });
      });
  }

  // Función simple para formatear el texto del enum (elimina guiones bajos)
  formatEnum(value: string): string {
    return value.replaceAll('_', ' ');
  }
}
