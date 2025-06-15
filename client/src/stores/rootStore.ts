import { TicketStore } from "./ticketStore";

export class RootStore {
    ticketStore: TicketStore;

    constructor() {
        this.ticketStore = new TicketStore();
    }
}