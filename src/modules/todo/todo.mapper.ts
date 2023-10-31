import { Mapper } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { TodoEntity } from './domain/todo.entity';
import { TodoModel } from './database/todo.repository';
import { TodoResponseDto } from './dtos/todo.response.dto';

@Injectable()
export class TodoMapper
  implements Mapper<TodoEntity, TodoModel, TodoResponseDto>
{
  toPersistence(entity: TodoEntity): TodoModel {
    const copy = entity.getProps();
    const record: TodoModel = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      status: copy.status,
      title: copy.title,
      description: copy.description,
      userId: copy.userId,
    };
    return record;
  }

  toDomain(record: TodoModel): TodoEntity {
    const entity = new TodoEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        title: record.title,
        description: record.description,
        status: record.status,
        userId: record.userId,
      },
    });
    return entity;
  }

  toResponse(entity: TodoEntity): TodoResponseDto {
    const props = entity.getProps();
    const response = new TodoResponseDto(entity);
    response.title = props.title;
    response.description = response.description;
    return response;
  }
}
