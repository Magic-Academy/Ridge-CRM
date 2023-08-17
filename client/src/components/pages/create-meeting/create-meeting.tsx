// libraries
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// components
import FindObjectOnMap from "../../common/find-object-on-map";
import MeetingForm from "../../common/forms/meeting-form";
// MUI
import { Box } from "@mui/material";
// store
import { getMeetingStatusesList } from "../../../store/meeting-status.store";
import { getCurrentUserId } from "../../../store/users.store";
import { getObjectsList } from "../../../store/objects.store";
// schema
import { meetingSchema } from "../../../schemas/schemas";
// hooks
import useFindObject from "../../../hooks/use-find-object";
// utils
import { capitalizeFirstLetter } from "../../../utils/capitalize-first-letter";
import { createMeeting } from "../../../store/meetings.store";
import TitleWithAddress from "../../common/page-titles/title-with-address";

const initialState = {
  status: "",
  date: "",
  time: "",
  comment: "",
  objectId: "",
  location: {
    city: "",
    address: "",
    latitude: null,
    longitude: null,
    zoom: null,
  },
};

const CreateMeeting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statuses = useSelector(getMeetingStatusesList());
  const objects = useSelector(getObjectsList());
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

  const isEmptyFindedObject = Boolean(Object.keys(findedObject)?.length);

  const data = watch();
  console.log("data", data);

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
      .then(navigate("/meetings"))
      .then(toast.success("Встреча успешно создана!"));
  };

  useEffect(() => {
    setValue("location.city", getCity());
    setValue("location.address", getAddress());
    setValue("location.latitude", getLatitudeCoordinates());
    setValue("location.longitude", getLongitudeCoordinates());
  }, [findedObject]);

  return (
    <Box>
      <TitleWithAddress
        isEmptyFindedObject={isEmptyFindedObject}
        getCity={getCity}
        getAddress={getAddress}
        title="Создать встречу:"
        subtitle="Выберите место встречи на карте"
        path="meetings"
      />
      <FindObjectOnMap />
      <MeetingForm
        statuses={statuses}
        objects={transformObjects}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        setValue={setValue}
        isValid={isValid}
        isEmptyFindedObject={isEmptyFindedObject}
      />
    </Box>
  );
};

export default CreateMeeting;
