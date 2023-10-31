import { Command, CommandProps } from '@libs/ddd';

export class UpdateTodoTitleCommand extends Command {
  readonly title: string;

  constructor(props: CommandProps<UpdateTodoTitleCommand>) {
    super(props);
    this.title = props.title;
  }
}
