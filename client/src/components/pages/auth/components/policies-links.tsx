import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PolisiesLinks = ({ setState }) => {
  const { handleOpenAgreementPage, handleOpenPersonalPolicyPage } =
    useDialogHandlers(setState);

  return (
    <Box sx={{ width: "90%", textAlign: "center" }}>
      <Typography>
        Нажимая кнопку, вы принимаете условия{" "}
        <Link
          style={{ color: "SteelBlue", textDecoration: "none" }}
          onClick={handleOpenAgreementPage}
          onMouseEnter={(e) => (e.target.style.color = "blue")}
          onMouseLeave={(e) => (e.target.style.color = "DodgerBlue")}
        >
          лицензионного соглашения
        </Link>{" "}
        и даёте согласие на обработку{" "}
        <Link
          style={{ color: "SteelBlue", textDecoration: "none" }}
          onClick={handleOpenPersonalPolicyPage}
          onMouseEnter={(e) => (e.target.style.color = "blue")}
          onMouseLeave={(e) => (e.target.style.color = "DodgerBlue")}
        >
          персональных данных
        </Link>
      </Typography>
    </Box>
  );
};

export default PolisiesLinks;
