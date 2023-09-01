// libraries
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import CreateIcon from "@mui/icons-material/Create";
import { InputAdornment } from "@mui/material";
// components
import TextFieldStyled from "../../inputs/text-field-styled";
import SimpleSelectField from "../../inputs/simple-select-field";
import DatePickerStyled from "../../inputs/date-picker";
import TimePickerStyled from "../../inputs/time-picker";
import FooterButtons from "../footer-buttons/footer-buttons";
// store
import { createTask } from "../../../../store/task/tasks.store";
// utils
import { capitalizeFirstLetter } from "../../../../utils/data/capitalize-first-letter";
// schema
import { taskSchema } from "../../../../schemas/schemas";
// styled
import { FieldsContainer, Form } from "../styled/styled";

const initialState = {
  comment: "",
  date: null,
  time: null,
  objectId: "",
  managerId: "",
};

const MyTaskForm = ({ date, objects, objectPageId, onClose }) => {
  const dispatch = useDispatch();
  const isObjectPage = Boolean(objectPageId.length)

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(taskSchema),
  });
  const data = watch();
  const watchDate = watch("date", null);
  const watchObjectId = watch("objectId", "");
  const isFullValid = !watchDate || !isValid;

  const onSubmitMyTask = () => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
      managerId: null,
    };
    dispatch(createTask(newData))
      .then(() => onClose())
      .then(() => toast.success("Задача успешно создана!"));
  };

  useEffect(() => {
    if (objectPageId) {
      setValue("objectId", objectPageId);
    }
  }, [objectPageId]);

  useEffect(() => {
    if (date) {
      setValue("date", date);
    }
  }, [date]);

  return (
    <Form onSubmit={handleSubmit(onSubmitMyTask)} noValidate>
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
          name="time"
          label="Время"
          value={data.time}
          setValue={setValue}
          errors={errors?.time}
        />
      </FieldsContainer>

      <SimpleSelectField
        register={register}
        itemsList={objects}
        name="objectId"
        labelId="objectId"
        label="Объект встречи"
        value={watchObjectId}
        disabled={isObjectPage}
      />
      <TextFieldStyled
        register={register}
        label="Комментарий"
        name="comment"
        value={data?.comment}
        rows="3"
        multiline={true}
        errors={errors?.comment}
        onInputQuantities={100}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CreateIcon />
            </InputAdornment>
          ),
        }}
      />

      <FooterButtons
        //   isEditMode={isEditMode}
        isValid={isFullValid}
        onClose={onClose}
      />
    </Form>
  );
};

export default MyTaskForm;
