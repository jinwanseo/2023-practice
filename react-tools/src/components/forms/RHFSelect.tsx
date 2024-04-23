import { memo, useState } from "react";
import { Autocomplete, Box, Stack } from "@mui/joy";
import { Controller, useFormContext } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { InputState, RHFInputType } from "./RHF.interfaces";
import ErrorTooltip from "./tools/ErrorTooltip";
import ErrorText from "./tools/ErrorText";
import SuccessTooltip from "./tools/SuccessTooltip";

function RHFSelect({ name, options, endPoint, onChange }: RHFInputType<any>) {
  const [inputState, setInputState] = useState(InputState.BEF);

  const { control } = useFormContext();
  const handleChange = (selectOption: any, callback: (d: any) => void) => {
    onChange && onChange(selectOption?.value ?? null);
    callback(selectOption?.value ?? null);

    if (!!selectOption?.value) setInputState(InputState.OUT);
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
      render={({ field, fieldState: { error } }) => {
        return (
          <Stack
            direction={endPoint ? "row" : "column"}
            {...(endPoint && {
              alignItems: "center",
              spacing: 1,
            })}
          >
            <Autocomplete
              {...(!!error?.message && { color: "danger" })}
              {...field}
              {...(!!field?.value && !error?.message && { color: "success" })}
              {...(field?.value
                ? {
                    value: options?.find((o: any) => o.value === field?.value),
                  }
                : { value: null })}
              options={options ?? []}
              isOptionEqualToValue={(o: any, v: any) => {
                return o?.value === v?.value;
              }}
              onChange={(_, v) => handleChange(v, field.onChange)}
              onFocus={() => {
                handleFocus();
              }}
              onBlur={() => {
                handleBlur(field?.value && !error?.message);
              }}
              sx={{ maxWidth: 222 }}
            />

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
        );
      }}
    />
  );
}

export default memo(RHFSelect);
