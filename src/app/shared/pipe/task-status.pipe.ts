import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../../model/tasks/task.interface';

@Pipe({
  name: 'taskStatus',
  standalone: true,
})
export class TaskStatusPipe implements PipeTransform {
  transform(value: TaskStatus): string {
    switch (value) {
      case TaskStatus.DONE:
        return 'check_circle';
      case TaskStatus.IN_PROGRESS:
        return 'pending';
      case TaskStatus.NOT_STARTED:
        return 'radio_button_unchecked';
      default:
        return 'help';
    }
  }
}
