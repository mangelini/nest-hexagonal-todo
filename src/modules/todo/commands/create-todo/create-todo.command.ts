import { Command, CommandProps } from '@libs/ddd';

export class CreateTodoCommand extends Command {
  readonly title: string;
  readonly description: string;
  readonly userId: string;

  constructor(props: CommandProps<CreateTodoCommand>) {
    super(props);
    this.title = props.title;
    this.description = props.description;
    this.userId = props.userId;
  }
}
