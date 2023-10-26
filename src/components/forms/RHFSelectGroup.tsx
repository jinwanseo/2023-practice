import React, { useState } from "react";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import { Box, Stack } from "@mui/joy";
import { InputState, RHFInputType, StackDirection } from "./RHF.interfaces";
import { Controller, useFormContext } from "react-hook-form";
import { getRandomKey } from "./tools/methods";
import ErrorTooltip from "./tools/ErrorTooltip";
import SuccessTooltip from "./tools/SuccessTooltip";
import ErrorText from "./tools/ErrorText";

type RHFSelectGroupType = {
  dir?: StackDirection;
};

export default function RHFSelectGroup({
  label,
  name,
  options,
  endPoint,
  dir = StackDirection.ROW,
}: RHFInputType<any> & RHFSelectGroupType) {
  const [inputState, setInputState] = useState(InputState.BEF);
  const { control } = useFormContext();

  const handleChange = (e: any, value: any, field: any) => {
    let values = field.value ?? [];

    const selectIdx = values?.findIndex((v: any) => v === value);
    if (e.target.checked) {
      if (selectIdx === -1) values.push(value);
    } else if (selectIdx !== -1) {
      values.splice(selectIdx, 1);
    }

    field.onChange([...values]);
    setInputState(InputState.OUT);
  };

  if (!options?.length) return <></>;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Stack direction="column">
          {label && (
            <Typography
              level="body-sm"
              fontWeight="lg"
              mb={1}
              {...(!!error?.message && { color: "danger" })}
            >
              {label}
            </Typography>
          )}
          <Stack
            direction="row"
            alignItems={"center"}
            spacing={1}
            sx={{ width: "fit-content" }}
          >
            <List size="sm">
              <Stack direction={dir}>
                {options?.map((o) => (
                  <ListItem key={getRandomKey()}>
                    <Checkbox
                      onClick={(e) => handleChange(e, o.value, field)}
                      {...(!!error?.message && { color: "danger" })}
                      {...(!!field?.value?.length && { color: "success" })}
                      variant="outlined"
                      label={o.label}
                      checked={
                        field?.value
                          ? field?.value?.findIndex(
                              (f: any) => f === o.value
                            ) !== -1
                          : false
                      }
                    />
                  </ListItem>
                ))}
              </Stack>
            </List>
            {endPoint ? (
              <>
                {!!error?.message ? (
                  <ErrorTooltip message={error?.message} />
                ) : inputState === InputState.OUT ? (
                  <SuccessTooltip />
                ) : (
                  <Box sx={{ width: 20 }} />
                )}
              </>
            ) : (
              <ErrorText message={error?.message} />
            )}
          </Stack>
        </Stack>
      )}
    />
  );
}
