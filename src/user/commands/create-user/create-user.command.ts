import { Command, CommandProps } from '@libs/ddd';

export class CreateUserCommand extends Command {
  readonly username: string;

  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.username = props.username;
  }
}
