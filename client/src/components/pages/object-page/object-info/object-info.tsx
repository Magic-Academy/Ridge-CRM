// libraries
import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";
// components
import Dialogs from "./components/dialogs";
import ObjectsParams from "./components/object-params";
import ObjectTasks from "./components/object-tasks";
import ObjectMeetings from "./components/object-meetings";
import Loader from "../../../common/loader/loader";
import LastContacts from "./components/last-contacts";
import CreateLastContactButton from "../../../UI/dialogs/buttons/create-last-contact-button";
import CreateTasksButtons from "../../../../layouts/calendar/components/create-tasks-buttons/create-tasks-buttons";
// store
import { getObjectsList } from "../../../../store/object/objects.store";
import { getObjectMeetingsList } from "../../../../store/meeting/meetings.store";
import { getObjectTasksList } from "../../../../store/task/tasks.store";
import {
  getCurrentUserId,
  getUsersList,
} from "../../../../store/user/users.store";
import { getLastContactsByObjectId } from "../../../../store/last-contact/last-contact.store";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ObjectInfo = ({ object, isLoading }) => {
  const objects = useSelector(getObjectsList());
  const meetings = useSelector(getObjectMeetingsList(object?._id));
  const sortedMeetings = orderBy(meetings, ["date"], ["asc"]);

  const tasks = useSelector(getObjectTasksList(object?._id));
  const sortedTasks = orderBy(tasks, ["date"], ["asc"]);

  const lastContacts = useSelector(getLastContactsByObjectId(object?._id));
  const sortedLastContacts = orderBy(lastContacts, ["date"], ["asc"]);

  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const usersWithoutCurrentUser = users.filter(
    (user) => user?._id !== currentUserId
  );
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformUsers = [];
  usersWithoutCurrentUser?.forEach((user) => {
    transformUsers?.push({
      _id: user?._id,
      name: `${user?.name?.lastName} ${user?.name?.firstName}`,
    });
  });

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj?._id, name: obj?.location.address });
  });

  return !isLoading ? (
    <Component>
      <ObjectsParams object={object} isLoading={isLoading} />
      <ObjectMeetings meetings={sortedMeetings} object={object} />
      <ObjectTasks
        tasks={sortedTasks}
        object={object}
        buttons={<CreateTasksButtons withoutMeeting={true} />}
      />
      <LastContacts
        lastContacts={sortedLastContacts}
        object={object}
        buttons={<CreateLastContactButton title="Добавить последний контакт" />}
      />

      <Dialogs objects={transformObjects} users={transformUsers} />
    </Component>
  ) : (
    <Loader />
  );
};

export default ObjectInfo;
