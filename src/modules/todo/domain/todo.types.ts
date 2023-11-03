import { AggregateID } from '@src/libs/ddd';

export interface TodoProps {
  id?: string;
  status: TodoStatus;
  userId: AggregateID;
  title: string;
  description: string;
}

export interface CreateTodoProps {
  userId: AggregateID;
  title: string;
  description: string;
  id?: string;
}

export interface UpdateTodoProps {
  todoId: string;
  title?: string;
  description?: string;
  status?: TodoStatus;
}

export enum TodoStatus {
  active = 'active',
  completed = 'completed',
  archived = 'archived',
}
