import { Ticket, TicketWithAssignee } from '@acme/shared-models';
import { Button} from '@mui/material'
import { memo, useEffect, useState } from 'react'

export interface UpdateStatusTicketProps {
    loading?: boolean,
    ticket: Ticket | TicketWithAssignee,
    onChange?: (newStatus: Ticket['completed']) => void,
}

const UpdateStatusTicket = (props: UpdateStatusTicketProps) => {
    const { loading, ticket, onChange } = props;
    // const [ isCompleted, setIsCompleted] = useState<Ticket['completed']>(ticket.completed);

    useEffect(() => {
        // setIsCompleted(ticket.completed);
    }, [ticket.completed])

    const handleChangeStatus = (newStatus: Ticket['completed']) => {
        // setIsCompleted(newStatus);
        onChange?.(newStatus);
    };

  return (
    <>
    {ticket.completed ? (
        <Button
        variant="outlined"
        color="warning"
        size="medium"
        loading={loading}
        loadingIndicator="Updating…"
        onClick={() => handleChangeStatus(false)}
        >
        Change to Incomplete
        </Button>
    ) : (
        <Button
        variant="contained"
        color="primary"
        size="medium"
        loading={loading}
        loadingIndicator="Updating…"
        onClick={() => handleChangeStatus(true)}
        >
        Mark as Completed
        </Button> 
    )}
    </>
  )
}

export default memo(UpdateStatusTicket);