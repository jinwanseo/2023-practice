import { Box, Input, Stack } from "@mui/joy";
import { Controller, useFormContext } from "react-hook-form";
import { InputState, RHFInputType } from "./RHF.interfaces";
import { memo, useState } from "react";
import { BeatLoader } from "react-spinners";

import ErrorTooltip from "./tools/ErrorTooltip";
import ErrorText from "./tools/ErrorText";
import SuccessTooltip from "./tools/SuccessTooltip";

function RHFDate({
  type,
  name,
  onChange,
  endPoint,
  ...others
}: RHFInputType<any>) {
  const [inputState, setInputState] = useState(InputState.BEF);

  const { control } = useFormContext();
  const handleChange = (e: any, callback: (v: any) => void) => {
    console.log(e.target.value);
    onChange && onChange(e.target.value);
    callback(e.target.value);
    if (!!e.target.value) setInputState(InputState.OUT);
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
          <Input
            type={type ?? "date"}
            {...(!!field?.value && !error?.message && { color: "success" })}
            {...(!!error?.message && { color: "danger" })}
            {...field}
            value={field?.value ?? ""}
            {...others}
            onChange={(v) => handleChange(v, field.onChange)}
            onFocus={() => {
              handleFocus();
            }}
            onBlur={() => {
              handleBlur(field?.value && !error?.message);
            }}
            sx={{ minWidth: 222 }}
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
                field?.value && <SuccessTooltip />
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

export default memo(RHFDate);
