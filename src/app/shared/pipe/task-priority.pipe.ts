import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../../model/tasks/task.interface';

@Pipe({
  name: 'taskPriority',
  standalone: true,
})
export class TaskPriorityPipe implements PipeTransform {
  transform(value: TaskPriority): string {
    switch (value) {
      case TaskPriority.HIGH:
        return 'keyboard_double_arrow_up';
      case TaskPriority.MEDIUM:
        return 'keyboard_arrow_up';
      case TaskPriority.LOW:
        return 'keyboard_arrow_down';
      default:
        return 'remove';
    }
  }
}
