import {
  Box,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/joy";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  InputState,
  RHFInputType,
  SelectOptionType,
  StackDirection,
} from "./RHF.interfaces";
import { getRandomKey } from "./tools/methods";
import ErrorTooltip from "./tools/ErrorTooltip";
import { BeatLoader } from "react-spinners";
import SuccessTooltip from "./tools/SuccessTooltip";
import ErrorText from "./tools/ErrorText";

type RadioGroupType = {
  dir?: StackDirection;
};

function RHFRadio({
  label,
  name,
  options,
  onChange,
  endPoint,
  dir = StackDirection.ROW,
}: RHFInputType<any> & RadioGroupType) {
  const [inputState, setInputState] = useState(InputState.BEF);
  const { control } = useFormContext();
  if (!options?.length) return <></>;

  const handleChange = (e: any, callback: any) => {
    onChange && onChange(e.target.value);
    callback(e.target.value);
    setInputState(InputState.OUT);
  };
  //포커스
  const handleFocus = () => {
    setInputState(InputState.FOC);
  };

  // 포커스 제거
  const handleBlur = (isValidated: boolean): void => {
    setInputState(isValidated ? InputState.OUT : InputState.BEF);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack
          direction={endPoint ? "row" : "column"}
          {...(endPoint && {
            alignItems: "center",
            spacing: 1,
          })}
        >
          <FormControl>
            {label && <FormLabel>{label}</FormLabel>}
            <RadioGroup
              {...field}
              {...(!!field?.value &&
                !error?.message && {
                  color: "success",
                })}
              value={field?.value ?? ""}
              onChange={(e) => handleChange(e, field.onChange)}
            >
              <Stack direction={dir} spacing={1}>
                {options?.map((o: SelectOptionType) => (
                  <Radio
                    key={getRandomKey()}
                    label={o.label}
                    value={o.value}
                    variant="outlined"
                    {...(!!field?.value && { color: "success" })}
                    {...(!!error?.message && { color: "danger" })}
                  />
                ))}
              </Stack>
            </RadioGroup>
          </FormControl>
          {endPoint ? (
            <>
              {!!error?.message ? (
                <ErrorTooltip message={error?.message} />
              ) : inputState === InputState.FOC ? (
                <BeatLoader size={2.8} color="#1976d2" />
              ) : inputState === InputState.BEF ? (
                <Box sx={{ width: 20 }} />
              ) : (
                <SuccessTooltip />
              )}
            </>
          ) : (
            <ErrorText message={error?.message} />
          )}
        </Stack>
      )}
    />
  );
}

export default RHFRadio;
