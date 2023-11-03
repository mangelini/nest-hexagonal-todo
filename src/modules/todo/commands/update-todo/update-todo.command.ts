import { Command, CommandProps } from '@libs/ddd';
import { TodoStatus } from '../../domain/todo.types';

export class UpdateTodoCommand extends Command {
  readonly todoId: string;
  readonly title?: string;
  readonly description?: string;
  readonly status?: TodoStatus;

  constructor(props: CommandProps<UpdateTodoCommand>) {
    super(props);
    this.todoId = props.todoId;
    this.title = props.title;
    this.description = props.description;
    this.status = props.status;
  }
}
