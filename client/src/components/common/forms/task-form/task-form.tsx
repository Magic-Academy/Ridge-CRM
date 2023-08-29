import { useNavigate } from "react-router-dom";
// MUI
import { Box, styled, InputAdornment } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
// components
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
import DatePickerStyled from "../../inputs/date-picker";
import TimePickerStyled from "../../inputs/time-picker";
import FooterButtons from "../footer-buttons";

const Form = styled(`form`)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
  marginTop: "12px",
  gap: "4px",
});

const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: "center";
  gap: 4px;
`;

const TaskForm = ({
  data,
  register,
  onSubmit,
  onClose,
  handleSubmit,
  watch,
  errors,
  setValue,
  isValid,
}) => {
  const watchObjectId = watch("objectId", "");
  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate("/meetings");
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldsContainer>
     
          <DatePickerStyled
            register={register}
            name="date"
            label="Дата"
            value={data?.date}
            onChange={(value) => setValue("date", value)}
            errors={errors?.date}
          />
          <TimePickerStyled
            register={register}
            data={data}
            errors={errors?.time}
            setValue={setValue}
            name="time"
            label="Время"
          />
          <SimpleSelectField
            register={register}
            // itemsList={meetingTypes}
            name="meetingType"
            labelId="meetingType"
            label="Объект"
            // value={watchTypeMeeting}
            errors={errors?.meetingType}
          />
          <TextFieldStyled
            register={register}
            label="Комментарий"
            name="comment"
            errors={errors?.comment}
            value={data?.comment}
            onInputQuantities={50}
            rows="3"
          multiline={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreateIcon />
                </InputAdornment>
              ),
            }}
          />
        </FieldsContainer>

        <FooterButtons
        //   isEditMode={isEditMode}
        //   isValid={!isValidAndHasAdress}
          onClick={onClose}
        />
      </Form>
    </>
  );
};

export default TaskForm;
