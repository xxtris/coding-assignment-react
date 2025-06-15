import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";

export type TSelectItem = {
  value: string;
  label: string;
};

export interface FilterTicketProps {
  label: string;
  options: TSelectItem[];
  value?: string;
  onChange?: (newValue: string) => void;
}

export function FilterTicket(props: FilterTicketProps) {
  const { label = "Filter", value, options, onChange } = props;
  const [selected, setSeleted] = useState<typeof props.value>(value || "");

  useEffect(() => {
    setSeleted(value);
  }, [value]);

  const handleChange = (event: SelectChangeEvent) => {
    setSeleted(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <>
      <FormControl sx={{ mt: 2, mb: 1, width: 200 }} size="small">
        <Select value={selected} onChange={handleChange}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label} 
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default FilterTicket;
