import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class TodoCreatedDomainEvent extends DomainEvent {
  readonly userId: string;
  readonly title: string;

  constructor(props: DomainEventProps<TodoCreatedDomainEvent>) {
    super(props);
    this.userId = props.userId;
    this.title = props.title;
  }
}
