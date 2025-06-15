import { User } from '@acme/shared-models';
import { MenuItem, Select } from '@mui/material'
import { memo, useEffect, useState } from 'react'

export interface AssignTicketProps {
    options: User[],
    loading?: boolean,
    value?: User['id'] | null,
    onChange?: (newUserId: User['id']) => void,
}

const AssignTicket = (props: AssignTicketProps) => {
    const { value = '', options, onChange } = props;
    const [selected, setSeleted] = useState(value || '');

    useEffect(() => {
        setSeleted(value || '');
    }, [value])

    const handleChange = (event: any) => {
        setSeleted(event.target.value || '');
        onChange?.(event.target.value || '');
    };

  return (
    <Select
        sx={{ width: 200 }}
        size="small"
        value={selected}
        onChange={handleChange}
    >
        <MenuItem value="">
            <em>Remove Assignee</em>
        </MenuItem>
        {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
                {option.name}
            </MenuItem>
        ))}
    </Select>
  )
}

export default memo(AssignTicket);
