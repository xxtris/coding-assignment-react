import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ticketService } from '../services/ticketService';
import { Ticket, TicketWithAssignee, User } from '@acme/shared-models';
import { userService } from '../services/userService';
import { ETicketStatus } from '../app/constant/baseContant';

export class TicketStore {
  tickets: Ticket[] = [];
  users: User[] = [];
  ticketById: Ticket | null = null;
  loading: boolean = false;
  error: string | unknown = null;
  statusFilter: ETicketStatus | string = ETicketStatus.ALL;

  constructor() {
    makeObservable(this, {
        tickets: observable,
        users: observable,
        loading: observable,
        statusFilter: observable,
        ticketById: observable,

        fetchTickets: action,
        fetchUsers: action,
        addTicket: action,

        fetchTicketById: action,
        changeFilterStatus: action,
        changeTicketStatus: action,

        isLoading: computed,
        ticketList: computed,
        userList: computed,
        ticketListFiltered: computed,
        getTicketById: computed
    })
  }

  fetchTickets = async () => {
    this.loading = true;
    this.error = null;
    
    try {
      const response = await ticketService.getAllTicket()
      runInAction(() => {
        this.tickets = response;
        this.loading = false;
      });
    } catch (err: string | unknown) {
      runInAction(() => {
        this.error = err;
        this.loading = false;
      });
    }
  };

  fetchUsers = async () => {
    this.loading = true;
    this.error = null;
    
    try {
      const response = await userService.getAllUser();
      runInAction(() => {
        this.users = response;
        this.loading = false;
      });
    } catch (err: string | unknown) {
      runInAction(() => {
        this.error = err;
        this.loading = false;
      });
    }
  }

  addTicket = async (desc: string) => {
    this.loading = true;
    this.error = null;

    try {
      const response = await ticketService.createTicket(desc);
      runInAction(() => {
        this.tickets.push(response);
        this.statusFilter = ETicketStatus.ALL;
        this.loading = false;
      });
    } catch (err: string | unknown) {
      runInAction(() => {
        this.error = err;
        this.loading = false;
      });
    }
  };

  changeFilterStatus = (status: ETicketStatus | string = '') => {
    this.statusFilter = status;
  }

  fetchTicketById = async (id: number) => {
    this.loading = true;
    this.error = null;
    
    try {
      const response = await ticketService.getTicket(id);
      runInAction(() => {
        this.ticketById = response;
        this.loading = false;
      });
    } catch (err: string | unknown) {
      runInAction(() => {
        this.error = err;
        this.loading = false;
      });
    }
  };

  changeTicketStatus = async (ticketId: number, isCompleted: boolean) => {
    this.loading = true; 
    this.error = null;
    try {
      if(isCompleted) {
        await ticketService.completeTicket(ticketId);
      } else {
        await ticketService.incompleteTicket(ticketId);
      }
      
      runInAction(() => {
        const index = this.tickets.findIndex(t => t.id === ticketId);
        if (index !== -1) {
          this.tickets[index] = {
            ...this.tickets[index],
            completed: isCompleted
          };
        }
        this.loading = false;
      });
    } catch (err: string | unknown) {
      runInAction(() => { 
        this.error = err;
        this.loading = false;
      });
    }
  };

  hanldleAssignTicket = async (ticketId: number, userId: number | null) => {
    this.loading = true; 
    this.error = null;
    try {
      if(!userId) { // Unassign
        await ticketService.unAssignUser(ticketId);
      } else {
        await ticketService.assignUser(ticketId, userId);
      }
      
      runInAction(() => {
        const index = this.tickets.findIndex(t => t.id === ticketId);
        if (index !== -1) {
          this.tickets[index] = {
            ...this.tickets[index],
            assigneeId: userId || null
          };
        }
        this.loading = false;
      });
    } catch (err: string | unknown) {
      runInAction(() => { 
        this.error = err;
        this.loading = false;
      });
    }
  }
  

  get ticketListFiltered () {
    switch (this.statusFilter) {
      case '':
      case ETicketStatus.ALL:
        return this.ticketList;
      case ETicketStatus.COMPLETED:
        return this.ticketList.filter(ticket => ticket.completed);
      case ETicketStatus.INCOMPLETE:
        return this.ticketList.filter(ticket => !ticket.completed);
      default:
        return [];
    }
  }

  get ticketList() {
    return this.tickets.map((ticket) => ({
      ...ticket,
      assignee: this.users.find(user => user.id === ticket.assigneeId)?.name || null
    })) as TicketWithAssignee[];
  }

  get userList() {
    return this.users;
  }

  get isLoading() {
    return this.loading;
  }

  get getTicketById() {
    return this.ticketById;
  }

  clearTicketById () {
    this.ticketById = null;
  }
}
