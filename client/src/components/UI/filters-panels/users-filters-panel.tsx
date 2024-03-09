import React from "react";
// components
import SearchField from "@common/inputs/search-field";
import { FieldsContainer, Form } from "@components/common/forms/styled";
import SearchSelectField from "@common/inputs/search-select-field";
// data
import { gendersArray } from "@data/genders";

const UsersFiltersPanel = React.memo(
  ({ register, data, users, statuses, setValue, isLoading }) => {
    return (
      <Form>
        <FieldsContainer>
          <SearchField
            register={register}
            label="Найти по фамилии"
            name="lastName"
            value={data.lastName}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading ? true : false}
          />
          <SearchField
            register={register}
            label="Найти по телефону"
            name="phone"
            value={data.phone}
            inputProps={{ maxLength: 12 }}
            disabled={isLoading ? true : false}
          />
          <SearchField
            register={register}
            label="Найти по email"
            name="email"
            value={data.email}
            inputProps={{ maxLength: 30 }}
            disabled={isLoading ? true : false}
          />
          <SearchSelectField
            register={register}
            name="gender"
            labelId="gender"
            label="Пол"
            value={data.gender}
            itemsList={gendersArray}
            disabled={isLoading ? true : false}
          />
        </FieldsContainer>
      </Form>
    );
  }
);

export default UsersFiltersPanel;
