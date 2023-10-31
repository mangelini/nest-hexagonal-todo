import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class TodoDescriptionUpdatedDomainEvent extends DomainEvent {
  public readonly description: string;

  constructor(props: DomainEventProps<TodoDescriptionUpdatedDomainEvent>) {
    super(props);
    this.description = props.description;
  }
}
