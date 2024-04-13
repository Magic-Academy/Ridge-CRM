import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
// components
import BasicTable from "@components/common/table/basic-table";
import HeaderLayout from "@components/common/page-headers/header-layout";
import PresentationsFiltersPanel from "@components/UI/filters-panels/presentations-filters-panel";
import ItemsOnMap from "@components/common/map/items-on-map/items-on-map";
import PageDialogs from "@components/common/dialog/page-dialogs";
import { ContainerStyled } from "@components/common/container/container-styled";
import PresentationBaloon from "@components/UI/maps/presentation-balloon";
import Buttons from "./components/buttons";
// columns
import { presentationsColumns } from "@columns/presentations.columns";
// hooks
import useSearchPresentation from "@hooks/presentation/use-search-presentation";
import useDialogHandlers from "@hooks/dialog/use-dialog-handlers";
// store
import { getObjectsList } from "@store/object/objects.store";
import {
  getCurrentUserId,
  getIsUserCurator,
  getIsUserManager
} from "@store/user/users.store";
import { getPresentationStatusList } from "@store/presentation/presentation-status.store";
import {
  getPresentationsList,
  getPresentationsLoadingStatus
} from "@store/presentation/presentations.store";
import PresentationBalloon from "@components/UI/maps/presentation-balloon";

const initialState = {
  objectAddress: "",
  curatorComment: "",
  selectedStatuses: [],
  selectedUsers: [],
  startDate: null,
  endDate: null
};

const Presentations = React.memo(() => {
  const [state, setState] = useState({
    selectedPresentationBaloon: null,
    presentationsWithLocation: [],
    objectPage: false,
    updateObjectPage: false,
    createPresentationPage: false,
    updatePresentationPage: false,
    objectId: null,
    presentationId: "",
    videoPlayerPage: false
  });

  const localStorageState = JSON.parse(
    localStorage.getItem("search-presentations-data")
  );

  const formatedState = {
    ...localStorageState,
    startDate: localStorageState?.startDate
      ? dayjs(localStorageState?.startDate)
      : null,
    endDate: localStorageState?.endDate
      ? dayjs(localStorageState?.endDate)
      : null
  };

  const { register, watch, setValue, reset } = useForm({
    defaultValues: !!localStorageState ? formatedState : initialState,
    mode: "onChange"
  });

  const data = watch();
  const objects = useSelector(getObjectsList());
  const currentUserId = useSelector(getCurrentUserId());
  const presentationsStatuses = useSelector(getPresentationStatusList());

  const isDialogPage = true;
  const isCurator = useSelector(getIsUserCurator(currentUserId));
  const isManager = useSelector(getIsUserManager(currentUserId));
  const isLoading = useSelector(getPresentationsLoadingStatus());
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const presentationsList = useSelector(getPresentationsList());

  const searchedPresentations = useSearchPresentation(presentationsList, data);
  const sortedPresentations = useMemo(() => {
    return orderBy(searchedPresentations, ["created_at"], ["desc"]);
  }, [searchedPresentations]);

  const {
    handleOpenObjectPage,
    handleOpenCreatePresentationPage,
    handleOpenUpdatePresentationPage,
    handleOpenVideoPlayerPage
  } = useDialogHandlers(setState);

  const handleSelectPresentationBaloon = (presentationId) => {
    setState((prevState) => ({
      ...prevState,
      selectedPresentationBaloon: presentationId
    }));
  };

  const handleSetPresentationsWithLocation = (location) => {
    setState((prevState) => ({
      ...prevState,
      presentationsWithLocation: location
    }));
  };

  useEffect(() => {
    localStorage.setItem("search-presentations-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem(
      "search-presentations-data"
    );

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-presentations-data",
        JSON.stringify(initialState)
      );
    }
  }, []);

  useEffect(() => {
    if (searchedPresentations && objects) {
      const presentationsWithLocationData = searchedPresentations.map(
        (presentation) => {
          const matchingObject = objects?.find(
            (object) => object._id === presentation.objectId
          );

          if (matchingObject) {
            const newPres = {
              ...presentation,
              city: matchingObject?.city,
              address: matchingObject?.address,
              latitude: matchingObject?.latitude,
              longitude: matchingObject?.longitude
            };

            return newPres;
          } else {
            return presentation;
          }
        }
      );

      if (
        JSON.stringify(presentationsWithLocationData) !==
        JSON.stringify(state.presentationsWithLocation)
      ) {
        handleSetPresentationsWithLocation(presentationsWithLocationData);
      }
    }
  }, [searchedPresentations, objects]);

  return (
    <ContainerStyled>
      <HeaderLayout title="Презентации" />
      <Buttons
        initialState={initialState}
        reset={reset}
        onOpenCreatePresentationPage={handleOpenCreatePresentationPage}
        onOpenVideoPlayerPage={handleOpenVideoPlayerPage}
        isInputEmpty={isInputEmpty}
      />
      <ItemsOnMap
        items={state.presentationsWithLocation}
        onClick={handleSelectPresentationBaloon}
        isLoading={isLoading}
        baloon={
          <PresentationBalloon
            presentationId={state.selectedPresentationBaloon}
            onOpenObjectPage={handleOpenObjectPage}
            onOpenUpdatePresentationPage={handleOpenUpdatePresentationPage}
          />
        }
      />
      <PresentationsFiltersPanel
        data={data}
        presentations={presentationsList}
        statuses={presentationsStatuses}
        register={register}
        setValue={setValue}
        isManager={isManager}
        isLoading={isLoading}
      />
      <BasicTable
        items={sortedPresentations}
        itemsColumns={presentationsColumns(
          handleOpenObjectPage,
          handleOpenUpdatePresentationPage,
          isDialogPage,
          isCurator,
          isManager
        )}
        isLoading={isLoading}
      />
      <PageDialogs
        state={state}
        setState={setState}
        videoTitle="Как пользоваться страницей с Презентациями"
        videoSrc="https://www.youtube.com/embed/zz_SjeT_-M4"
      />
    </ContainerStyled>
  );
});

export default Presentations;
