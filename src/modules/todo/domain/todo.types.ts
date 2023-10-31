import { AggregateID } from '@src/libs/ddd';

export interface TodoProps {
  status: TodoStatus;
  userId: AggregateID;
  title: string;
  description: string;
}

export interface CreateTodoProps {
  userId: AggregateID;
  title: string;
  description: string;
}

export enum TodoStatus {
  active = 'active',
  completed = 'completed',
  archived = 'archived',
}
