// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import ManagerPresentationForm from "@forms/presentation/presentation-manager.form";
import CuratorPresentationForm from "@forms/presentation/presentation-curator.form";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import DialogConfirm from "@components/common/dialog/dialog-confirm";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
// schema
import { presentationSchema } from "@schemas/presentation.schema";
// utils
import transformObjectsForSelect from "@utils/objects/transform-objects-for-select";
// store
import { getObjectsList } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserAuthorThisEntity,
  getIsUserCurator
} from "@store/user/users.store";
import {
  getPresentationById,
  removePresentation,
  updatePresentation
} from "@store/presentation/presentations.store";

const UpdatePresentation = React.memo(({ presentationId, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const presentation = useSelector(getPresentationById(presentationId));

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: presentation,
    mode: "onBlur",
    resolver: yupResolver(presentationSchema)
  });

  const data = watch();

  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const isCurator = useSelector(getIsUserCurator(currentUserId));

  const isAuthorEntity = useSelector(
    getIsUserAuthorThisEntity(currentUserId, presentation)
  );

  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  const transformObjects = transformObjectsForSelect(currentUserObjects);

  const onSubmit = (data) => {
    setIsLoading(true);

    const newData = {
      ...data
    };

    dispatch<any>(updatePresentation(newData))
      .then(() => {
        setIsLoading(false);
        onClose();
        toast.success("Презентация успешно изменена!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  };

  const handleOpenConfirm = () => {
    setOpen(true);
  };

  const handleCloseConfirm = () => {
    setOpen(false);
  };

  const handleRemovePresentation = (presentationId) => {
    setIsLoading(true);
    dispatch<any>(removePresentation(presentationId))
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
      <HeaderWithCloseButton
        title="Редактировать презентацию"
        background={colors.presentation["primary"]}
        color="white"
        onClose={onClose}
      />
      {isAuthorEntity ? (
        <ManagerPresentationForm
          data={data}
          objects={transformObjects}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          isCurator={isCurator}
        />
      ) : (
        <CuratorPresentationForm
          data={data}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      )}
      <SuccessCancelFormButtons
        onSuccess={handleSubmit(onSubmit)}
        onCancel={onClose}
        onRemove={handleOpenConfirm}
        isUpdate={true}
      />
      <DialogConfirm
        question="Вы уверены, что хотите удалить презентацию?"
        open={open}
        onSuccessClick={() => handleRemovePresentation(presentationId)}
        onClose={handleCloseConfirm}
      />
      <LoaderFullWindow isLoading={isLoading} />
    </>
  );
});

export default UpdatePresentation;
