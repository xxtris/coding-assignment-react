import { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import styles from "./app.module.css";
import Tickets from "./tickets/tickets";
import { CircularProgress, Stack } from "@mui/material";
import { useStore } from "../hooks/useStore";
import TicketDetails from "./ticket-details/ticket-details";

const LoadingFallback = () => (
  <Stack justifyContent={"center"} alignItems={"center"}>
    <CircularProgress />
  </Stack>
);

const App = () => {
  const { ticketStore } = useStore();
  useEffect(() => {
      ticketStore.fetchUsers();
  }, [])

  return (
    <div className={styles["app"]}>
      <h1>Ticketing App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingFallback />}>
                <Tickets />
            </Suspense>
          }
        />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={
            <Suspense fallback={<LoadingFallback/>}>
                <TicketDetails />
            </Suspense>
          } />
      </Routes>
    </div>
  );
};

export default App;
