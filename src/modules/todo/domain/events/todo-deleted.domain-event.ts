import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class TodoDeletedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<TodoDeletedDomainEvent>) {
    super(props);
  }
}
