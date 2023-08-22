import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// MUI
import { Box, Button, styled, InputAdornment, FormGroup } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import WaterIcon from "@mui/icons-material/Water";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// components
import TextFieldStyled from "../inputs/text-field-styled";
import SimpleSelectField from "../inputs/simple-select-field";
// store
import { getDistrictsList } from "../../../store/districts.store";
import { getMetroList } from "../../../store/metro.store";
import { getWorkingPositionsList } from "../../../store/working-position.store";
import { getObjectsStatusList } from "../../../store/object-status.store";
import { getCurrentRentersList } from "../../../store/current-renter.store";
import { getobjectConditionsList } from "../../../store/object-conditions.store";
import { getRentTypesList } from "../../../store/rent-types.store";
import { getObjectTypesList } from "../../../store/object-types.store";
import { getEstateTypesList } from "../../../store/estate-types.store";

const Form = styled(`form`)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
  gap: "4px",
});

const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  gap: 4px;
`;

const FooterButtons = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const ObjectForm = ({
  data,
  objectId,
  register,
  errors,
  handleSubmit,
  onSubmit,
  isValid,
  isEditMode = false,
  isEmptyFindedObject,
  isObjectHasAddress,
  watchName,
  watchMetro,
  watchDistrict,
  watchCurrentRenters,
  watchobjectConditions,
  watchRentTypes,
  watchObjectTypes,
  watchEstateTypes,
  watchStatus,
  watchWorkingPosition
}) => {
  const districts = useSelector(getDistrictsList());
  const workingPositions = useSelector(getWorkingPositionsList());
  const objectStatuses = useSelector(getObjectsStatusList());
  const currentRenters = useSelector(getCurrentRentersList());
  const objectConditions = useSelector(getobjectConditionsList());
  
  const metros = useSelector(getMetroList());
  const rentTypes = useSelector(getRentTypesList());
  const objectTypes = useSelector(getObjectTypesList());
  const estateTypes = useSelector(getEstateTypesList());
  const isValidAndHasAdress =
    (Boolean(isEmptyFindedObject) || isObjectHasAddress) && isValid;
  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(isEditMode ? `/objects/${objectId}` : "/objects");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ marginRight: "auto" }}>
          <h3>Объект</h3>
        </Box>
        <FieldsContainer>
          <SimpleSelectField
            register={register}
            name="location.district"
            labelId="district"
            label="Район*"
            itemsList={districts}
            value={watchDistrict || ""}
          />
          <SimpleSelectField
            register={register}
            name="location.metro"
            labelId="metro"
            label="Метро*"
            itemsList={metros}
            value={watchMetro || ""}
            disabled={!watchDistrict && true}
          />
          <SimpleSelectField
            register={register}
            name="status"
            labelId="status"
            label="Статус объекта*"
            itemsList={objectStatuses}
            value={watchStatus || ""}
          />
        </FieldsContainer>
        <FieldsContainer>
          <SimpleSelectField
            register={register}
            itemsList={objectTypes}
            name="estateOptions.objectTypes"
            labelId="objectTypes "
            label="Тип объекта*"
            value={watchObjectTypes || ""}
          />
          <SimpleSelectField
            register={register}
            name="estateOptions.estateTypes"
            labelId="estateTypes "
            label="Тип недвижимости*"
            itemsList={estateTypes}
            value={watchEstateTypes || ""}
          />
          <SimpleSelectField
            register={register}
            name="estateOptions.currentRenters"
            labelId="currentRenters"
            label="Текущий арендатор*"
            itemsList={currentRenters}
            value={watchCurrentRenters || ""}
          />
        </FieldsContainer>

        <Box sx={{ marginRight: "auto" }}>
          <h3>Контактная информация</h3>
        </Box>
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Контакт"
            name="contact.name"
            errors={errors?.contact?.name}
            value={data?.contact?.name || ""}
            onInputQuantities={50}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <SimpleSelectField
            register={register}
            name="contact.position"
            labelId="position"
            label="Позиция"
            itemsList={workingPositions}
            value={watchWorkingPosition || ""}
            disabled={!watchName?.length && true}
          />
          <TextFieldStyled
            register={register}
            label="Телефон"
            type="number"
            name="contact.phone"
            valueAsNumber={true}
            value={data?.contact?.phone || ""}
            errors={errors?.contact?.phone}
            onInputQuantities={12}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PhoneIphoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextFieldStyled
            register={register}
            label="Email"
            name="contact.email"
            errors={errors?.contact?.email}
            onInputQuantities={100}
            value={data?.contact?.email || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </FieldsContainer>

        <Box sx={{ marginRight: "auto" }}>
          <h3>Коммерческие условия</h3>
        </Box>
        <FieldsContainer sx={{ flexDirection: "column", gap: "8px" }}>
          <FieldsContainer>
            <TextFieldStyled
              register={register}
              label="Общая площадь"
              type="number"
              name="commercialTerms.totalSquare"
              valueAsNumber={true}
              onInputQuantities={5}
              value={data?.commercialTerms?.totalSquare || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">м²</InputAdornment>
                ),
              }}
              inputProps={{ maxLength: 3 }}
            />
            <TextFieldStyled
              register={register}
              label="Площадь аренды"
              type="number"
              name="commercialTerms.rentSquare"
              valueAsNumber={true}
              onInputQuantities={5}
              value={data?.commercialTerms?.rentSquare || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">м²</InputAdornment>
                ),
              }}
            />
            <TextFieldStyled
              register={register}
              label="Стоимость аренды"
              type="number"
              name="commercialTerms.rentPrice"
              valueAsNumber={true}
              onInputQuantities={8}
              value={data?.commercialTerms?.rentPrice || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Индексация"
              type="number"
              name="commercialTerms.indexingAnnual"
              valueAsNumber={true}
              onInputQuantities={3}
              value={data?.commercialTerms?.indexingAnnual || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </FieldsContainer>
          <FieldsContainer>
            <TextFieldStyled
              register={register}
              label="Каникулы"
              name="commercialTerms.rentalHolidays"
              onInputQuantities={3}
              value={data?.commercialTerms?.rentalHolidays || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">дней</InputAdornment>
                ),
              }}
            />
            <TextFieldStyled
              register={register}
              label="Обеспечительный платёж"
              type="number"
              name="commercialTerms.securityDeposit"
              valueAsNumber={true}
              onInputQuantities={8}
              value={data?.commercialTerms?.securityDeposit || ""}
              InputProps={{
                maxLength: 7,
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Комиссия агента"
              type="number"
              name="commercialTerms.agentComission"
              valueAsNumber={true}
              onInputQuantities={8}
              value={data?.commercialTerms?.agentComission || ""}
              InputProps={{
                maxLength: 7,
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
            <SimpleSelectField
              register={register}
              name="commercialTerms.rentTypes"
              labelId="rentTypes"
              label="Тип договора"
              itemsList={rentTypes}
              value={watchRentTypes || ""}
            />
          </FieldsContainer>
        </FieldsContainer>

        <Box sx={{ marginRight: "auto" }}>
          <h3>Параметры помещения</h3>
        </Box>
        <FieldsContainer sx={{ flexDirection: "column" }}>
          <FieldsContainer>
            <SimpleSelectField
              register={register}
              name="estateOptions.objectConditions"
              labelId="objectConditions "
              label="Состояние помещения"
              itemsList={objectConditions}
              value={watchobjectConditions || ""}
              watch={watchobjectConditions}
            />
            <TextFieldStyled
              register={register}
              label="Кадастровый номер"
              type="text"
              name="estateOptions.cadastralNumber"
              onInputQuantities={24}
              value={data?.estateOptions?.cadastralNumber || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">№</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Электричество"
              type="number"
              name="estateOptions.electricityKw"
              valueAsNumber={true}
              onInputQuantities={4}
              value={data?.estateOptions?.electricityKw || ""}
              InputProps={{
                maxLength: 7,
                endAdornment: (
                  <InputAdornment position="end">
                    <ElectricBoltIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextFieldStyled
              register={register}
              label="Состояние полов"
              name="estateOptions.premisesFloor"
              onInputQuantities={100}
              value={data?.estateOptions?.premisesFloor || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VerticalAlignBottomOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FieldsContainer>
          <FieldsContainer>
            <TextFieldStyled
              register={register}
              label="Водоснабжение"
              type="text"
              name="estateOptions.waterSuply"
              onInputQuantities={20}
              value={data?.estateOptions?.waterSuply || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <WaterIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextFieldStyled
              register={register}
              label="Высота потолков"
              type="number"
              name="estateOptions.premisesHeight"
              valueAsNumber={true}
              onInputQuantities={3}
              value={data?.estateOptions?.premisesHeight || ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">м</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Парковочных мест"
              type="number"
              name="estateOptions.parkingQuantity"
              valueAsNumber={true}
              onInputQuantities={4}
              value={data?.estateOptions?.parkingQuantity || ""}
              InputProps={{
                maxLength: 7,
                endAdornment: (
                  <InputAdornment position="end">
                    <DirectionsCarIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextFieldStyled
              register={register}
              label="Зона погрузки"
              type="text"
              name="estateOptions.loadingArea"
              onInputQuantities={60}
              value={data?.estateOptions?.loadingArea || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocalShippingIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FieldsContainer>
        </FieldsContainer>

        <Box sx={{ marginRight: "auto" }}>
          <h3>Описание объекта</h3>
        </Box>
        <TextFieldStyled
          register={register}
          label="Опишите объект"
          name="description.fullDescription"
          rows="8"
          multiline={true}
          value={data?.description?.fullDescription || ""}
          errors={errors?.description?.fullDescription}
          onInputQuantities={20000}
        />

        <FooterButtons>
          <Button
            type="submit"
            variant="outlined"
            color="success"
            disabled={!isValidAndHasAdress}
          >
            {isEditMode ? "Сохранить" : "Создать"}
          </Button>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={handleBackPage}
            >
              Отмена
            </Button>
          </Box>
        </FooterButtons>
      </Form>
    </>
  );
};

export default ObjectForm;
