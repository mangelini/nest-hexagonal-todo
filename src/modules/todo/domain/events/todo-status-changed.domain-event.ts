import { DomainEvent, DomainEventProps } from '@libs/ddd';
import { TodoStatus } from '../todo.types';

export class TodoStatusChangedDomainEvent extends DomainEvent {
  readonly oldStatus: TodoStatus;

  readonly newStatus: TodoStatus;

  constructor(props: DomainEventProps<TodoStatusChangedDomainEvent>) {
    super(props);
    this.oldStatus = props.oldStatus;
    this.newStatus = props.newStatus;
  }
}
