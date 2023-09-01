// libraries
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
import MeetingForm from "../../common/forms/meeting-form/meeting-form";
import TitleWithAddress from "../../common/page-titles/title-with-address";
import FindObjectOnMap from "../../common/find-object-on-map/find-object-on-map";
// MUI
import { Box, styled } from "@mui/material";
// store
import { getCurrentUserId } from "../../../store/user/users.store";
import { getObjectsList } from "../../../store/object/objects.store";
import { getMeetingStatusesList } from "../../../store/meeting/meeting-status.store";
// schema
import { meetingSchema } from "../../../schemas/schemas";
// hooks
import useFindObject from "../../../hooks/object/use-find-object";
// utils
import { createMeeting } from "../../../store/meeting/meetings.store";
import { getMeetingTypesList } from "../../../store/meeting/meeting-types.store";
import { capitalizeFirstLetter } from "../../../utils/data/capitalize-first-letter";

const Component = styled(Box)`
  width: 100%;
`;


const CreateMeeting = ({ objectPageId, onClose }) => {
  const initialState = {
    status: "",
    meetingType: "",
    date: null,
    time: null,
    comment: "",
    objectId: objectPageId ? objectPageId : "",
    location: {
      city: "",
      address: "",
      latitude: null,
      longitude: null,
      zoom: null,
    },
  };
  const dispatch = useDispatch();
  const objects = useSelector(getObjectsList());
  const statuses = useSelector(getMeetingStatusesList());
  const meetingTypes = useSelector(getMeetingTypesList());
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserObjects = objects?.filter(
    (obj) => obj?.userId === currentUserId
  );

  let transformObjects = [];
  currentUserObjects?.forEach((obj) => {
    transformObjects?.push({ _id: obj._id, name: obj.location.address });
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(meetingSchema),
  });

  const {
    getCity,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();

  const data = watch();

  const isEmptyFindedObject = Boolean(!Object.keys(findedObject)?.length);
  const isFullValid = data.date !== null && data.time !== null && isValid;

  const onSubmit = (data) => {
    const newData = {
      ...data,
      comment: capitalizeFirstLetter(data.comment),
      location: {
        ...data.location,
        zoom: 16,
      },
    };

    dispatch(createMeeting(newData))
      .then(onClose())
      .then(toast.success("Встреча успешно создана!"));
  };

  useEffect(() => {
    setValue("location.city", getCity());
    setValue("location.address", getAddress());
    setValue("location.latitude", getLatitudeCoordinates());
    setValue("location.longitude", getLongitudeCoordinates());
  }, [findedObject]);

  return (
    <Component>
      <TitleWithAddress
        isEmptyFindedObject={isEmptyFindedObject}
        getCity={getCity}
        getAddress={getAddress}
        title="Добавить встречу:"
        subtitle="Выберите место встречи на карте"
        onClose={onClose}
      />

      <FindObjectOnMap />

      <MeetingForm
        register={register}
        objects={transformObjects}
        statuses={statuses}
        meetingTypes={meetingTypes}
        objectPageId={objectPageId}
        onSubmit={onSubmit}
        onClose={onClose}
        handleSubmit={handleSubmit}
        watch={watch}
        errors={errors}
        setValue={setValue}
        isValid={isFullValid}
        isEmptyFindedObject={isEmptyFindedObject}
      />
    </Component>
  );
};

export default CreateMeeting;
