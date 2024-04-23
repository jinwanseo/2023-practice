import { Button } from "@mui/joy";
import { memo } from "react";
import { useFormContext } from "react-hook-form";

function RHFSubmit({ label, startIcon, endIcon }: any) {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <Button
      type="submit"
      variant="soft"
      loading={isSubmitting ?? false}
      startDecorator={startIcon}
      endDecorator={endIcon}
    >
      {label}
    </Button>
  );
}

export default memo(RHFSubmit);
