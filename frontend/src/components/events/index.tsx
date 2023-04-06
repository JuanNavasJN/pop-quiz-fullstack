import { Grid, Box, Tooltip, Fab } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import EventsContainer from "./EventsContainer";
import { IconPlus } from "@tabler/icons-react";
import { useContext } from "react";
import { ModalsContext } from "../../contexts/ModalsContext";
import AddEventModal from "./AddEventModal";

const Events = () => {
  const { toggleAddEventModal } = useContext(ModalsContext);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AddEventModal />
          <DashboardCard
            title="Events"
            tooltipOption={
              <Tooltip title="Add Event" onClick={toggleAddEventModal}>
                <Fab size="small" color="secondary">
                  <IconPlus size="16" />
                </Fab>
              </Tooltip>
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <EventsContainer />
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Events;
