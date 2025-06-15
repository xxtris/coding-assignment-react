import styles from './tickets.module.css';
import { Stack, Typography } from '@mui/material';
import { useStore } from 'client/src/hooks/useStore';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { TicketWithAssignee } from '@acme/shared-models';
import TicketList from 'client/src/components/TicketList';
import { ETicketStatus, FILTER_OPTIONS } from '../constant/baseContant';
import AddTicket from 'client/src/components/AddTicket';
import FilterTicket from 'client/src/components/FilterTicket';


export interface TicketsProps {
}

export function Tickets(props: TicketsProps) {
  const { ticketStore } = useStore();
  const navigate = useNavigate();
  
  useEffect(() => {
      ticketStore.fetchTickets();
  }, [])

  const handleFilterChange = (newValue: ETicketStatus | string) => {
    ticketStore.changeFilterStatus(newValue);
  }

  const handleAddTicket = useCallback((desciption: string) => {
    ticketStore.addTicket(desciption).then(() => {
      ticketStore.changeFilterStatus(ETicketStatus.ALL);
      console.log("Ticket added successfully:", desciption); // TODO: update UI
    }).catch((error) => {
      console.error("Failed to add ticket:", error); // TODO: update UI
    });
  }, [])

  const hanldeClickTicket = useCallback((ticketId: TicketWithAssignee['id']) => {
    navigate(`/${ticketId}`);
  }, [])

  return (
    <Stack flexDirection="column" className={styles['tickets']}>
      <Stack>
        <h2>Tickets</h2>
        <AddTicket isPending={ticketStore.isLoading} onAddTicket={handleAddTicket}/>
        <FilterTicket value={ticketStore.statusFilter} label={'Filter'} options={FILTER_OPTIONS} onChange={handleFilterChange}/>
      </Stack>
      
      {ticketStore.isLoading
        ? <Typography variant="body1" sx={{ textAlign: "center", marginTop: 2 }}>
          Loading tickets...
        </Typography>
        : <TicketList tickets={ticketStore.ticketListFiltered} onClickTicket={hanldeClickTicket}/>}
    </Stack>
  );
}

export default observer(Tickets);
