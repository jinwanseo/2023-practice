import { memo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputState, RHFInputType, SelectOptionType } from "./RHF.interfaces";
import { Box, Option, Select, Stack, selectClasses } from "@mui/joy";
import { getRandomKey } from "./tools/methods";
import { KeyboardArrowDown } from "@mui/icons-material";
import ErrorTooltip from "./tools/ErrorTooltip";
import { BeatLoader } from "react-spinners";
import SuccessTooltip from "./tools/SuccessTooltip";
import ErrorText from "./tools/ErrorText";

function RHFDrop({ name, options, onChange, endPoint }: RHFInputType<any>) {
  const [inputState, setInputState] = useState(InputState.BEF);

  const { control } = useFormContext();

  const handleChange = (value: any, callback: any) => {
    if (!value) return;

    onChange && onChange(value);
    callback(value);
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

  if (!options?.length) return <></>;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack direction="row" alignItems={"center"} spacing={1}>
          <Select
            {...(!!error?.message && { color: "danger" })}
            // {...field}
            defaultValue={field?.value ?? null}
            {...(!!field?.value && !error?.message && { color: "success" })}
            size="sm"
            indicator={<KeyboardArrowDown />}
            sx={{
              width: "fit-content",
              maxWidth: 222,
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
            onChange={(_, v) => handleChange(v, field.onChange)}
            onClose={() => {
              handleBlur(field?.value && !error?.message);
            }}
            onListboxOpenChange={() => {
              handleFocus();
            }}
          >
            {options?.map((o: SelectOptionType) => (
              <Option value={o.value} key={getRandomKey()}>
                {o.label}
              </Option>
            ))}
          </Select>

          {endPoint ? (
            <>
              {!!error?.message ? (
                <ErrorTooltip message={error?.message} />
              ) : inputState === InputState.FOC ? (
                <BeatLoader size={2.8} color="#1976d2" />
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

export default memo(RHFDrop);
