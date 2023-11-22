import { Typography } from "@mui/material";
import DividerStyled from "../../../../../../../../../../../divider/divider-styled";

const Result = ({ meet }) => {
  const result = meet?.result;

  return result ? (
    <>
      <DividerStyled color={result ? "darkGray" : "gray"} margin="0"/>
      <Typography>
        <b>Итог:</b> {result}
      </Typography>
    </>
  ) : null;
};

export default Result;
