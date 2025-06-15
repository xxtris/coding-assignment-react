import { Box, Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";

/* eslint-disable-next-line */
export interface AddTicketProps {
  buttonText?: string,
  inputPlaceholder?: string,
  isPending?: boolean,
  onAddTicket?: (desc: string) => void,
}

export function AddTicket(props: AddTicketProps) {
  const { buttonText = "Add Ticket", inputPlaceholder = "Add ticket...", isPending, onAddTicket } = props;
  const [desciption, setDesciption] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (desciption.trim()) {
      onAddTicket?.(desciption);
      setDesciption("");
    }
  }

  return (
    <Box
      component="form"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ gap: 2 }}
      onSubmit={handleSubmit}
    >
      <TextField
        name="desciption"
        placeholder={inputPlaceholder}
        variant="outlined"
        size="small"
        required
        sx={{ flex: 1 }}
        value={desciption}
        onChange={(e) => setDesciption(e.target.value)}
      />
      <Button size="small"
        variant="contained"
        sx={{ height: 40, width: 150, marginLeft: "auto" }}
        loading={isPending}
        loadingPosition="start"
        type="submit"
      >
        {buttonText}
      </Button>
    </Box>
  );
}

export default AddTicket;
