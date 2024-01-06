// libraries
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";
import { tokens } from "@theme/theme";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import MyTaskForm from "@components/common/forms/my-task.form";
import TitleWithCloseButton from "@components/common/page-headers/header-with-close-button";
import SuccessCancelFormButtons from "@components/common/forms/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
// store
import { createTask } from "@store/task/tasks.store";
// schema
import { taskSchema } from "@schemas/task.shema";
// utils
import { capitalizeFirstLetter } from "@utils/data/capitalize-first-letter";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";

const initialState = {
  date: null,
  time: null,
  objectId: "",
  managerId: "",
  comment: "",
  result: "",
  isDone: false,
  isCallTask: true,
};

const CreateMyTask = React.memo(
  ({
    title,
    dateCreate = null,
    onClose,
    objects,
    objectId = "",
    isObjectPage = false,
  }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(false);

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      defaultValues: initialState,
      mode: "onChange",
      resolver: yupResolver(taskSchema),
    });
    const data = watch();

    const onSubmit = () => {
      setIsLoading(true);

      const newData = {
        ...data,
        comment: capitalizeFirstLetter(data.comment),
        result: capitalizeFirstLetter(data.result),
        managerId: null,
      };
      dispatch<any>(createTask(newData))
        .then(() => {
          setIsLoading(false);
          onClose();
          toast.success("Задача себе успешно создана!");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error);
        });
    };

    useEffect(() => {
      if (isObjectPage) {
        setValue<any>("objectId", objectId);
      }
    }, [objectId]);

    useEffect(() => {
      if (dateCreate !== null) {
        setValue<any>("date", dateCreate);
      } else {
        setValue<any>("date", null);
      }
    }, []);

    return (
      <>
        <HeaderWithCloseButton
          title={title}
          background={colors.task["myTask"]}
          onClose={onClose}
        />
        <MyTaskForm
          data={data}
          objects={objects}
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isObjectPage={isObjectPage}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
        />
        <LoaderFullWindow isLoading={isLoading} />
      </>
    );
  }
);

export default CreateMyTask;
