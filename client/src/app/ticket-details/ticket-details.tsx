import { useNavigate, useParams } from "react-router-dom";
import styles from "./ticket-details.module.css";
import { Button, Stack, Typography } from "@mui/material";
import CardTicket from "client/src/components/CardTicket";
import { useStore } from "client/src/hooks/useStore";
import { useCallback, useEffect, useState } from "react";
import { TicketWithAssignee } from "@acme/shared-models";
import { observer } from "mobx-react-lite";

/* eslint-disable-next-line */
export interface TicketDetailsProps {}

const TicketDetails = (props: TicketDetailsProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { ticketStore } = useStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [ticketDetail, setTicketDetail] = useState<TicketWithAssignee | undefined>();

  useEffect(() => {
    id && ticketStore.fetchTicketById(+id);
  }, [id])

  useEffect(() => {
    return (() => {
        ticketStore.clearTicketById();
    })
  }, [])

  useEffect(() => {    
    if (ticketStore.getTicketById && ticketStore.userList) {
        const assignee = ticketStore.userList.find(
            (user) => user.id === ticketStore.getTicketById?.assigneeId
        );
        setTicketDetail({
            ...ticketStore.getTicketById,
            assignee: assignee ? assignee.name : "Unassigned",
        } as TicketWithAssignee);
    }
  }, [ticketStore.getTicketById, ticketStore.userList]);

  const handleChangeAssignee = useCallback(async (selectedId: null | number) => {
    if (ticketDetail) {
      const updatedTicket = {
        ...ticketDetail,
        assigneeId: selectedId || null,
        assignee: selectedId
          ? ticketStore.userList.find((user) => user.id === selectedId)?.name
          : "Unassigned",
      };
      setIsUpdating(true);
      await ticketStore.hanldleAssignTicket(ticketDetail.id, selectedId);
      setTicketDetail(updatedTicket as TicketWithAssignee);
      setIsUpdating(false);
    }
  }, [ticketDetail])


  const handleChangeStatus = useCallback(async (isCompleted: boolean) => {
    if (ticketDetail) {
      const updatedTicket = {
        ...ticketDetail,
        completed: isCompleted,
      };
      setIsUpdating(true);
      await ticketStore.changeTicketStatus(ticketDetail.id, isCompleted);
      setIsUpdating(false);
      setTicketDetail(updatedTicket);
    }
  }, [ticketDetail])

  return (
    <Stack className={styles["container"]}>
      <h2>Ticket Details</h2>
      <Button
        variant="contained"
        onClick={() => navigate("/", { replace: true })}
      >
        Back
      </Button>

      {ticketDetail ? (
        <CardTicket users={ticketStore.userList}
          ticket={ticketDetail}
          isUpdatingAssignee={isUpdating}
          isUpdatingStatus={isUpdating}
          onChangeAssignee={handleChangeAssignee}
          onChangeStatus={handleChangeStatus}/>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", marginTop: 2 }}>
          {ticketStore.loading ? "Loading ticket details..." : "Ticket not found."}
        </Typography>
      )}
    </Stack>
  );
}

export default observer(TicketDetails);
