import { Box, Typography, styled } from "@mui/material";
import OpenPageObjectIconButton from "../../../../../../components/common/buttons/icons buttons/open-page-object-icon";

const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const ObjectAddress = ({ obj, onClick, getObjectAddress }) => {
  return (
    <Container>
      <Typography variant="h6">{getObjectAddress(obj?._id)}</Typography>
      <OpenPageObjectIconButton onClick={onClick} />
    </Container>
  );
};

export default ObjectAddress;
