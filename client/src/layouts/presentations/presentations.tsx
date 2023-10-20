import Confetti from "react-confetti";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { useWindowSize } from "@react-hook/window-size";
// components
import BasicTable from "../../components/common/table/basic-table";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import CreatePresentationButton from "../../components/UI/dialogs/buttons/create-presentation-button";
import PresentationCreatePageDialog from "../../components/UI/dialogs/presentations/presentation-create-page-dialog";
import ObjectUpdatePageDialog from "../../components/UI/dialogs/objects/object-update-page-dialog";
import ObjectPageDialog from "../../components/UI/dialogs/object-page-dialog/object-page-dialog";
import PresentationsFiltersPanel from "../../components/UI/filters-panels/presentations-filters-panel";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import ItemsOnMap from "../../components/common/map/items-on-map/items-on-map";
import PresentationBaloon from "../../components/UI/maps/presentation-baloon";
// columns
import { presentationsColumns } from "../../columns/presentations-columns/presentations-columns";
// map images
import target from "../../assets/map/target-presentation.png";
import targetCluster from "../../assets/map/target-presentation-cluster.png";
// store
import { getObjectsList } from "../../store/object/objects.store";
import {
  getPresentationsList,
  getPresentationsLoadingStatus,
} from "../../store/presentation/presentations.store";
import PresentationUpdateDialog from "../../components/UI/dialogs/presentations/presentation-update-dialog";

const initialState = {
  objectAddress: "",
  result: "",
  selectedStatuses: [],
  selectedUsers: [],
  startDate: null,
  endDate: null,
};

const Presentations = () => {
  const { width, height } = useWindowSize();
  const [confettiActive, setConfettiActive] = useState(false);
  const [selectedPresentationBaloon, setSelectedPresentationBaloon] =
    useState(null);
  const [presentationsWithLocation, setPresentationsWithLocation] = useState(
    []
  );

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
      : null,
  };

  const { register, watch, setValue, reset } = useForm({
    defaultValues: Boolean(localStorageState) ? formatedState : initialState,
    mode: "onBlur",
  });

  const objects = useSelector(getObjectsList());
  const presentationsList = useSelector(getPresentationsList());
  const isLoading = useSelector(getPresentationsLoadingStatus());

  const center = [59.930320630519155, 30.32906024941998];
  const mapZoom = 11;

  const data = watch();
  const searchedPresentations = presentationsList;
  const sortedPresentations = orderBy(
    searchedPresentations,
    ["created_at"],
    ["asc"]
  );
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  useEffect(() => {
    localStorage.setItem("search-meetings-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-meetings-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-meetings-data",
        JSON.stringify(initialState)
      );
    }
  }, []);

  useEffect(() => {
    if (presentationsList && objects) {
      const presentationsWithLocationData = presentationsList.map(
        (presentation) => {
          const matchingObject = objects?.find(
            (object) => object._id === presentation.objectId
          );

          if (matchingObject) {
            return {
              ...presentation,
              location: {
                city: matchingObject?.location.city,
                address: matchingObject?.location.address,
                latitude: matchingObject?.location.latitude,
                longitude: matchingObject?.location.longitude,
              },
            };
          } else {
            return presentation;
          }
        }
      );

      setPresentationsWithLocation(presentationsWithLocationData);
    }
  }, [presentationsList, objects]);

  useEffect(() => {
    setTimeout(() => {
      setConfettiActive(false);
    }, 4000);
  }, [confettiActive]);

  return (
    <Box>
      <LayoutTitle title="Презентации" />
      <AddAndClearFiltersButton
        reset={reset}
        isInputEmpty={isInputEmpty}
        initialState={initialState}
        button={<CreatePresentationButton />}
      />

      <ItemsOnMap
        items={presentationsWithLocation}
        mapZoom={mapZoom}
        hintContent={(item) =>
          `${item?.location?.city}, ${item?.location?.address}`
        }
        center={center}
        onClick={setSelectedPresentationBaloon}
        baloon={
          <PresentationBaloon presentationId={selectedPresentationBaloon} />
        }
        isLoading={isLoading}
        target={target}
        targetCluster={targetCluster}
      />

      <PresentationsFiltersPanel
        data={data}
        register={register}
        setValue={setValue}
        isLoading={isLoading}
      />

      <BasicTable
        items={sortedPresentations}
        itemsColumns={presentationsColumns}
        isLoading={isLoading}
      />

      {confettiActive && <Confetti width={width} height={height} />}

      <PresentationCreatePageDialog setConfettiActive={setConfettiActive} />
      <PresentationUpdateDialog/>
      <ObjectPageDialog />
      <ObjectUpdatePageDialog />
    </Box>
  );
};

export default Presentations;
