import React from "react";
import { FormatManagerName } from "../helpers/helpers";
import { Box, Typography, styled } from "@mui/material";
import AvatarImage from "../../../../layouts/profile/components/avatar-image";

const Component = styled(Box)`
  width: 100%;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
`;

const UserNameWithAvatar = React.memo(
  ({ userId, avatarSrc, isLoading, fontStyle = "normal", withName = true }) => {
    return (
      <Component>
        <AvatarImage
          width="30px"
          height="30px"
          avatarSrc={avatarSrc}
          isLoading={isLoading}
        />
        {withName && (
          <Typography sx={{ width: "100%", fontStyle: fontStyle }}>
            {FormatManagerName(userId)}
          </Typography>
        )}
      </Component>
    );
  }
);

export default UserNameWithAvatar;
