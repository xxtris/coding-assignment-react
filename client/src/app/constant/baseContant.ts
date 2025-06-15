
export enum ETicketStatus {
  ALL = 'all', 
  COMPLETED = 'completed',
  INCOMPLETE = 'incomplete'
}

export const FILTER_OPTIONS = [
  { value: ETicketStatus.ALL, label: 'All' },
  { value: ETicketStatus.COMPLETED, label: 'Completed' },
  { value: ETicketStatus.INCOMPLETE, label: 'Incomplete' },
];