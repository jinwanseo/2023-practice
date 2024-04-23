import { Box, Button, ButtonGroup, Stack } from "@mui/joy";
import { Controller, useFormContext } from "react-hook-form";
import { InputState, RHFInputType } from "./RHF.interfaces";
import { getRandomKey } from "./tools/methods";
import ErrorTooltip from "./tools/ErrorTooltip";
import SuccessTooltip from "./tools/SuccessTooltip";
import ErrorText from "./tools/ErrorText";
import { useState } from "react";

function RHFBtnGroup({ name, options, endPoint, onChange }: RHFInputType<any>) {
  const [inputState, setInputState] = useState(InputState.BEF);

  const { control } = useFormContext();
  if (!options?.length) return <></>;

  const handleClick = (value: any, callback: any) => {
    onChange && onChange(value);
    callback(value);
    value && setInputState(InputState.OUT);
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
          <ButtonGroup
            orientation="horizontal"
            color="neutral"
            variant="outlined"
            disabled={false}
            size="sm"
          >
            {options?.map((o) => (
              <Button
                key={getRandomKey()}
                variant={
                  field?.value
                    ? field.value === o.value
                      ? "soft"
                      : "outlined"
                    : "outlined"
                }
                {...(!!field?.value && { color: "success" })}
                onClick={() => handleClick(o.value, field.onChange)}
              >
                {o.label}
              </Button>
            ))}
          </ButtonGroup>
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
      )}
    />
  );
}

export default RHFBtnGroup;
