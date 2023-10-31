import { Command, CommandProps } from '@libs/ddd';

export class UpdateTodoDescriptionCommand extends Command {
  readonly description: string;

  constructor(props: CommandProps<UpdateTodoDescriptionCommand>) {
    super(props);
    this.description = props.description;
  }
}
