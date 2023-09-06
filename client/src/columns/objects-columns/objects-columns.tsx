import { Box, Typography } from "@mui/material";
import { orderBy } from "lodash";
import TableOpenButton from "../../components/common/buttons/table-open-button";
import {
  FormatDistrict,
  FormatManagerName,
  FormatMetro,
  FormatObjectStatus,
  FormatPhone,
} from "../../components/common/table/helpers/helpers";
import { FormatDate } from "../../utils/date/format-date";
import { useDispatch, useSelector } from "react-redux";
import {
  getMeetingsByObjectId,
  getObjectMeetingsList,
} from "../../store/meeting/meetings.store";
import { getTasksByObjectId } from "../../store/task/tasks.store";
import Flags from "./components/flags";
import {
  setOpenObjectPageId,
  setOpenObjectPageOpenState,
} from "../../store/object/open-object-page.store";
import { AlignCenter } from "../styled/styled";

export const objectsColumns = [
  {
    accessorKey: "created_at",
    header: "Дата",
    enableSorting: false,
    cell: (info) => {
      const date = info.getValue();
      return <AlignCenter>{FormatDate(date)}</AlignCenter>;
    },
  },
  {
    header: "Расположение объекта",
    columns: [
      {
        accessorKey: "location.city",
        header: "Город",
        cell: (info) => {
          const city = info.getValue();
          return city;
        },
      },
      {
        accessorKey: "location.district",
        header: "Район",
        cell: (info) => {
          const district = info.getValue();
          return <AlignCenter>{FormatDistrict(district)}</AlignCenter>;
        },
      },
      {
        accessorKey: "location.metro",
        header: "Метро",
        cell: (info) => {
          const metro = info.getValue();
          return <AlignCenter>{FormatMetro(metro)}</AlignCenter>;
        },
      },
      {
        accessorFn: (row) => row,
        header: "Адрес",
        cell: (info) => {
          const object = info.getValue();
          const objectId = object?._id;
          const meetings = useSelector(getObjectMeetingsList(objectId));
          const tasks = useSelector(getTasksByObjectId(objectId));
          if (objectId) {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <Typography>{object?.location?.address}</Typography>
                <Flags meetings={meetings} tasks={tasks} />
              </Box>
            );
          } else return null;
        },
      },
    ],
  },
  {
    header: "Контактная информация",
    columns: [
      {
        accessorKey: "contact.phone",
        header: "Телефон",
        cell: (info) => {
          const phone = info.getValue();
          return (
            <AlignCenter>
              <Typography sx={{ whiteSpace: "nowrap" }}>
                {FormatPhone(phone)}
              </Typography>
            </AlignCenter>
          );
        },
      },
      {
        accessorKey: "contact.name",
        header: "Имя",
        cell: (info) => {
          const name = info.getValue();
          return <AlignCenter>{name}</AlignCenter>;
        },
      },
    ],
  },
  {
    header: "Последние контакты",
    columns: [
      {
        accessorFn: (row) => row,
        header: "Встреча",
        cell: (info) => {
          const object = info.getValue();
          const objectId = object?._id;
          const objectMeetings = useSelector(getMeetingsByObjectId(objectId));
          const sortedObjectMeetings = orderBy(
            objectMeetings,
            ["date"],
            ["asc"]
          );
          const lastMeeting =
            sortedObjectMeetings[sortedObjectMeetings?.length - 1];
          const dateOfLastMeeting = FormatDate(lastMeeting?.date);

          return <AlignCenter>{dateOfLastMeeting}</AlignCenter>;
        },
      },
      {
        accessorFn: (row) => row,
        header: "Звонок",
        cell: (info) => {
          const object = info.getValue();
          return <AlignCenter>06.09.23</AlignCenter>;
        },
      },
    ],
  },
  {
    header: "Другое",
    columns: [
      {
        accessorKey: "userId",
        header: "Менеджер",
        cell: (info) => {
          const userId = info.getValue();
          return <AlignCenter>{FormatManagerName(userId)}</AlignCenter>;
        },
      },
      {
        accessorKey: "status",
        header: "Статус",
        cell: (info) => {
          const status = info.getValue();
          return <AlignCenter>{FormatObjectStatus(status)}</AlignCenter>;
        },
      },
      {
        accessorKey: "_id",
        header: "Объект",
        enableSorting: false,
        cell: (info) => {
          const objectId = info.getValue();
          const dispatch = useDispatch();

          const handleClick = () => {
            dispatch(setOpenObjectPageId(objectId));
            dispatch(setOpenObjectPageOpenState(true));
          };

          return (
            <TableOpenButton
              background="seaGreen"
              fontColor="black"
              text="Открыть"
              onClick={handleClick}
            />
          );
        },
      },
    ],
  },
];
