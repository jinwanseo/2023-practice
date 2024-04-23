import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputState, RHFInputType } from "./RHF.interfaces";
import { Box, Stack, Textarea } from "@mui/joy";
import ErrorTooltip from "./tools/ErrorTooltip";
import SuccessTooltip from "./tools/SuccessTooltip";
import ErrorText from "./tools/ErrorText";
import { BeatLoader } from "react-spinners";

type RHFTextAreaType = {
  rows?: number;
};

function RHFTextArea({
  name,
  rows = 2,
  endPoint,
  onChange,
  ...others
}: RHFInputType<any> & RHFTextAreaType) {
  const { control } = useFormContext();
  const [inputState, setInputState] = useState(InputState.BEF);

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
          <Textarea
            minRows={rows}
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

export default RHFTextArea;
