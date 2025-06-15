import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Tickets from './tickets';
import { useStore } from 'client/src/hooks/useStore';

// Mock the store
jest.mock('client/src/hooks/useStore', () => ({
  useStore: jest.fn()
}));

describe('Tickets', () => {
  // Mock store implementation
  const mockTicketStore = {
    tickets: [],
    isLoading: false,
    statusFilter: 'ALL',
    ticketListFiltered: [],
    fetchTickets: jest.fn(() => Promise.resolve()),
    changeFilterStatus: jest.fn(() => Promise.resolve()),
    addTicket: jest.fn(() => Promise.resolve()),
  };

  const newTicket = { id: 1, description: 'New Test Ticket', assigneeId: null , completed: false }

  beforeEach(() => {
    // Reset mock implementation before each test
    (useStore as jest.Mock).mockImplementation(() => ({
      ticketStore: mockTicketStore
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new ticket when form is submitted', async () => {
    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );

    // Get the input field and button
    const input = screen.getByPlaceholderText('Add ticket...');
    const addButton = screen.getByText('Add Ticket');

    // Type in the description
    fireEvent.change(input, { target: { value: newTicket.description } });
    expect(input).toHaveValue(newTicket.description);

    // Submit the form by clicking the button
    fireEvent.click(addButton);

    // Verify that addTicket was called with correct description
    await waitFor(() => {
      expect(mockTicketStore.addTicket).toHaveBeenCalledWith(newTicket.description);
    });

    // Verify that input is cleared after submission
    expect(input).toHaveValue('');

    // Verify that filter is reset to all
    expect(mockTicketStore.changeFilterStatus).toHaveBeenCalledWith('all');

    // Check that the new ticket appears in the TicketList
    // Simulate that ticketListFiltered now contains the new ticket
      mockTicketStore.ticketListFiltered = [newTicket];
    // Re-render to reflect the updated store
    render(
      <BrowserRouter>
      < Tickets />
      </BrowserRouter>
    );
    expect(screen.getByText(`Ticket: ${newTicket.id}, ${newTicket.description}`)).toBeInTheDocument();
  });
})