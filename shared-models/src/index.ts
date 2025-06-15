export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assigneeId: null | number;
  completed: boolean;
};


export type TicketWithAssignee = Ticket & {
  assignee: string | null;
};