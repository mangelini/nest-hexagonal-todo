import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { TodoStatus } from '../../domain/todo.types';

@Injectable()
export class TodoStatusValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    value = value.toLowerCase();

    if (!this.isValid(value)) {
      throw new BadRequestException(`Invalid status value: ${value}`);
    }

    return value as TodoStatus;
  }

  private isValid(value: any): boolean {
    const enumValues = Object.values(TodoStatus);
    return enumValues.includes(value);
  }
}
