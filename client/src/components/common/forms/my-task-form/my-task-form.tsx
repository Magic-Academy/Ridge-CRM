// components
import TextFieldStyled from "../../inputs/text-field-styled";
import DatePickerStyled from "../../inputs/date-picker";
import TimePickerStyled from "../../inputs/time-picker";
// styled
import { FieldsContainer, Form } from "../styled/styled";
// utils
import SimpleSwitch from "../../inputs/simple-switch";
import AutocompleteStyled from "../../inputs/autocomplete-styled";

const MyTaskForm = ({
  data,
  objects,
  register,
  watch,
  errors = null,
  setValue,
  isObjectPage = false,
  isEditMode = false,
  isTasksLoading = false,
}) => {
  const watchObjectId = watch("objectId", "");
  const watchIsDone = watch("isDone", false);

  return (
    <Form noValidate>
      <FieldsContainer>
        <DatePickerStyled
          register={register}
          name="date"
          label="Дата"
          value={data?.date}
          onChange={(value) => setValue("date", value)}
        />
        <TimePickerStyled
          register={register}
          label="Время *"
          name="time"
          value={data?.time}
          setValue={setValue}
          errors={errors?.time}
        />
      </FieldsContainer>
      <AutocompleteStyled
        label="Объект"
        register={register}
        name="objectId"
        options={objects}
        value={data.objectId}
        setValue={setValue}
        watchItemId={watchObjectId}
        disabled={isObjectPage}
      />
      <TextFieldStyled
        register={register}
        label="Комментарий *"
        name="comment"
        value={data?.comment}
        rows="3"
        multiline={true}
        errors={errors?.comment}
        onInputQuantities={200}
      />
      {isEditMode ? (
        <TextFieldStyled
          register={register}
          label="Результат"
          name="result"
          value={data?.result}
          rows="2"
          multiline={true}
          onInputQuantities={100}
        />
      ) : null}

      {isEditMode ? (
        <SimpleSwitch
          title="Задача выполненна"
          value={watchIsDone}
          isLoading={isTasksLoading}
          onChange={(e) => {
            setValue("isDone", e.target.checked);
          }}
        />
      ) : null}
    </Form>
  );
};

export default MyTaskForm;
