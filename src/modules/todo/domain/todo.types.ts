import { AggregateID } from "@src/libs/ddd"

export interface TodoProps {
  title: string,
  description: string,
  status: TodoStatus,
  userId: AggregateID
}

export enum TodoStatus {
  active = 'active',
  completed = 'completed',
  archived = 'archived'
}