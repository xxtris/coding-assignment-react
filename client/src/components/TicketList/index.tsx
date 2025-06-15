import { TicketWithAssignee } from "@acme/shared-models";
import {
  Chip,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export interface TicketListProps {
  tickets: TicketWithAssignee[] | null;
  onClickTicket: (ticketId: TicketWithAssignee["id"]) => void;
}

const TicketList = (props: TicketListProps) => {
  const { tickets, onClickTicket } = props;

  function handleTicketClick(ticketId: TicketWithAssignee["id"]) {
    onClickTicket?.(ticketId);
  }

  return (
    <>
      {tickets ? (
        <List
          sx={{ width: "100%", minHeight: 250, bgcolor: "background.paper" }}
        >
          {tickets.map((ticket) => (
            <ListItemButton
              key={ticket.id}
              sx={{
                border: "1px solid #ffff",
                borderRadius: 2,
                marginBottom: 1,
                backgroundColor: "#f5f5f5",
              }}
              onClick={() => {
                handleTicketClick(ticket.id);
              }}
            >
              <ListItemText
                primary={`Ticket: ${ticket.id}, ${ticket.description}`}
                secondary={`Assignee: ${
                  ticket.assigneeId
                    ? ticket.assignee
                      ? ticket.assignee
                      : ticket.assigneeId
                    : "Unassigned"
                }`}
              />
              <ListItemIcon>
                {ticket.completed ? (
                  <Chip label="Completed" color="success" />
                ) : (
                  <Chip label="Incomplete" color="warning" />
                )}
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No tickets found...
        </Typography>
      )}
    </>
  );
};

export default TicketList;
