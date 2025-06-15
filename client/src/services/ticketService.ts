import { Ticket } from "@acme/shared-models";
import { request } from "./apiClient";

export const ticketService = {
    getAllTicket: () => request<Ticket[]>('GET', '/api/tickets'),
    getTicket: (id: number) => request<Ticket>('GET', `/api/tickets/${id}`),
    createTicket: (description: string) => request<Ticket>('POST', '/api/tickets', { description }),
    assignUser : (ticketId: number, userId: number) => request<unknown>('PUT', `/api/tickets/${ticketId}/assign/${userId}`),
    unAssignUser: (ticketId: number) => request<unknown>('PUT', `/api/tickets/${ticketId}/unassign`),
    completeTicket: (ticketId: number) => request<unknown>('PUT', `/api/tickets/${ticketId}/complete`),
    incompleteTicket: (ticketId: number) => request<unknown>('DELETE', `/api/tickets/${ticketId}/complete`),
}