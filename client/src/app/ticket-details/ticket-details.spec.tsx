import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TicketDetails from './ticket-details';
import { useStore } from 'client/src/hooks/useStore';

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => jest.fn()
}));

// Mock the store
jest.mock('client/src/hooks/useStore', () => ({
  useStore: jest.fn()
}));

describe('TicketDetails Component', () => {
  const mockTicket = {
    id: 1,
    description: 'Test Ticket',
    completed: false,
    assigneeId: null as number | null,
    assignee: null as string | null
  };

  const mockTicketStore = {
    getTicketById: mockTicket,
    loading: false,
    userList: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ],
    fetchTicketById: jest.fn(),
    clearTicketById: jest.fn(),
    hanldleAssignTicket: jest.fn(),
    changeTicketStatus: jest.fn()
  };

  beforeEach(() => {
    (useStore as jest.Mock).mockImplementation(() => ({
      ticketStore: mockTicketStore
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    render(
      <BrowserRouter>
        <TicketDetails />
      </BrowserRouter>
    );

    // Verify the ticket details are displayed
    expect(screen.getByText(/Test Ticket/i)).toBeInTheDocument();
    expect(screen.getByText(/Ticket Details/i)).toBeInTheDocument();
  });

  it('should handle assignee change correctly', async () => {
    mockTicketStore.hanldleAssignTicket.mockResolvedValue(undefined);
    
    render(
      <BrowserRouter>
        <TicketDetails />
      </BrowserRouter>
    );

    // Wait for the ticket to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText(/Test Ticket/i)).toBeInTheDocument();
    });

    // Verify initial state shows "Unassigned"
    expect(screen.getByText(/Unassigned/i)).toBeInTheDocument();

    // Find and open the select dropdown
    const selectElement = screen.getByRole('combobox');
    fireEvent.mouseDown(selectElement);

    // Find and click on the menu item for John Doe
    const options = screen.getAllByText('John Doe');
    // Click the first option that is not the combobox display (usually the menu item)
    fireEvent.click(options[options.length - 1]);

    // Verify the store method was called with correct parameters
    expect(mockTicketStore.hanldleAssignTicket).toHaveBeenCalledWith(1, 1);

    // Verify loading state is shown during update
    expect(screen.getByText('Updating…')).toBeInTheDocument();

    // Wait for the update to complete and verify the new assignee is displayed
    await waitFor(() => {
      // Use getAllByText and check at least one is in the document
      expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
    });
  });
});