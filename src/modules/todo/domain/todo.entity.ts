import { CreateTodoProps, TodoProps, TodoStatus } from './todo.types';
import { AggregateID, AggregateRoot } from '@src/libs/ddd';
import * as crypto from 'crypto';
import { TodoCreatedDomainEvent } from './events/todo-created.domain-event';
import { TodoStatusChangedDomainEvent } from './events/todo-status-changed.domain-event';
import { TodoDeletedDomainEvent } from './events/todo-deleted.domain-event';
import { TodoTitleUpdatedDomainEvent } from './events/todo-title-updated.domain-event';
import { TodoDescriptionUpdatedDomainEvent } from './events/todo-description-updated.domain-event';

export class TodoEntity extends AggregateRoot<TodoProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateTodoProps): TodoEntity {
    const id = crypto.randomUUID();
    const props: TodoProps = { ...create, status: TodoStatus.active };
    const todo = new TodoEntity({ id, props });

    todo.addEvent(
      new TodoCreatedDomainEvent({
        aggregateId: id,
        userId: props.userId,
        title: props.title,
      }),
    );

    return todo;
  }

  get status(): TodoStatus {
    return this.props.status;
  }

  updateStatus(newStatus: TodoStatus): void {
    this.addEvent(
      new TodoStatusChangedDomainEvent({
        aggregateId: this.id,
        oldStatus: this.status,
        newStatus,
      }),
    );

    this.props.status = newStatus;
  }

  updateTitle(title: string): void {
    this.props.title = title;

    this.addEvent(
      new TodoTitleUpdatedDomainEvent({
        aggregateId: this.id,
        title: this.props.title,
      }),
    );
  }

  updateDescription(description: string): void {
    this.props.description = description;

    this.addEvent(
      new TodoDescriptionUpdatedDomainEvent({
        aggregateId: this.id,
        description: this.props.description,
      }),
    );
  }

  delete(): void {
    this.addEvent(
      new TodoDeletedDomainEvent({
        aggregateId: this.id,
      }),
    );
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
