import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const PageBackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      color="success"
      variant="outlined"
      sx={{ height: "50px", color: "white" }}
      onClick={() => navigate(-1)}
    >
      <ArrowBackIosNewOutlinedIcon
        sx={{ width: "20px", height: "20px", marginRight: "5px" }}
      />
      Назад
    </Button>
  );
};

export default PageBackButton;
