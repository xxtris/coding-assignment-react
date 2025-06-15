import { TicketWithAssignee, User } from "@acme/shared-models";
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { memo } from "react";
import AssignTicket from "./AssignTicket";
import UpdateStatusTicket from "./UpdateStatusTicket";

export interface CardTicketProps {
  ticket: TicketWithAssignee;
  users?: User[];
  isUpdatingStatus?: boolean;
  isUpdatingAssignee?: boolean;
  onChangeAssignee?: (userId: User["id"] | null) => void;
  onChangeStatus?: (completed: TicketWithAssignee["completed"]) => void;
}

const CardTicket = (props: CardTicketProps) => {
  const {
    ticket,
    users = [],
    isUpdatingAssignee,
    isUpdatingStatus,
    onChangeAssignee,
    onChangeStatus,
  } = props;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6" component="div">
          Ticket: {ticket.id}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {ticket.description}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Assignee:
          <Typography
            component={"span"}
            sx={{ color: "text.secondary", fontWeight: "bold" }}
          >
            {ticket.assignee}
          </Typography>
        </Typography>
        {ticket.completed ? (
          <Chip label="Completed" color="success" />
        ) : (
          <Chip label="Incomplete" color="warning" />
        )}
      </CardContent>
      <Divider>ACTION</Divider>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          component={"span"}
          sx={{ color: "text.secondary" }}
        >
          Change Assignee:
        </Typography>

        {ticket && (<AssignTicket
          loading={isUpdatingAssignee}
          value={ticket.assigneeId}
          options={users}
          onChange={onChangeAssignee}
        />)}
        {ticket && (
          <UpdateStatusTicket
            loading={isUpdatingStatus}
            ticket={ticket}
            onChange={onChangeStatus}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default memo(CardTicket);
