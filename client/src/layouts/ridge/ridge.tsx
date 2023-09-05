import { Box } from "@mui/material";
import { orderBy } from "lodash";
import LayoutTitle from "../../components/common/page-titles/layout-title";
import AddAndClearFiltersButton from "../../components/common/buttons/add-and-clear-filters-button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import useSearchObject from "../../hooks/object/use-search-object";

const initialState = {
    address: "",
    phone: "",
    name: "",
    status: "",
    selectedDistricts: [],
    selectedCities: [],
    selectedMetro: [],
    startDate: null,
    endDate: null,
  };

const Ridge = () => {
    // const [selectedBaloon, setSelectedBaloon] = useState(null);
    // const [openCreate, setOpenCreate] = useState(false);
    // const objects = useSelector(getRidgeObjectsList());
    // const selectedObject = useSelector(getRidgeObjectById(selectedBaloon));
    // const columns = ridgeObjectsColumns;
    // const center = [59.930320630519155, 30.32906024941998];
    // const mapZoom = 11;
    // const isLoading = useSelector(getRidgeObjectsLoadingStatus());
  
    // const localStorageState = JSON.parse(
    //   localStorage.getItem("search-ridge-data")
    // );
  
    // const formatedState = {
    //   ...localStorageState,
    //   startDate: localStorageState?.startDate
    //     ? dayjs(localStorageState?.startDate)
    //     : null,
    //   endDate: localStorageState?.endDate
    //     ? dayjs(localStorageState?.endDate)
    //     : null,
    // };
  
    // const { register, watch, setValue, reset } = useForm({
    //   defaultValues: Boolean(localStorageState) ? formatedState : initialState,
    //   mode: "onBlur",
    // });
  
    // const data = watch();
    // const searchedObjects = useSearchObject(objects, data);
    // const sortedObjects = orderBy(searchedObjects, ["created_at"], ["desc"]);
    // const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);
  
    // const handleOpenCreate = () => {
    //   setOpenCreate(true);
    // };
  
    // const handleCloseCreate = () => {
    //   setOpenCreate(false);
    // };
  
    // useEffect(() => {
    //   const hasLocalStorageData = localStorage.getItem("search-ridge-data");
  
    //   if (hasLocalStorageData?.length) {
    //     localStorage.setItem("search-ridge-data", JSON.stringify(initialState));
    //   }
    // }, []);
  
    // useEffect(() => {
    //   localStorage.setItem("search-ridge-data", JSON.stringify(data));
    // }, [data]);
  return (
    <Box sx={{ width: "100%" }}>
      {/* <LayoutTitle title="Грядка объектов" />
      <AddAndClearFiltersButton
        title="Добавить объект"
        isInputEmpty={isInputEmpty}
        reset={reset}
        initialState={initialState}
        onOpen={handleOpenCreate}
        disabled={isLoading}
      /> */}
      {/* <ItemsOnMap
        items={searchedObjects}
        mapZoom={mapZoom}
        hintContent={(item) =>
          `${item?.location?.city}, ${item?.location?.address}`
        }
        center={center}
        onClick={setSelectedBaloon}
        baloon={<ObjectBaloon object={selectedObject} />}
        isLoading={isLoading}
      /> */}

      {/* <ObjectsFiltersPanel
        data={data}
        register={register}
        objects={objects}
        setValue={setValue}
        isLoading={isLoading}
      /> */}

      {/* <BasicTable
        items={sortedObjects}
        itemsColumns={columns}
        isLoading={isLoading}
      /> */}

      {/* <DialogStyled
        component={<CreateObject onClose={handleCloseCreate} />}
        onClose={handleCloseCreate}
        open={openCreate}
        maxWidth="xl"
      /> */}

      {/* <ObjectPageDialog /> */}
      {/* <ObjectUpdatePageDialog /> */}
    </Box>
  );
};

export default Ridge;
