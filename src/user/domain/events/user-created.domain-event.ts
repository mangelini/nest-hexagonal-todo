import { DomainEvent, DomainEventProps } from '@libs/ddd';

export class UserCreatedDomainEvent extends DomainEvent {
  readonly username: string;

  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props);
    this.username = props.username;
  }
}
