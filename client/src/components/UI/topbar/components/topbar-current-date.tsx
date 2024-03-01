import dayjs from "dayjs";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Typography, Tooltip, Box } from "@mui/material";
import { useSelector } from "react-redux";
// utils
import { makeDigitSeparator } from "@utils/data/make-digit-separator";
// store
import { getUserLicensesByUserId } from "@store/user/user-license.store";
import { getCurrentUserId } from "@store/user/users.store";
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import { pluralizeDays } from "@utils/date/pluralize-days";

const Component = styled(Box)`
  width: 400px;
  display: flex;
  gap: 6px;
  justify-content: start;
`;

const Element = styled(Typography)`
  color: gray;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const TopBarCurrentDate = () => {
  const navigate = useNavigate();
  const currentDate = dayjs();
  const formattedDate = capitalizeFirstLetter(
    currentDate.format("dddd, D MMM")
  ).replace(/\.$/, "");

  const currentUserId = useSelector(getCurrentUserId());
  const userLicense = useSelector(getUserLicensesByUserId(currentUserId));
  const dateEnd = dayjs(userLicense?.dateEnd);
  const daysDifference = dateEnd?.diff(dayjs(), "day");
  const licenseBalance = makeDigitSeparator(userLicense?.balance);

  return (
    <Component>
      <Tooltip
        title="Текущая дата"
        placement="top-start"
        arrow
        onClick={() => navigate("/users")}
      >
        <Element variant="h5">{formattedDate} </Element>
      </Tooltip>
      <Typography color="grey">|</Typography>
      <Tooltip
        title="Баланса хватит на"
        placement="top-start"
        arrow
        onClick={() => navigate("/users")}
      >
        <Element variant="h5">
          {daysDifference} {pluralizeDays(daysDifference)}{" "}
        </Element>
      </Tooltip>
      <Typography color="grey">|</Typography>
      <Tooltip
        title="Текущий баланс"
        placement="top-start"
        arrow
        onClick={() => navigate("/users")}
      >
        <Element variant="h5">{licenseBalance}₽</Element>
      </Tooltip>
    </Component>
  );
};

export default TopBarCurrentDate;
