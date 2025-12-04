import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Task,
  TaskPriority,
  TaskStatus,
} from '../../model/tasks/task.interface';
import { TaskStatusPipe, TaskPriorityPipe } from '../../shared/pipe';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    TaskStatusPipe,
    TaskPriorityPipe,
  ],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Input({ required: true }) taskId!: string;
  @Output() navigate = new EventEmitter<Task>();

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  onClick(): void {
    this.navigate.emit(this.task);
  }
}
