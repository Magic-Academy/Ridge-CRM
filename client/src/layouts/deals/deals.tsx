import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// components
import Stages from "./components/layout-stages.deals";
import HeaderLayout from "@components/common/page-headers/header-layout";
import PageDialogs from "@components/common/dialog/page-dialogs";
import { ContainerStyled } from "@components/common/container/container-styled";
import { dealsLayoutInitialState } from "@components/UI/filters-panels/deals-layout/deals-layout-initial-state.filters-panel";
import DealsLayoutFiltersPanel from "@components/UI/filters-panels/deals-layout/deals-layout.filters-panel";
// data
import { allowedStatuses, dealStagesArray } from "@data/deals/deals-stages";
// hooks
import useSearchDeals from "@hooks/deals/use-search-deals";
// store
import { getObjectsList } from "@store/object/objects.store";

const Deals = React.memo(() => {
  const [state, setState] = useState({
    objectPage: false,
    updatePage: false,
    objectId: null
  });

  const localStorageState = JSON.parse(
    localStorage.getItem("search-deals-data")
  );

  const { watch, setValue, reset } = useForm({
    defaultValues: Boolean(localStorageState)
      ? localStorageState
      : dealsLayoutInitialState,
    mode: "onChange"
  });

  const data = watch();

  const objects = useSelector(getObjectsList());
  const deals = objects?.filter((obj) => {
    if (obj && allowedStatuses.includes(obj.status)) {
      return obj;
    }
  });
  const searchedDeals = useSearchDeals(deals, data);

  useEffect(() => {
    localStorage.setItem("search-deals-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const hasLocalStorageData = localStorage.getItem("search-deals-data");

    if (hasLocalStorageData?.length) {
      localStorage.setItem(
        "search-deals-data",
        JSON.stringify(dealsLayoutInitialState)
      );
    }
  }, []);

  return (
    <ContainerStyled>
      <HeaderLayout title="Сделки" />
      <DealsLayoutFiltersPanel
        data={data}
        deals={deals}
        reset={reset}
        setValue={setValue}
      />
      <Stages
        deals={searchedDeals}
        setState={setState}
        stages={dealStagesArray}
      />
      <PageDialogs state={state} setState={setState} />
    </ContainerStyled>
  );
});

export default Deals;
