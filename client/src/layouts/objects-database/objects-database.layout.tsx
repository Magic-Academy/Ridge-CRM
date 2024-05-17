// libraries
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// components
import HeaderForLayout from "@components/common/headers/header-for-layout";
import BasicTable from "@components/common/table/basic-table";
import { ContainerStyled } from "@components/common/container/container-styled";
import ObjectsDatabaseLayoutFiltersPanel from "@components/UI/filters-panels/objects-database-layout.filters-panel";
import TitleObjectsQuantityObjectsDatabaseLayout from "./components/title-objects-quantity.objects-database-layout";
import NoCallsControlPanelObjectsDatabase from "./components/no-calls-control-panel.objects-database-layout";
import NeedToCallsControlPanelObjectsDatabase from "./components/need-to-calls-control-panel.objects-database-layout";
// initial-states
import { objectsDatabaseLayoutInitialState } from "@initial-states/layouts/objects-database-layout.initial-state";
// columns
import { objectsDatabaseColumns } from "@columns/objects-database.columns";
// hooks
import useSearchObjectDatabase from "@hooks/objects-database/use-search-object-database";
// store
import { getIsCurrentUserRoleManager } from "@store/user/users.store";
import {
  getObjectsList,
  getObjectsLoadingStatus
} from "@store/object/objects.store";
import DialogPages from "@dialogs/dialog-pages";

const ObjectsDatabaseLayout = React.memo(() => {
  const [period, setPeriod] = useState("fromOneMonthToTwo");
  const [state, setState] = useState({
    objectPage: false,
    createPage: false,
    updatePage: false,
    objectId: null
  });

  const localStorageState = JSON.parse(
    localStorage.getItem("search-objectsdatabase-data")
  );

  const { watch, reset, setValue } = useForm({
    defaultValues: Boolean(localStorageState)
      ? localStorageState
      : objectsDatabaseLayoutInitialState,
    mode: "onBlur"
  });

  const data = watch();
  const objects = useSelector(getObjectsList());

  const isLoading = useSelector(getObjectsLoadingStatus());
  const isCurrentUserRoleManager = useSelector(getIsCurrentUserRoleManager());

  const { searchedObjects, filteredObjects } = useSearchObjectDatabase(
    objects,
    data,
    period
  );

  useEffect(() => {
    localStorage.setItem("search-objectsdatabase-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem(
      "search-objectsdatabase-data"
    );

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-objectsdatabase-data",
        JSON.stringify(objectsDatabaseLayoutInitialState)
      );
    }
  }, []);

  return (
    <ContainerStyled>
      <HeaderForLayout title="Проработка базы объектов" />
      <TitleObjectsQuantityObjectsDatabaseLayout objects={searchedObjects} />
      <ObjectsDatabaseLayoutFiltersPanel
        data={data}
        objects={searchedObjects}
        reset={reset}
        setValue={setValue}
      />
      <NoCallsControlPanelObjectsDatabase
        period={period}
        setPeriod={setPeriod}
      />
      <NeedToCallsControlPanelObjectsDatabase
        period={period}
        setPeriod={setPeriod}
      />
      <BasicTable
        items={filteredObjects}
        itemsColumns={objectsDatabaseColumns(
          setState,
          isCurrentUserRoleManager
        )}
        isLoading={isLoading}
      />
      <DialogPages state={state} setState={setState} />
    </ContainerStyled>
  );
});

export default ObjectsDatabaseLayout;
