import "dayjs/locale/ru";
import React from "react";
import { Box, Typography, styled } from "@mui/material";
import telegramIcon from "@assets/telegram.png";

const Logo = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = React.memo(() => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <Logo>
        <Typography
          sx={{ fontSize: "80px", fontWeight: "700", marginBottom: "-10px" }}
        >
          Г Р Я Д К А
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>
          НАША СИСТЕМА АВТОМАТИЗАЦИИ ДЛЯ ОТДЕЛОВ РАЗВИТИЯ
        </Typography>
      </Logo>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ background: "yellow", color: "black", padding: "5px 10px" }}
        >
          Желаете получить доступ к Системе?
        </Typography>
        <Typography
          variant="h4"
          sx={{ background: "yellow", color: "black", padding: "5px 10px" }}
        >
          Есть вопросы или предложения по использованию?
        </Typography>
        <Box sx={{ height: "30px" }}></Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              background: "fireBrick",
              color: "white",
              padding: "5px 10px",
            }}
          >
            Свяжитесь с нами в Телеграм
          </Typography>
          <Box
            sx={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              overflow: "hidden",
            }}
          >
            <a
              href="https://t.me/ridge_crm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={telegramIcon}
                alt="Telegram"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </a>
          </Box>
        </Box>
        <Typography
          variant="h5"
          sx={{
            background: "fireBrick",
            color: "white",
            padding: "5px 10px",
          }}
        >
          Или напишите на почту: ridge-crm@mail.ru
        </Typography>
      </Box>
    </Box>
  );
});

export default Main;
