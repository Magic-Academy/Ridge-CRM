// libraries
import dayjs from "dayjs";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
// components
import LastContactForm from "@forms/last-contact/last-contact.form";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButtonForPage from "@components/common/headers/header-with-close-button.page";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
// schema
import { lastContactSchema } from "@schemas/last-contact/last-contact.schema";
// store
import {
  getLastContactsById,
  removeLastContact,
  updateLastContact
} from "@store/last-contact/last-contact.store";

const UpdateLastContact = React.memo(({ lastContactId, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lastContact = useSelector(getLastContactsById(lastContactId));

  const formatedLastContact = {
    ...lastContact,
    date: lastContact?.date ? dayjs(lastContact?.date) : null,
    dateMyTask: null,
    timeMyTaks: null,
    commentMyTask: ""
  };

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: formatedLastContact,
    mode: "onChange",
    resolver: yupResolver(lastContactSchema)
  });

  const data = watch();

  const onSubmit = (data) => {
    setIsLoading(true);

    const transformedDate = dayjs(data.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    const newData = { ...data, date: transformedDate };

    dispatch<any>(updateLastContact(newData))
      .then(() => {
        onClose();
        toast.success("Последний контакт успешно изменен!");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleRemoveLastContact = (lastContactId) => {
    setIsLoading(true);
    dispatch<any>(removeLastContact(lastContactId))
      .then(onClose(), handleCloseConfirm())
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <HeaderWithCloseButtonForPage
        title="Изменить последний контакт"
        background={colors.header["gold"]}
        color="black"
        onClose={onClose}
        margin="0 0 20px 0"
      />
      <LastContactForm
        data={data}
        register={register}
        errors={errors}
        setValue={setValue}
        control={control}
        watch={watch}
      />
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        onRemove={handleOpenConfirm}
      />
      <DialogConfirm
        question="Вы уверены, что хотите удалить последний контакт?"
        open={openConfirm}
        onSuccessClick={() => handleRemoveLastContact(lastContactId)}
        onClose={handleCloseConfirm}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </>
  );
});

export default UpdateLastContact;
