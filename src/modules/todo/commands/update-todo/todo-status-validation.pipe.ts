import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TodoStatus } from '../../domain/todo.types';

export class TodoStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TodoStatus.active,
    TodoStatus.completed,
    TodoStatus.archived,
  ];

  transform(value: any) {
    if (value && typeof value === 'string') {
      value = value.toUpperCase();

      if (!this.isStatusValid(value)) {
        throw new BadRequestException(`"${value}" is an invalid status`);
      }
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
