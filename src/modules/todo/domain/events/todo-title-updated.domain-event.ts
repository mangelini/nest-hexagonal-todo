import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class TodoTitleUpdatedDomainEvent extends DomainEvent {
  public readonly title: string;

  constructor(props: DomainEventProps<TodoTitleUpdatedDomainEvent>) {
    super(props);
    this.title = props.title;
  }
}
