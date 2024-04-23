import { Box, Input, Stack } from "@mui/joy";
import React, { memo, useState } from "react";

import { Controller, useFormContext } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { InputState, RHFInputType } from "./RHF.interfaces";
import ErrorText from "./tools/ErrorText";
import ErrorTooltip from "./tools/ErrorTooltip";
import SuccessTooltip from "./tools/SuccessTooltip";

function RHFInput({ name, onChange, endPoint, ...others }: RHFInputType<any>) {
  const [inputState, setInputState] = useState(InputState.BEF);
  const { control } = useFormContext();

  const handleChange = (e: any, callback: (...event: any[]) => void) => {
    onChange && onChange(e.target.value);
    callback(e.target.value);
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
            error={!!error?.message}
            {...field}
            {...(others?.startDecorator && {
              startDecorator: React.cloneElement(others.startDecorator, {
                color: error?.message ? "error" : "default",
              }),
            })}
            {...(!!field?.value &&
              !error?.message && {
                color: "success",
              })}
            value={field?.value ?? ""}
            {...others}
            onChange={(e) => handleChange(e, field.onChange)}
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
      )}
    />
  );
}

export default memo(RHFInput);
