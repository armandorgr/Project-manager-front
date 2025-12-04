import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../model/tasks/task.interface';
import { TaskCardComponent } from "../../task-card/task-card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-assigned-tasks-page',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './assigned-tasks-page.component.html',
  styleUrl: './assigned-tasks-page.component.scss',
})
export class AssignedTasksPageComponent implements OnInit {
  private readonly taskService = inject(TaskService); 
  private readonly router = inject(Router); 
  tasks = signal<Task[]>([]);

  ngOnInit() {
    this.taskService.getAllAssignedTasks().subscribe((tasks) => {
      if (tasks.ok && tasks.body?.data) {
        this.tasks.set(tasks.body.data);
      }
    });
  }

  navigateDetails(task: Task){
    this.router.navigateByUrl(`/home/projects/${task.project}/tasks/${task.id}`);
  }
}
