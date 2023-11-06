import { useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
// components
import Tasks from "./components/tasks/tasks";
import Meetings from "./components/meetings/meetings";
import Loader from "../../../../../../../../loader/loader";
// store
import { getTaskLoadingStatus } from "../../../../../../../../../../store/task/tasks.store";
import { getMeetingLoadingStatus } from "../../../../../../../../../../store/meeting/meetings.store";
import {
  getCurrentUserId,
  getIsUserCurator,
} from "../../../../../../../../../../store/user/users.store";

const Components = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-bottom: 28px;
  gap: 4px;
`;

const DayContent = ({ meetings, tasks, isSelectedDayDialog }) => {
  const isTasksLoading = useSelector(getTaskLoadingStatus());
  const isMeetingsLoading = useSelector(getMeetingLoadingStatus());

  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const isLoading = !isTasksLoading && !isMeetingsLoading;
  const isTasks = tasks?.length;
  const isMeetings = meetings?.length;

  return isLoading ? (
    <Components>
      {isTasks ? (
        <Tasks
          tasks={tasks}
          isCurator={isCurator}
          isSelectedDayDialog={isSelectedDayDialog}
        />
      ) : null}
      {isMeetings ? (
        <Meetings
          meetings={meetings}
          currentUserId={currentUserId}
          isCurator={isCurator}
          isSelectedDayDialog={isSelectedDayDialog}
        />
      ) : null}
    </Components>
  ) : (
    <Loader />
  );
};

export default DayContent;
